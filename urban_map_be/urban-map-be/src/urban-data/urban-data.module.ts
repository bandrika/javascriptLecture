import { UrbanDataService } from './service/urban-data.service';
import { UrbanDataEntity } from './../entities/urban-data.entitiy';
import { Module } from '@nestjs/common';
import { UrbanDataController } from './controller/urban-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UrbanDataEntity]),
  ],
  controllers: [UrbanDataController],
  providers: [UrbanDataService]
})
export class UrbanDataModule {}
