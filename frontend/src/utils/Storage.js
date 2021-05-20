// NPM Modules
// Material UI
// Own modules
// Assets
// CSS

/**
 * local storage
 */
const LocalStorage = {

    /**
     *  local storage
     */
    saveLocalStorage: (session) => {
        if (session.name) {
            localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_ID, JSON.stringify(session));
        }
    },

    /**
     */
    readLocalStorage: () => {
        try {
            const session = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_ID);
            return JSON.parse(session)               
        } catch (error) {
            localStorage.clear();
            return undefined;
        }
    },
    
    /**
     * Clean local storage
     */
    cleanLocalStorage: () => {
        localStorage.clear();
    }
}

/**
 */
export default LocalStorage;