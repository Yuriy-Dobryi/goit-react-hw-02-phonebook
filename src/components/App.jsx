import { Component } from "react";
import { nanoid } from "nanoid";
import { Notify } from 'notiflix';

import styles from './App.module.css'
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";

const INITIAL_CONTACTS = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Rosie Sompson', number: '145-23-65' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
  { id: nanoid(), name: 'Jack Shepart', number: '345-53-81' },
]

export class App extends Component {
  state = {
    contacts: [...INITIAL_CONTACTS],
    filter: '',
  }

  addContact = (newContact) => {
    const { contacts } = this.state;
    const newContactName = newContact.name.toLocaleLowerCase();
    const isNewContactExist = contacts.some(({ name }) =>
      name.toLocaleLowerCase() === newContactName);
    
    if (isNewContactExist) {
      Notify.failure(`${newContact.name} is already in contacts.🧐`)
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  }

  removeContact = (id) => {
    const { contacts } = this.state;
    const updatedContacts = contacts.filter((contact) =>
      contact.id !== id);

    this.setState({
      contacts: [...updatedContacts]
    });
  }
  
  setFilter = (value) => {
    this.setState({ filter: value });
  }

  filterContacts = () => {
    const { contacts } = this.state;
    const filter = this.state.filter.toLocaleLowerCase();
    const filteredContacts = filter
      ? contacts.filter(({ name }) => name.toLocaleLowerCase().includes(filter))
      : contacts;

    return filteredContacts;
  }
  
  render() {
    const { filter } = this.state;
    const filteredContacts = this.filterContacts();

    return (
      <div className="container">
        <div className={styles.phonebook}>
          <h1 className={styles.title}>Phonebook</h1>
          <ContactForm
            addContact={this.addContact} />
        </div>

        <div>
          <h2 className={styles.title}>Contacts</h2>
          <Filter
            filter={filter}
            setFilter={this.setFilter} />
          <ContactList
            contacts={filteredContacts}
            removeContact={this.removeContact} />
        </div>
      </div>
    )
  }
}