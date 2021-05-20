// Service worker (push notifications)
import * as serviceWorker from '../../serviceWorker';
// API
import AuthServices from '../../services/AuthServices';
import UserServices from '../../services/UserServices';
// Own modules
import LocalStorage from '../../utils/Storage';
import { fetchUserChats } from './ChatActions';
import { connect, disconnect } from './SocketIoActions';
// Actions
import * as ACTIONS from '../types/SessionTypes';

/**
 * Login password
 * @param {String} login Login 
 * @param {String} password Password 
 */
export const login = (login, password) => {   
    return async function(dispatch, getState, extra) {
        dispatch(loginRequest());
        return AuthServices.login(login, password)
        .then(response => {
            dispatch(loginSuccess(response));
            LocalStorage.saveLocalStorage(getState().session);
            // connect to chat server
            dispatch(fetchUserChats());
            dispatch(connect(login))
            // register service worker to receive push notifications
            serviceWorker.register(login, extra.notify);
            // go home
            extra.history.push('/');
            return response;
        })
        .catch (error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;
            dispatch(loginFailure(message));
            throw message;
        });
    }
};

const loginRequest = () => ({ type: ACTIONS.LOGIN_REQUEST });
const loginSuccess = session => ({ type: ACTIONS.LOGIN_SUCCESS, session });
const loginFailure = error => ({ type: ACTIONS.LOGIN_FAILURE, error });

/**
 * Login con token
 */
export const loginWithToken = (jwt) => {   
    return async function(dispatch, getState, extra) {
        dispatch(loginWithTokenRequest());
        return AuthServices.loginWithToken(jwt)
        .then(response => {
            // Distpatch login and save in local storage
            dispatch(loginWithTokenSuccess(response));
            LocalStorage.saveLocalStorage(getState().session);
            // connect to chat server
            dispatch(fetchUserChats());
            dispatch(connect(getState().session.login))
            // register service worker to receive push notifications
            serviceWorker.register(getState().session.login, extra.notify);
            // go home
            extra.history.push('/');
            return response;
        })
        .catch (error => {
            LocalStorage.cleanLocalStorage();
            let message = error.response && error.response.data ? error.response.data.data : error.message;
            dispatch(loginWithTokenFailure(message));
            throw message;
        });
    }
};

const loginWithTokenRequest = () => ({ type: ACTIONS.LOGIN_TOKEN_REQUEST });
const loginWithTokenSuccess = session => ({ type: ACTIONS.LOGIN_TOKEN_SUCCESS, session });
const loginWithTokenFailure = error => ({ type: ACTIONS.LOGIN_TOKEN_FAILURE, error });

/**
 * Logout
 */
export const logout = () => {
    return async function(dispatch, getState, extra) {
        dispatch(logoutRequest());
        return AuthServices.logout(getState().session.jwt)
        .then(response => {
            // unregister service worker to receive push notifications
            serviceWorker.unregister(getState().session.login);
            dispatch(disconnect(getState().session.login));
            // distpatch logout and clear local storage
            dispatch(logoutSuccess());
            LocalStorage.cleanLocalStorage();
            // go login
            extra.history.push('/login');
            return response;
        })
        .catch (error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;
            dispatch(logoutFailure(message));
            LocalStorage.cleanLocalStorage();
            extra.history.push('/login');
            throw message;
        });
    }
};

const logoutRequest = () => ({ type: ACTIONS.LOGOUT_REQUEST });
const logoutSuccess = () => ({ type: ACTIONS.LOGOUT_SUCCESS });
const logoutFailure = error => ({ type: ACTIONS.LOGOUT_FAILURE, error });

/**
 * Activate Account
 */
export const activateAccount = token => {
    return async function(dispatch, getState, extra) {
        dispatch(activateAccountRequest());
        return AuthServices.activate(token)
        .then((result) => {
            LocalStorage.cleanLocalStorage();
            dispatch(activateAccountSuccess());
            return result;
        })
        .catch((error) => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;            
            dispatch(activateAccountFailure(message));;
            throw message;
        });
    }
};

const activateAccountRequest = () => ({ type: ACTIONS.ACTIVATE_ACCOUNT_REQUEST });
const activateAccountFailure = error => ({ type: ACTIONS.ACTIVATE_ACCOUNT_FAILURE, error });
const activateAccountSuccess = () => ({ type: ACTIONS.ACTIVATE_ACCOUNT_SUCCESS });

/**
 * Activate Account
 */
export const createAccount = (login, name, email, password) => {
    return async function(dispatch, getState, extra) {
        dispatch(createAccountRequest());
        return UserServices.create(login, name, email, password)
        .then(user => {
            LocalStorage.cleanLocalStorage();
            dispatch(createAccountSuccess());
            extra.history.push('/login');
            return user;
        })
        .catch(error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;
            dispatch(createAccountFailure(message));;
            throw message;
        });
    }
};

const createAccountRequest = () => ({ type: ACTIONS.CREATE_ACCOUNT_REQUEST });
const createAccountFailure = error => ({ type: ACTIONS.CREATE_ACCOUNT_FAILURE, error });
const createAccountSuccess = () => ({ type: ACTIONS.CREATE_ACCOUNT_SUCCESS });

/**
 * Request reset password
 */
export const requestResetAccount = email => {
    return async function(dispatch, getState, extra) {
        dispatch(requestResetAccountRequest());
        return AuthServices.resetRequest(email)
        .then(user => {
            dispatch(requestResetAccountSuccess());
            extra.history.push('/login');
            return user;
        })
        .catch(error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;
            dispatch(requestResetAccountFailure(message));;
            throw message;
        });
    }
};

const requestResetAccountRequest = () => ({ type: ACTIONS.REQUEST_RESET_ACCOUNT_REQUEST });
const requestResetAccountFailure = error => ({ type: ACTIONS.REQUEST_RESET_ACCOUNT_FAILURE, error });
const requestResetAccountSuccess = () => ({ type: ACTIONS.REQUEST_RESET_ACCOUNT_SUCCESS });

/**
 * Reset password
 */
export const resetAccount = (token, password) => {
    return async function(dispatch, getState, extra) {
        dispatch(resetAccountRequest());
        return AuthServices.reset(token, password)
        .then(user => {
            dispatch(resetAccountSuccess());
            extra.history.push('/login');
            return user;
        })
        .catch(error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;
            dispatch(resetAccountFailure(message));;
            throw message;
        });
    }
};

const resetAccountRequest = () => ({ type: ACTIONS.RESET_ACCOUNT_REQUEST });
const resetAccountFailure = error => ({ type: ACTIONS.RESET_ACCOUNT_FAILURE, error });
const resetAccountSuccess = () => ({ type: ACTIONS.RESET_ACCOUNT_SUCCESS });

/**
 * 
 * @param {String} slug 
 * @param {String} jwt 
 */
export const setFavorite = (slug) => {
    return async function(dispatch, getState, extra) {
        dispatch(setFavoriteRequest());
        return UserServices.setFavorite(slug, getState().session.jwt)
        .then(response => {
            response.advert.favorite = response.favorite;
            dispatch(setFavoriteSuccess(response.advert));
            return response.advert;
        })
        .catch(error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;
            dispatch(setFavoriteFailure(message));
            throw message;
        });
    }
}

const setFavoriteRequest = () => ({ type: ACTIONS.SET_FAVORITE_REQUEST });
const setFavoriteFailure = error => ({ type: ACTIONS.SET_FAVORITE_FAILURE, error });
const setFavoriteSuccess = advert => ({ type: ACTIONS.SET_FAVORITE_SUCCESS, advert });

/**
 * @param {Object} user 
 * @param {String} jwt 
 */
export const editUser = (user) => {   
    return async function(dispatch, getState, extra) {
        dispatch(editUserRequest());
        return UserServices.edit(user, getState().session.jwt)
        .then (response => {
            dispatch(editUserSuccess(response))
            extra.history.push('/');
            return response;
        })
        .catch(error => {
            if (error.response && error.response.status === 401) dispatch(logout());
            let message = error.response && error.response.data ? error.response.data.data : error.message;            
            dispatch(editUserFailure(message));
            throw message;
        })
    }
};

const editUserRequest = () => ({ type: ACTIONS.EDIT_ACCOUNT_REQUEST });
const editUserFailure = error => ({ type: ACTIONS.EDIT_ACCOUNT_FAILURE, error });
const editUserSuccess = user => ({ type: ACTIONS.EDIT_ACCOUNT_SUCCESS, user });

/**
 * @param {String} id 
 * @param {String} jwt Token 
 */
export const deleteAccount = (id) => {   
    return async function(dispatch, getState, extra) {
        dispatch(deleteAccountRequest());
        return UserServices.delete(id, getState().session.jwt)
        .then (response => {
            LocalStorage.cleanLocalStorage();
            dispatch(logoutSuccess());
            dispatch(deleteAccountSuccess())
            return response;
        })
        .catch(error => {
            if (error.response && error.response.status === 401) dispatch(logout());
            let message = error.response && error.response.data ? error.response.data.data : error.message;            
            dispatch(deleteAccountFailure(message));
            throw message;
        })
    }
};

const deleteAccountRequest = () => ({ type: ACTIONS.DELETE_ACCOUNT_REQUEST });
const deleteAccountFailure = error => ({ type: ACTIONS.DELETE_ACCOUNT_FAILURE, error });
const deleteAccountSuccess = () => ({ type: ACTIONS.DELETE_ACCOUNT_SUCCESS});