// Components
import App from './App';
// HOCs
import { withNamespaces } from 'react-i18next';
import { withSnackbar } from 'notistack';


export default withNamespaces()(withSnackbar(App));