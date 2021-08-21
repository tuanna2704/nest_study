import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class LoggingTranformPipe implements PipeTransform {
  // This type of logging using to tranform input Data
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('Exec Tranform Pipe...')
    return value;
  }
}

@Injectable()
export class LoggingValidationPipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata) {
    console.log('Exec Validate Pipe...')
    return value;
  }
}