// Node modules
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
// Own components
import RequestReset from './RequestReset';
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
        requestResetAccount: (name) => dispatch(SessionActions.requestResetAccount(name)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(RequestReset));