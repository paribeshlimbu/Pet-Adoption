// Endpoint
const API_URL = process.env.REACT_APP_API_URL.replace('/apiv1','');

// Empty advert aux
export const EMPTY_CHAT = {
    _id: undefined,
    advert: undefined,
    users: [],
    messages: [],
}

export const CHAT_CONSTANTS = {
    STATUS: {
        ACK: 0, // Assuming what read from API is already read.
        WAIT: 1,
        SENT: 2
    }
}

export default class Chat {
    
    /**
     * Constructor
     * @param {Object} chat Chat objet 
     */    
    constructor(chat) {
        this._id = chat._id;
        this.advert = chat.advert;
        this.users = chat.users;
        this.messages = chat.messages;
        // Adjust path to images
        this.users.map((user, index) => user.avatar = `${API_URL}${user.avatar}`);
        this.advert.thumbnail = chat.advert.thumbnail.startsWith('/images/')?`${API_URL}${chat.advert.thumbnail}`:chat.advert.thumbnail;
   }
}