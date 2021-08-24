import { Controller, Inject, Get } from '@nestjs/common';
import { Client, ClientKafka, Transport, MessagePattern, Payload } from "@nestjs/microservices";
import { AppService } from './app.service';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

@Controller('kafka')
export class KafkaController {
  constructor(
    @Inject('KAFKA_SERVICE') private client: ClientKafka
  ) {}

  i: number = 0;
  async onApplicationBootstrap() {
    // Need to subscribe to topic 
    // so that we can get the response from kafka microservice
    this.client.subscribeToResponseOf('my-first-topic');
    await this.client.connect();
  }

 // Hit this API to produce message to kafka
  @Get()
  produceMessage() {
    return this.client.emit('my-first-topic', { message: `Emmit ${this.i++}`})
  }

  // Use message partern as consummer message from topic
  @MessagePattern('my-first-topic') // Our topic name
  consumerMessage(@Payload() message) {
    console.log(message);
  }
}
