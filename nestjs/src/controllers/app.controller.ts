import { Controller, Get , Res,Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response, Request  } from 'express';
import { join } from 'path';

@ApiTags('App')
@Controller()
export class AppController {
  constructor() {}

  // @Get()
  // getHello(): string {
  //   return 'hello';
  // }

  @Get('/*')
  serveStatic(@Req() request: Request,@Res() res: Response) {
    const basePath = join(__dirname, '..' , '..');
    const url = request.url.replace('%20',' ');

    return res.sendFile(url, { root: basePath + '/uploads' });
  }
}
