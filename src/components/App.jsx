import { Component } from "react";
import { nanoid } from "nanoid";
import css from './App.module.css'

import { ContactForm } from "./ContactForm/ContactForm";

const INITIAL_CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  { id: 'id-5', name: 'Rosie Sompson', number: '111-22-33' },
]

export class App extends Component {
  state = {
    contacts: [...INITIAL_CONTACTS],
    filter: '',
  }

  addContact = (newContact) => {
    this.setState(({ contacts}) => ({
      contacts: [...contacts, newContact],
    }));
  }

  filterContacts = () => {
    const { contacts } = this.state;
    const filter = this.state.filter.toLocaleLowerCase();

    return filter ? contacts.filter(({ name }) => name.toLocaleLowerCase().includes(filter)) : contacts;
  }
  
  render() {
    return (
      <div className="container">
        <h1 className={css["phonebook-title"]}>Phonebook</h1>
        <ContactForm  
          inputChange={this.inputChange}
        />
        <h2 className={css["contacts-title"]}>Contacts</h2>
        {/* <Filter ... />
        <ContactList ... /> */}
      </div>
    )
  }

  // rendere() {
  //   const { filter, name, number } = this.state;
  //   const filteredContacts = this.filterContacts();

  //   return (
  //     <div className="container">

  //       <Section title={'Contacts'}>
  //         <label>
  //           Find contacts by name
  //           <input className={css.input}
  //             onChange={this.inputChange}
  //             value={filter}
  //             type="tel"
  //             name="filter"
  //             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
  //             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
  //             required
  //           />
  //         </label>
  //         <ul>
  //           {filteredContacts.map(({ id, name, number }) => (
  //             <li key={id}>
  //               <p className={css.contact}>{name}: {number}</p>
  //             </li>
  //           ))}
  //         </ul>
          
  //       </Section>
  //     </div>
  //   )
  // }
}