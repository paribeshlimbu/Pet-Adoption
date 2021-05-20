// NPM Modules
import React, {useContext} from 'react';
// Material UI
import { TextField, FormControl, InputLabel } from '@material-ui/core';
// Models
// Own modules
import { Context } from '../Form';
// CSS
import './styles.css'


export default function TextAreaForm(props) {

    const context = useContext(Context);

    // Render
    return (
        <FormControl className='InputForm TextAreaForm'>
            { props.label && <InputLabel shrink htmlFor={props.name}>{props.label}</InputLabel> }
            <TextField
                name={props.name}
                value={context.inputs[props.name] || ''}
                onChange={context.handleInputChange}
                required={props.required}
                multiline={true}
                rows={3}
                inputProps={{ maxLength: props.maxLength }}
            />
        </FormControl>
    )
}