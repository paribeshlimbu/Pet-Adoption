// NPM Modules
import React, { Component } from 'react';
// Material UI
// Own modules
// Models
// Assets
// CSS

export const Context = React.createContext();

const withForm = (WrappedComponent) => {

    /**
     */
    return class Form extends Component {
        
        // Constructor
        constructor(props) {
            super(props);
            this.state = {...props.initial}
        }

        handleInputChange = event => {
            this.setState({
                [event.target.name]: event.target.value
            }, () => this.handleNotifyChanges());
        }

        handleCheckChange = event => {
            this.setState({
                [event.target.name]: event.target.checked
            }, () => this.handleNotifyChanges());
        }
        
        handleChangeMultiple = event => {
            this.setState({
                [event.target.name]: event.target.value
            }, () => this.handleNotifyChanges());
        };

        handleChangeNumber = event => {
            this.setState({
                [event.target.name]: parseFloat(event.target.value)
            }, () => this.handleNotifyChanges());
        }

        handleSubmit = event => {
            event.preventDefault();
            this.props.onSubmit(this.state);
        }

        handleNotifyChanges = () => {
            if (this.props.extra && this.props.extra.notifyChanges) {
                this.props.extra.notifyChanges(this.state);
            }
        }

        // Reset fields
        resetInputs = initial => this.setState({...initial});
       
        // Render
        render() {
            return (
                <Context.Provider value={{
                    inputs: this.state, 
                    handleInputChange: this.handleInputChange, 
                    handleCheckChange: this.handleCheckChange,
                    handleChangeMultiple: this.handleChangeMultiple, 
                    handleChangeNumber: this.handleChangeNumber
                }}>
                    <WrappedComponent 
                        {...this.props}
                        onSubmit={this.handleSubmit}
                    />
                </Context.Provider>
            )
        }
    }
};

export default withForm;