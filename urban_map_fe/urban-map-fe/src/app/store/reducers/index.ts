import * as urbanReducer from './urban.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppModuleState {
    urban: urbanReducer.UrbanDataState;
}

export const reducers: ActionReducerMap<AppModuleState> = {
    urban: urbanReducer.reducer
};

export const getAppModuleState = createFeatureSelector<AppModuleState>(
    'urban'
);

export const getUrbanDataState = createSelector(
    getAppModuleState,
    (state: AppModuleState) => state.urban
);

export const getSites = createSelector(getUrbanDataState, urbanReducer.getEverySite);
export const getSitesLoading = createSelector(getUrbanDataState, urbanReducer.getSitessLoading);
