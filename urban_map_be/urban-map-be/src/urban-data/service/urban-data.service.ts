import { UrbanData } from './../../models/urban-data.interface';
import { UrbanDataEntity } from './../../entities/urban-data.entitiy';
import { switchMap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { join } from 'path';
const AdmZip = require('adm-zip');
import { v4 as uuidv4 } from 'uuid';
const fs = require('fs');
const csv = require('csvtojson');
const path = require('path');

@Injectable()
export class UrbanDataService {
    constructor(
        @InjectRepository(UrbanDataEntity)
        private urbanDataRepository: Repository<UrbanDataEntity>,
    ) {}

    create(urbanData: UrbanData): Observable<UrbanData> {
        return from(this.urbanDataRepository.save(urbanData));
    }

    createMultiple(urbanData: UrbanData[]): Observable<UrbanData[]> {
        return from(this.urbanDataRepository.save(urbanData));
    }

    uploadSites(sitesZip): Observable<UrbanData[]> {
        const uid = uuidv4();
        const zip = new AdmZip(join(process.cwd(), 'uploads/' + sitesZip.filename ));
        const zipEntries = zip.getEntries(); // an array of ZipEntry records
        zipEntries.forEach(function(zipEntry) {
            if (zipEntry && zipEntry.entryName !== 'data.csv') {
                const dir = zipEntry.entryName.toString().split('/')[0];
                zip.extractEntryTo(/*entry name*/ zipEntry, /*target path*/join(process.cwd(),
                '/urban_data_packages/' + dir + '-' + uid),
                /*maintainEntryPath*/false,
                /*overwrite*/true);
            } else {
                zip.extractEntryTo(
                /*entry name*/ zipEntry,
                /*target path*/ join(process.cwd(), '/urban_data_packages/'),
                /*maintainEntryPath*/ false,
                /*overwrite*/ true);
            }
        });
        const packageArray = [];

        return from(csv()
        .fromFile(join(process.cwd(), '/urban_data_packages/data.csv'))
        .then((jsonObj)=>{
            jsonObj.forEach(data => {
            const key  = Object.keys(data)[0];
            const row = data[key].toString().split(';');
            let newUrbanData = {
                id: null,
                package_id: row[0] + '-' + uid,
                lat: row[1],
                lng: row[2],
                location_name: row[3],
                extra_1: row[4],
                extra_2: row[5]
                };

            packageArray.push(newUrbanData);
            });

            return packageArray;
        })).pipe(switchMap((data: UrbanData[]) => {
            return this.createMultiple(data);
        }))
    }

    findById(id: number): Observable<UrbanData> {
        return from(this.urbanDataRepository.findOne(id));
    }

    find(): Observable<UrbanData[]> {
        return from(this.urbanDataRepository.find());
    }

    updateById(id: number, urbanData: UrbanData): Observable<any> {
        return from(this.urbanDataRepository.update(id, urbanData));
    }

    deleteById(id: number): Observable<any> {
        return from(this.urbanDataRepository.delete(id));
    }

    findByPackageId(id: number): Observable<UrbanData> {
        return from(this.urbanDataRepository.findOne({where: {package_id: id}}));
    }
}
