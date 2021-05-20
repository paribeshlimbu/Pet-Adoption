import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
// Own modules
import Profile from './Profile';
import { SessionActions } from '../../store/GlobalActions';


/**
 * @param {Object} state 
 */
const mapStateToProps = (state) => {
    return {
        session: state.session,
        isUpdating: state.ui.isUpdating,
        error: state.ui.error,
    }
}

/**
 * @param {Function} dispatch Dispatch
 */
const mapDispatchToProps = (dispatch) => {
    return {
        // Session
        logout: () => dispatch(SessionActions.logout()),
        editUser: (user) => dispatch(SessionActions.editUser(user)),
        deleteAccount: (id) => dispatch(SessionActions.deleteAccount(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Profile));