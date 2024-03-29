import {
   ADD_CONTACT,
   GET_CONTACTS,
   UPDATE_CONTACT,
   DELETE_CONTACT,
   CLEAR_CONTACTS,
   FILTER_CONTACTS,
   CLEAR_FILTER,
   SET_CURRENT,
   CLEAR_CURRENT,
   CONTACT_ERROR
} from '../types';

export default (state, action) => {
   switch (action.type) {
      case ADD_CONTACT:
         return {
            ...state,
            contacts: [action.payload, ...state.contacts],
            loading: false
         };
      case UPDATE_CONTACT:
         return {
            ...state,
            contacts: state.contacts.map(contact =>
               contact._id === action.payload._id ? action.payload : contact
            ),
            loading: false
         };
      case GET_CONTACTS:
         return {
            ...state,
            contacts: action.payload,
            loading: false
         };
      case DELETE_CONTACT:
         return {
            ...state,
            contacts: state.contacts.filter(
               contact => contact._id !== action.payload
            ),
            loading: false
         };
      case CLEAR_CONTACTS:
         return {
            ...state,
            contacts: null,
            current: null,
            filtered: null,
            error: null
         };
      case SET_CURRENT:
         return {
            ...state,
            current: action.payload
         };
      case CLEAR_CURRENT:
         return {
            ...state,
            current: null
         };
      case FILTER_CONTACTS:
         return {
            ...state,
            filtered: state.contacts.filter(contact => {
               const regEx = new RegExp(`${action.payload}`, 'gi');
               return contact.name.match(regEx) || contact.email.match(regEx);
            })
         };
      case CLEAR_FILTER:
         return {
            ...state,
            filtered: null
         };
      case CONTACT_ERROR:
         return {
            ...state,
            error: action.payload
         };

      default:
         return state;
   }
};
