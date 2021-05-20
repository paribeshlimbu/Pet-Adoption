// Node modules
import { connect } from 'react-redux';
// Own components
import Error404 from './Error404';
// Own modules
import { SessionActions } from '../../store/GlobalActions';


/**
 * @param {Object} state E
 */
const mapStateToProps = (state) => {
    return {
        session: state.session,
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
    }
}

/**
 */ 
export default connect(mapStateToProps, mapDispatchToProps)(Error404);