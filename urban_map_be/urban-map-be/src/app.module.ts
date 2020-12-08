import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrbanDataModule } from './urban-data/urban-data.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Xx12345.',
      database: 'urban',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UrbanDataModule,
  ],
})
export class AppModule {}
