import { UrbanData } from './../../models/urban-data.model';
import * as urbanActions from '../actions/urban-actions';
import * as _ from 'lodash';


export interface UrbanDataState {
    sites: UrbanData[];
    loading: boolean;
}

export const initialState: UrbanDataState = {
    sites: [],
    loading: false,
};

export function reducer(
    state = initialState,
    action: urbanActions.UrbanActions
): UrbanDataState {

    switch (action.type) {

        case urbanActions.LOAD_SITES: {
            return {
                ...state,
                loading: true
            };
        }


        case urbanActions.LOAD_SITES_SUCCESS: {
            return {
                ...state,
                loading: false,
                sites: action.payload
            };
        }

        case urbanActions.UPLOAD_SITES: {
            return {
                ...state,
                loading: true
            };
        }

        default: {
            return state;
        }
    }
}

export const getEverySite = (state: UrbanDataState) => state.sites;
export const getSitessLoading = (state: UrbanDataState) => state.loading;


