// Node modules
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
// Own components
import Edit from './Edit';
// Own modules
import { AdvertsActions, SessionActions } from '../../store/GlobalActions';

/**
 * @param {Object} state Es
 */
const mapStateToProps = (state) => {
    return {
        session: state.session,
        tags: state.tags,
        ui: state.ui
    }
}

/**
 * @param {Function} dispatch Dispatch d
 */
const mapDispatchToProps = (dispatch) => {
    return {
        // Session
        logout: () => dispatch(SessionActions.logout()),
        // Adverts
        fetchAdvert: (slug) => dispatch(AdvertsActions.fetchAdvert(slug)),
        editAdvert: (advert) => dispatch(AdvertsActions.editAdvert(advert)),
        createAdvert: (advert) => dispatch(AdvertsActions.createAdvert(advert))
    }
}

/**
 */ 
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Edit));

/*  .
    
    ----------------------------------------------------
    const mapDispatchToProps = {
        editAdvert,
        createAdvert
    }

  
    ----------------------------------------------------
    import * as actions from '../../store/actions';
    const mapDispatchToProps = actions;
*/