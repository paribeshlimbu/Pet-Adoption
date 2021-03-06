// Imports
import * as ADVERTS from '../types/AdvertsTypes';
import * as SESSION from '../types/SessionTypes';
import { initialState } from '../InitialState';

/**
 * @param {Array} state 
 * @param {Object} action action 
 */
export function lastCall (state = initialState.filters, action) {
    switch (action.type) {
        // Set api call statistics
        case ADVERTS.FETCH_ADVERTS_SUCCESS:
        case ADVERTS.SEARCH_ADVERTS_SUCCESS:
        case ADVERTS.FETCH_ITERATE_ADVERTS_SUCCESS:
        case ADVERTS.FETCH_FAVORITES_SUCCESS:
        case ADVERTS.FETCH_USER_ADVERTS_SUCCESS:
        case ADVERTS.FETCH_SOLD_HISTORY_SUCCESS:
            return {
                totalCount: action.totalCount,
                start: action.start,
                end: action.end,
            };
        // Delete api call statistics
        case SESSION.LOGOUT_SUCCESS:
        case SESSION.LOGOUT_FAILURE:
        case SESSION.DELETE_ACCOUNT_SUCCESS:
            return initialState.filters;
        // Default
        default:
            return state;
    }
}