import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
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

const ContactState = props => {
   const initialState = {
      contacts: null,
      current: null,
      filtered: null,
      error: null
   };

   const [state, dispatch] = useReducer(contactReducer, initialState);

   const addContact = async contact => {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };

      try {
         const res = await axios.post('/api/contacts', contact, config);
         dispatch({ type: ADD_CONTACT, payload: res.data });
      } catch (error) {
         dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
      }
   };

   const updateContact = async contact => {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };

      try {
         const res = await axios.put(
            `/api/contacts/${contact._id}`,
            contact,
            config
         );
         dispatch({ type: UPDATE_CONTACT, payload: res.data });
      } catch (error) {
         dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
      }
   };

   const getContacts = async () => {
      try {
         const res = await axios.get('/api/contacts');
         dispatch({ type: GET_CONTACTS, payload: res.data });
      } catch (error) {
         dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
      }
   };

   const deleteContact = async id => {
      try {
         await axios.delete(`/api/contacts/${id}`);
         dispatch({ type: DELETE_CONTACT, payload: id });
      } catch (error) {
         dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
      }
   };

   const clearContacts = () => {
      dispatch({ type: CLEAR_CONTACTS });
   };

   const setCurrent = contact => {
      dispatch({ type: SET_CURRENT, payload: contact });
   };

   const clearCurrent = () => {
      dispatch({ type: CLEAR_CURRENT });
   };

   const filterContacts = text => {
      dispatch({ type: FILTER_CONTACTS, payload: text });
   };

   const clearFilter = () => {
      dispatch({ type: CLEAR_FILTER });
   };

   return (
      <ContactContext.Provider
         value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            addContact,
            updateContact,
            getContacts,
            deleteContact,
            clearContacts,
            setCurrent,
            clearCurrent,
            filterContacts,
            clearFilter
         }}
      >
         {props.children}
      </ContactContext.Provider>
   );
};

export default ContactState;
