// Utils
// API
import ChatServices from '../../services/ChatServices';
// Actions
import * as ACTIONS from '../types/ChatTypes';
import { logout } from './SessionActions';


/**
 */
export const fetchUserChats = () => {   
    return async function(dispatch, getState, extra) {
        dispatch(fetchUserChatsRequest());
        return ChatServices.getChats(getState().session.jwt)
        .then(chats => {
            dispatch(fetchUserChatsSuccess(chats));
            return chats;
        })
        .catch (error => {
            if (error.response && error.response.status === 401) dispatch(logout());
            let message = error.response && error.response.data ? error.response.data.data : error.message;            
            dispatch(fetchUserChatsFailure(message));
            throw message;
        });
    }
};

const fetchUserChatsRequest = () => ({ type: ACTIONS.FETCH_USER_CHATS_REQUEST });
const fetchUserChatsFailure = error => ({ type: ACTIONS.FETCH_USER_CHATS_FAILURE, error });
const fetchUserChatsSuccess = chats => ({ type: ACTIONS.FETCH_USER_CHATS_SUCCESS, chats });

/**
 */
export const fetchChat = id => {   
    return async function(dispatch, getState, extra) {
        dispatch(fetchChatRequest());
        return ChatServices.getChat(id, getState().session.jwt)
        .then(chat => {
            dispatch(fetchChatSuccess(chat));
            return chat;
        })
        .catch (error => {
            if (error.response && error.response.status === 401) dispatch(logout());
            let message = error.response && error.response.data ? error.response.data.data : error.message;
            dispatch(fetchChatFailure(message));
            throw message;
        });
    }
};

const fetchChatRequest = () => ({ type: ACTIONS.FETCH_CHAT_REQUEST });
const fetchChatFailure = error => ({ type: ACTIONS.FETCH_CHAT_FAILURE, error });
const fetchChatSuccess = chat => ({ type: ACTIONS.FETCH_CHAT_SUCCESS, chat });

/**
 */
export const createChat = slug => {   
    return async function(dispatch, getState, extra) {
        dispatch(createChatRequest());
        return ChatServices.postChat(slug, getState().session.jwt)
        .then(chat => {
            dispatch(createChatSuccess(chat));
            extra.history.push(`/chats/${chat._id}`);
            return chat;
        })
        .catch (error => {
            if (error.response && error.response.status === 401) dispatch(logout());
            let message = error.response && error.response.data ? error.response.data.data : error.message;
            dispatch(createChatFailure(message));
            throw message;
        });
    }
};

const createChatRequest = () => ({ type: ACTIONS.CREATE_CHAT_REQUEST });
const createChatFailure = error => ({ type: ACTIONS.CREATE_CHAT_FAILURE, error });
const createChatSuccess = chat => ({ type: ACTIONS.CREATE_CHAT_SUCCESS, chat });