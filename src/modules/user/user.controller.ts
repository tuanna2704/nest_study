import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { LoggingInterceptor } from './interceptors/logging.interceptor'
@Controller('user')
export class UserController {
  
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
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
    await this.userRepository.save(user)

    // const user = await this.userRepository.find()
    console.log(user);
    return 'index page';
  }

  @Get('new')
  @UseInterceptors(LoggingInterceptor)
  new(){
    console.log('process page')
    return 'new page'
  }

  @Post()
  create(
    @Body() dto: CreateUserDTO
  ){
    console.log(dto)
    return dto;
  }


  @Get(':id')
  show( @Param('id', ParseIntPipe) id: number ) {
    return {
      message: 'getOne',
      id
    }
  }

  @Get(':id/edit')
  edit( @Param('id', ParseIntPipe) id: number ) {
    return {
      message: 'edit page',
      id
    }
  }

  @Put(':id')
  update( @Param('id', ParseIntPipe) id: number ) {
    return {
      message: 'update page',
      id
    }
  }

  @Delete(':id')
  delete( @Param('id', ParseIntPipe) id: number ) {
    return {
      message: 'delete page',
      id
    }
  }
}
