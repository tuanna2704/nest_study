import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue, Job } from 'bull';

@Injectable()
export class MessageProducerService {
  constructor(@InjectQueue('message-queue') private queue: Queue) {}

  async sendMessage(message: string) {
    await this.queue.add(
      'message-job',
      {
        text: message,
      },
      { delay: 30000 },
    );
  }

  async getDelayed() {
    return await this.queue.getDelayed();
  }
}

@Processor('message-queue')
export class MessageConsumer {
  @Process('message-job')
  readOperationJob(job: Job<unknown>) {
    console.log(job.data);
  }
}
