import { UrbanData } from './../../models/urban-data.model';
import { Action } from '@ngrx/store';

export const LOAD_SITES = '[App] Load Sites';
export const LOAD_SITES_SUCCESS = '[App] Load Sites Success';
export const UPLOAD_SITES = '[App] Load Sites';

export class LoadSites implements Action {
    readonly type = LOAD_SITES;
}

export class LoadSitesSuccess implements Action {
    readonly type = LOAD_SITES_SUCCESS;

    constructor(public payload: UrbanData[]) {}
}

export class UploadSites implements Action {
    readonly type = UPLOAD_SITES;

    constructor(public payload: File) {}
}

// Action types

export type UrbanActions =
LoadSites |
LoadSitesSuccess |
UploadSites;
