import { UrbanData } from './../../models/urban-data.interface';
import { UrbanDataService } from './../service/urban-data.service';
import { ConfigService } from '@nestjs/config';
import { Observable, of } from 'rxjs';
import { Controller, Post, Get, Body, Param, Delete, Patch, Put, UseGuards, UseInterceptors, UploadedFile, Res, Inject, forwardRef } from '@nestjs/common';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';

@Controller('urban-data')
export class UrbanDataController {
    constructor(
        private urbanDataService: UrbanDataService) { }

    @Post()
    createUrbanData(@Body() data: UrbanData): Observable<UrbanData> {
        return this.urbanDataService.create(data);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (request, file, callback) => {
                // replace spaces in uploaded lesson note name and add unique id
                const fileName: string = path.parse(file.originalname).name.replace(/\s/g, '-') + '-' + uuidv4();
                const extension: string = path.parse(file.originalname).ext;
                callback(null, `${fileName}${extension}`);
            }
        })
    }))
    uploadLessonNote(@UploadedFile() sitesZip): Observable<any> {
        console.log('UPLOADED ZIP', sitesZip);
        return from(this.urbanDataService.uploadSites(sitesZip));
    }

    @Post('create')
    createMultipleUrbanData(@Body('data') data: UrbanData[]): Observable<UrbanData[]> {
       return this.urbanDataService.createMultiple(data);
    }

    @Get(':id')
    findUrbanDataById(@Param('id') id: number): Observable<UrbanData> {
        return this.urbanDataService.findById(id);
    }

    @Get()
    findUrbanData(): Observable<UrbanData[]> {
        return this.urbanDataService.find();
    }

    @Get('img/:packageId')
    findOvarlayImage(@Param('packageId') packageId, @Res() res): Observable<Object> {
        return of(res.sendFile(join(process.cwd(), 'urban_data_packages/' + packageId + '/01.bmp')));
    }

}
