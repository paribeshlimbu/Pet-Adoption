// Node modules
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { withNamespaces } from 'react-i18next';
// Own Components
import Home from './Home';
// Own modules
import { AdvertsActions, SessionActions, FiltersActions, ChatActions } from '../../store/GlobalActions';
import { getVisibleAdverts } from '../../store/selectors/AdvertsSelectors';


/**
 * @param {Object} state E
 */
const mapStateToProps = (state) => {
    return {
        adverts: getVisibleAdverts(state.adverts, state.filters),
        session: state.session,
        chats: state.chats,
        tags: state.tags,
        ui: state.ui,
        filters: state.filters,
        lastCall: state.lastCall
    }
}

/**
 * @param {Function} dispatch 
 */
const mapDispatchToProps = (dispatch) => {
    return {
        // Session
        logout: () => dispatch(SessionActions.logout()),
        setFavorite: (slug) => dispatch(SessionActions.setFavorite(slug)),
        // Filters
        setFilters: filters => dispatch(FiltersActions.setFilters(filters)),
        resetFilters: () => dispatch(FiltersActions.resetFilters()),
        setCurrentPage: pageNumber => dispatch(FiltersActions.setCurrentPage(pageNumber)),
        // Adverts
        fetchTags: () => dispatch(AdvertsActions.fetchTags()),
        fetchAdverts: () => dispatch(AdvertsActions.fetchAdverts()),
        fetchIterateAdverts: direction => dispatch(AdvertsActions.fetchIterateAdverts(direction)),
        searchAdverts: filters => dispatch(AdvertsActions.searchAdverts(filters)),
        // Chats
        createChat: (slug) => dispatch(ChatActions.createChat(slug)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withNamespaces()(Home)));