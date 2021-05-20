// NPM Modules
import React from 'react'
// Material UI
// Own modules
// Assets
// CSS

const UserContext = React.createContext()

export default function withUserContext(Component) {
  return function WithUserContext(props) {
    return (
      <UserContext.Consumer>
      {userContextValue => <Component {...props} {...userContextValue} />}
      </UserContext.Consumer>
    );
  };
}