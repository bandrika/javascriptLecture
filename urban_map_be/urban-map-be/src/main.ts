import { UrbanDataService } from './urban-data/service/urban-data.service';
import { UrbanData } from './models/urban-data.interface';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { catchError, map } from 'rxjs/operators';
const csv = require('csvtojson')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const urbanDataArray: UrbanData[] = [];

  /*
  console.log('Reading package informateion...');
  csv()
    .fromFile('urban_data_packages/data.csv')
    .then((jsonObj)=>{
        jsonObj.forEach(data => {
          const key  = Object.keys(data)[0];
          const row = data[key].toString().split(';');
          let newUrbanData = {
            id: null,
            package_id: row[0],
            lat: row[1],
            lng: row[2],
          };

          urbanDataArray.push(newUrbanData);
        });

        // console.log('DATA', urbanDataArray);
        const urbanDataService = app.get(UrbanDataService);
        const alredayExists = urbanDataService.findByPackageId(urbanDataArray[0].package_id);
        if (!alredayExists) {
          urbanDataService.createMultiple(urbanDataArray);
        }
    });
  */
  await app.listen(3000);
}
bootstrap();
