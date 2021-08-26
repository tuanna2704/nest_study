import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
  UseGuards,
  UsePipes,
  Query,
  UseFilters,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { LoggingGuard } from './guards/logging.guard';
import {
  LoggingTranformPipe,
  LoggingValidationPipe,
} from './pipes/logging.pipe';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
@Controller('user')
export class UserController {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  @Get()
  async index(): Promise<string> {
    const user = await this.userRepository.create({
      email: 'abc',
      department: 'abc',
      firstName: 'abc',
      lastName: 'abc',
      password: 'abc',
      isActive: true,
    });
    await this.userRepository.save(user);

    // const user = await this.userRepository.find()
    console.log(user);
    return 'index page';
  }

  @Get('new')
  new() {
    console.log('process page');
    return 'new page';
  }

  @Post()
  create(@Body() dto: CreateUserDTO) {
    console.log(dto);
    return dto;
  }

  @UseInterceptors(new LoggingInterceptor(true))
  @UseGuards(LoggingGuard)
  @UsePipes(LoggingValidationPipe)
  @UseFilters(AllExceptionsFilter)
  @Get(':id')
  show(@Param('id', LoggingTranformPipe) id: number) {
    console.log('Controller Executing...');
    return {
      message: 'getOne',
      id,
    };
  }

  @Get(':id/edit')
  edit(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'edit page',
      id,
    };
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'update page',
      id,
    };
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'delete page',
      id,
    };
  }
}
