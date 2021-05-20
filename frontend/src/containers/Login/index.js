// NPM modules
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
// Own components
import Login from './Login';
// Own modules
import { SessionActions } from '../../store/GlobalActions';


/**
 * @param {Object} state Es
 */
const mapStateToProps = (state) => {
    return {
        isAuthenticating: state.ui.isAuthenticating,
    }
}

/**
 * @param {Function} dispatch Dispatch 
 */
const mapDispatchToProps = (dispatch) => {
    return {
        login: (login, password) => dispatch(SessionActions.login(login, password)),
        activateAccount: (token) => dispatch(SessionActions.activateAccount(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Login));