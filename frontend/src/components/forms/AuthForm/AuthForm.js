// NPM Modules
import React from 'react';
import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
// Material UI
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FaceIcon from '@material-ui/icons/Face';
import Button from '@material-ui/core/Button';
// Own components
import InputForm from '../InputForm';
import Form from '../Form';
// Models
// Own modules
// Assets
import imageLogo from '../../../assets/images/logo_large.png';
import imageSpinner from '../../../assets/images/spinner.gif';
// CSS
import './styles.css';

const FORM_TYPES = {
    requestReset: withNamespaces()(RequestResetForm),
    register: withNamespaces()(RegisterForm),
    reset: withNamespaces()(ResetForm),
    login: withNamespaces()(LoginForm)
};

export default function AuthForm(props) {  
    const submit = (inputs) => props.onSubmit(inputs);
    const Content = FORM_TYPES[props.form];
    return (
        <div className='Login'>
            <div className='Login__Wrapper'>
                <Form className='Login__Form' onSubmit={submit}>
                    <Link to='/'>
                        <div className='Login__ImageWrapper'>
                            <img src={imageLogo} className='Login__Logo' alt='Petadoption-logo' />
                        </div>
                    </Link>
                    <Content/>
                    <div className='LoadingSmall'>
                    { props.isLoading && <img src={imageSpinner} className='LoadingSmall__Spinner' alt='spinner'/> }
                    </div>
                </Form>
            </div>
        </div>
    );
}

// Login form
function LoginForm(props) {
    const { t } = props;
    return (
        <React.Fragment>
            <input name='username' autoComplete='username' hidden></input> {/* Improve accessibility: https://goo.gl/9p2vKq)*/}
            <InputForm name='login' type='login' placeholder={t('type your login')} maxLength={'15'} required startIcon={<PermIdentityIcon/>} autoComplete='username'/>
            <InputForm name='password' type='password' placeholder={t('type your password')} maxLength={'15'} required endIcon={<LockOpenIcon/>} autoComplete='current-password'/>
            <p className='Login__Help'>{t('enter your credentials to login')}</p>
            <div className='Login__Buttons'>
                <Button className='Button' type='submit' variant='contained' color='primary'> {t('Login')} </Button>
                <Button className='Button' variant='contained' color='secondary' component={Link} to='/reset'> {t('Reset password')} </Button>
                <Link className='Login__Link' to='/register'>{t('Create an account')}</Link>
            </div>
        </React.Fragment>
    );
}

// Create new user form
function RegisterForm(props) {
    const { t } = props;
    return (
        <React.Fragment>
            <InputForm name='login' type='text' placeholder={t('type your login')} maxLength={'15'} required startIcon={<PermIdentityIcon/>}/>
            <InputForm name='name' type='text' placeholder={t('type your name')} maxLength={'30'} required startIcon={<FaceIcon/>}/>
            <InputForm name='email' type='email' placeholder={t('type your email')} maxLength={'150'} required startIcon={<MailOutlineIcon/>}/>
            <InputForm name='password' type='password' placeholder={t('type your password')} autoComplete='on' maxLength={'15'} required endIcon={<LockOpenIcon/>}/>
            <InputForm name='password_2' type='password' placeholder={t('repeat your password')} autoComplete='on' maxLength={'15'} required endIcon={<LockOpenIcon/>}/>
            <p className='Login__Help'>{t('better use a gmail account to receive our emails')}</p>
            <div className='Login__Buttons'>
                <Button className='button' type='submit' variant='contained' color='primary'>{t('Create user')}</Button>
                <Link className='Login__Link' to='/login'>{t('Go to login')}</Link>
            </div>
        </React.Fragment>
    );
}

// Request reset password form
function RequestResetForm(props) {
    const { t } = props;
    return (
        <React.Fragment>
            <InputForm name='email' type='email' placeholder={t('type your email')} maxLength={'150'} required startIcon={<PermIdentityIcon/>}/>
            <p className='Login__Help'>{t('enter your email to restart your password')}</p>
            <div className='Login__Buttons'>
                <Button className='button' type='submit' variant='contained' color='primary'>{t('Send me an email')}</Button>
                <Link className='Login__Link' to='/login'>{t('Go to login')}</Link>
            </div>
        </React.Fragment>
    );
}

// Reset password form
function ResetForm(props) {
    const { t } = props;
    return (
        <React.Fragment>
            <InputForm name='password' type='password' placeholder={t('type your password')} maxLength={'15'} autocomplete='on' required endIcon={<LockOpenIcon/>}/>
            <InputForm name='password_2' type='password' placeholder={t('repeat your password')} maxLength={'15'} autocomplete='on' required endIcon={<LockOpenIcon/>}/>
            <p className='Login__Help'>{t('enter your new password')}</p>
            <div className='Login__Buttons'>
                <Button className='button' type='submit' variant='contained' color='primary'>{t('Reset password')}</Button>
                <Link className='Login__Link' to='/login'>{t('Go to login')}</Link>
            </div>
        </React.Fragment>
    );
}