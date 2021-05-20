// Models
import { ADVERT_CONSTANTS } from '../../models/Advert';

/**
* @param {Array} adverts 
* @param {Object} filters 
*/
export function getVisibleAdverts(adverts, filters) {
    let visibleAdverts = adverts;
    if (filters.name && filters.name !== '') {
        filters.name = filters.name.toLowerCase();
        visibleAdverts = visibleAdverts.filter(advert => advert.name.toLowerCase().includes(filters.name));
    }
    if (filters.tag && filters.tag !== ADVERT_CONSTANTS.TAG.ALL) {
        visibleAdverts = visibleAdverts.filter(advert => advert.tags.indexOf(filters.tag) > -1);
    }
    if (filters.type && filters.type !== ADVERT_CONSTANTS.TYPE.ALL) {
        visibleAdverts = visibleAdverts.filter(advert => advert.type === filters.type);
    }
    if (filters.minPrice && filters.minPrice > 0) {
        visibleAdverts = visibleAdverts.filter(advert => advert.price >= filters.minPrice);
    }
    if (filters.maxPrice && filters.maxPrice > 0) {
        visibleAdverts = visibleAdverts.filter(advert => advert.price <= filters.maxPrice);
    }
    return visibleAdverts;
}

/**
* @param {Array} adverts Array 
* @param {Object} session Session 
*/
export function getOwnAdverts(adverts, session) {
    return adverts.filter(advert => advert.user._id === session._id);
}

/**
* @param {Array} adverts 
* @param {String} type 
*/
export function getAdvertsByType(adverts, type) {
    return adverts.filter(advert => advert.type === type);
}

/**
 * @param {Array} adverts 
 * @param {Function} getState 
 */
export function getAdvertsWithFavoriteSet(adverts, getState){
    const { session } = getState();
    if (session.favorites) {
        return adverts.map(ad => {
            ad.favorite = session.favorites.indexOf(ad._id) >= 0 ? true: false;
            return ad;
        });
    } 
    return adverts;
}