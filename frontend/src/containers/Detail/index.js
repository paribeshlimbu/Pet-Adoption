// Node modules
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
// Own components
import Detail from './Detail';
// Own modules
import { AdvertsActions, SessionActions, ChatActions } from '../../store/GlobalActions';


/**
 * @param {Object} state Est
 */
const mapStateToProps = (state) => {
    return {
        session: state.session,
        chats: state.chats,
        isFetching: state.ui.isFetching,
        error: state.ui.error
    }
}

/**
 * 
 * @param {Function} dispatch Dispatch 
 */
const mapDispatchToProps = (dispatch) => {
    return {
        // Session
        logout: () => dispatch(SessionActions.logout()),
        setFavorite: (slug) => dispatch(SessionActions.setFavorite(slug)),
        // Adverts
        fetchAdvert: (slug) => dispatch(AdvertsActions.fetchAdvert(slug)),
        bookAdvert: (slug) => dispatch(AdvertsActions.bookAdvert(slug)),
        sellAdvert: (slug) => dispatch(AdvertsActions.sellAdvert(slug)),
        deleteAdvert: (slug) => dispatch(AdvertsActions.deleteAdvert(slug)),
        // Chats
        createChat: (slug) => dispatch(ChatActions.createChat(slug))
    }
}

/**
 */ 
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Detail));