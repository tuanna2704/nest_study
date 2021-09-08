import { Injectable } from '@nestjs/common';

@Injectable()
export class ChangeHealthService {
  call(): string {
    return 'this string return from ChangeHealthService';
  }
}
