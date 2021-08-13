import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

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

  @Post('new')
  create(){
    return 'create page'
  }


  @Get(':id')
  show( @Param('id')id: string ) {
    return {
      message: 'getOne',
      id
    }
  }

  @Get(':id/edit')
  edit( @Param('id')id: string ) {
    return {
      message: 'edit page',
      id
    }
  }

  @Put(':id')
  update( @Param('id')id: string ) {
    return {
      message: 'update page',
      id
    }
  }

  @Delete(':id')
  delete( @Param('id')id: string ) {
    return {
      message: 'delete page',
      id
    }
  }
}
