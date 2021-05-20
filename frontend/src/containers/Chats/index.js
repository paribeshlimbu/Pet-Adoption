// Node modules
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { withNamespaces } from 'react-i18next';
// Own Components
import Chats from './Chats';
// Models
// Own modules
import { ChatActions, SessionActions, SocketIoActions } from '../../store/GlobalActions';

/**
 * @param {Object} state 
 */
const mapStateToProps = (state) => {
    return {
        socketIo: state.socketIo,
        session: state.session,
        chats: state.chats,
        ui: state.ui
    }
}

/**
 * @param {Function} dispatch Dispatch 
 */
const mapDispatchToProps = (dispatch) => {
    return {
        // Session
        logout: () => dispatch(SessionActions.logout()),
        // Chats
        fetchUserChats: () => dispatch(ChatActions.fetchUserChats()),
        fetchChat: id => dispatch(ChatActions.fetchChat(id)),
        // Sockect Io
        connectSocket: login => dispatch(SocketIoActions.connect(login))
    }
}

/**
 */ 
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withNamespaces()(Chats)));