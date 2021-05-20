// NPM Modules
import React from 'react';
// Material UI
// Own modules
// Models
// Assets
// CSS
import './styles.css';

import withForm from '../../hocs/withForm';


const Form = ({children, ...props}) => <form {...props}>{children}</form>

export default withForm(Form);
