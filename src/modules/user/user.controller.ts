import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';

@Controller('user')
export class UserController {
  
  @Get()
  index() {
    return 'index page';
  }

  @Get('new')
  new(){
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
