import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Timeout, Interval } from '@nestjs/schedule';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  // @Cron(CronExpression.EVERY_30_SECONDS)
  // handleByExpression() {
  //   this.logger.debug('Called every 30 seconds');
  // }
  
  // @Cron('45 * * * * *')
  // handleCronByRule() {
  //   this.logger.debug('Called when the current second is 45');
  // }

  // @Timeout('notifications', 2500)
  //   handleCronTimeout() {
  //   this.logger.debug('Called once after 5 seconds');
  // }

  // @Interval(10000)
  // handleCronInterval() {
  //   this.logger.debug('Called every 10 seconds');
  // }
}