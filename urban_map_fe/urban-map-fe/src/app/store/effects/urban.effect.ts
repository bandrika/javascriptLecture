import { UrbanService } from './../../services/urban.service';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, switchMap, catchError } from 'rxjs/operators';
import * as urbanActions from '../actions/urban-actions';

@Injectable()
export class UrbanEffects {
    constructor( private actions$: Actions, private urbanService: UrbanService, private messageService: MessageService) {}

    getSites$ = createEffect(() => {
        return this.actions$.pipe(
            ofType<urbanActions.LoadSites>(urbanActions.LOAD_SITES),
            switchMap((action) => this.urbanService.getUrbanData().pipe(
                    map(data => new urbanActions.LoadSitesSuccess(data))
                )
            )
        );
    });

    uploadSites$ = createEffect(() => {
        return this.actions$.pipe(
            ofType<urbanActions.UploadSites>(urbanActions.UPLOAD_SITES),
            switchMap((action) => this.urbanService.uploadSites(action.payload).pipe(
                map(data => {
                    this.messageService.add({severity: 'success', summary: 'The upload was successful'});
                    return new urbanActions.LoadSites();
                 }),
                )
            )
        );
    });

}
