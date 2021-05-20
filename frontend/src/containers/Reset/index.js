// Node modules
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
// Own components
import Reset from './Reset';
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
        resetAccount: (token, password) => dispatch(SessionActions.resetAccount(token, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Reset));