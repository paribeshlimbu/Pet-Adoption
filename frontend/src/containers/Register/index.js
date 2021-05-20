// Node modules
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
// Own components
import Register from './Register';
// Own modules
import { SessionActions } from '../../store/GlobalActions';

/**
 * @param {Object} state Es
 */
const mapStateToProps = (state) => {
    return {
        isCreating: state.ui.isCreating,
    }
}

/**
 * @param {Function} dispatch Dispat
 */
const mapDispatchToProps = (dispatch) => {
    return {
        createAccount: (login, name, email, password) => dispatch(SessionActions.createAccount(login, name, email, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Register));