// NPM Modules
import React, { useEffect } from 'react';
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
// Components
import PrivateRoute from '../../components/utils/PrivateRoute';
// Containers
import SectionList from '../SectionList';
import Detail from '../Detail';
import Edit from '../Edit';
import Login from '../Login';
import Register from '../Register';
import RequestReset from '../RequestReset';
import Reset from '../Reset';
import Profile from '../Profile';
import Home from '../Home';
import Error404 from '../Error404';
import Chats from '../Chats';
// Own modules
import { SessionActions } from '../../store/GlobalActions';
import configureStore, { history } from '../../store';
import { initialState } from '../../store/InitialState';
import SocketIo from '../../socketio/';
import LocalStorage from '../../utils/Storage';
// Models
// Assets
// CSS

// APP Root Component
export default function App(props) {

    // 
    const { enqueueSnackbar, t } = props;

    // Handle actions performed from a push notification
    const handleNotifyAction = (content) => {
        switch (content.action) {
            case 'navigate':
                // 
                history.push(content.data)
                break;
            case 'delete':
                // 
                store.dispatch(SessionActions.setFavorite(content.data))
                    .then(() => {
                        enqueueSnackbar(t('pet deleted from favorites'), { variant: 'success' });
                        history.push('/favorites')
                    })
                    .catch(error => enqueueSnackbar(t('Error deleting advert from favorites ERROR', { error }), { variant: 'error' }));
                break;
            case 'add':
                // 
                store.dispatch(SessionActions.setFavorite(content.data))
                    .then(() => {
                        enqueueSnackbar(t('pet added to favorites'), { variant: 'success' });
                        history.push('/favorites')
                    })
                    .catch(error => enqueueSnackbar(t('Error deleting advert from favorites ERROR', { error }), { variant: 'error' }));
                break;
            default:
                console.error('Uncontrolled action returned by service worker');
        }
    }

    // New chats received
    const notifyNewChats = user => {
        enqueueSnackbar(t('Chat arrived USER', { user }), { variant: 'success' });
    }

    // Session storage
    const session = LocalStorage.readLocalStorage();
    // 
    const store = configureStore(initialState, handleNotifyAction, SocketIo, notifyNewChats);

    // Dispatch login in case of session in local storage
    useEffect(() => {
        if (session && session.jwt) {
            store.dispatch(SessionActions.loginWithToken(session.jwt))
                .catch(error => enqueueSnackbar(error, { variant: 'error', }));
        }
    }, [store, session, enqueueSnackbar, t]);

    // Render
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path='/login' exact component={Login} />
                    <Route path='/register' exact component={Register} />
                    <Route path='/reset' exact component={RequestReset} />
                    <Route path='/reset/:token' exact component={Reset} />
                    <Route path='/activate/:token' exact component={Login} />
                    <Route path='/published/:login' exact render={(props) => <SectionList {...props} listType='published' />} />
                    <PrivateRoute path='/history' exact render={(props) => <SectionList {...props} listType='history' />} />
                    <PrivateRoute path='/favorites' exact render={(props) => <SectionList {...props} listType='favorites' />} />
                    <PrivateRoute path='/advert/create' exact render={(props) => <Edit {...props} mode='create' />} />
                    <PrivateRoute path='/advert/edit/:slug' exact render={(props) => <Edit {...props} mode='edit' />} />
                    <PrivateRoute path='/chats/:id?' exact component={Chats} />
                    <PrivateRoute path='/profile' exact component={Profile} />
                    <Route path='/advert/:slug' exact component={Detail} />
                    <Route path='/' exact component={Home} />
                    <Route component={Error404} />
                </Switch>
            </ConnectedRouter>
        </Provider>
    );
}