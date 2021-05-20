// Own modules
import SocketIo from '../../socketio';
// Actions
import * as ACTIONS from '../types/SocketIoTypes';

export const connect = login => {
    SocketIo.connect(login);
    return { type: ACTIONS.SOCKETIO_CONNECT, login };
};

export const disconnect = login => {
    SocketIo.disconnect(login);
    return  { type: ACTIONS.SOCKETIO_DISCONNECT, login };
}

export const connectedUser = () => ({ type: ACTIONS.SOCKETIO_CONNECTED_USER });
export const disconnectedUser = () => ({ type: ACTIONS.SOCKETIO_DISCONNECTED_USER });
export const allOnlineUsers = onlineUsers => ({ type: ACTIONS.SOCKETIO_ALL_ONLINE_USERS, onlineUsers });
export const onlineUser = login => ({ type: ACTIONS.SOCKETIO_ONLINE_USER, login });
export const offlineUser = login => ({ type: ACTIONS.SOCKETIO_OFFLINE_USER, login });

export const inMessage = data => {   
    return async function(dispatch, getState, extra) {
        dispatch(inMessageSuccess(data));
        // If user is in chats section
        if (window.location.pathname.startsWith('/chats')) {
            if (window.location.pathname === `/chats/${data.chatId}`) {
                SocketIo.confirmChatRead({
                    chatId: data.chatId,
                    user: data.senderLogin
                });    
            } else {
                const chat = getState().chats[0];
                if (chat._id === data.chatId) {
                    SocketIo.confirmChatRead({
                        chatId: data.chatId,
                        user: data.senderLogin
                    });        
                } else {
                    extra.notifyNewChats(data.senderLogin);
                }
            }
        } else {
            extra.notifyNewChats(data.senderLogin);
        }
    }
};

const inMessageSuccess = data => ({ type: ACTIONS.SOCKETIO_IN_MESSAGE, data });

export const outMessage = data => ({ type: ACTIONS.SOCKETIO_OUT_MESSAGE, data });
export const outMessageSent = data => ({ type: ACTIONS.SOCKETIO_OUT_MESSAGE_SENT, data });
export const outMessagesConfirmed = data => ({ type: ACTIONS.SOCKETIO_OUT_MESSAGES_CONFIRMED, data });