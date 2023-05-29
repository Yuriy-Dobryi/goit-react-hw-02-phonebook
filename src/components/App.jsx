import { Component } from "react";
import { nanoid } from "nanoid";
import css from './App.module.css'
import { Section } from './Section/Section';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      { id: 'id-5', name: 'Rosie Sompson', number: '111-22-33' },
    ],
    filter: '',
    name: '',
    number: '',
  }

  inputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  addContact = (e) => {
    e.preventDefault();

    this.setState(({ contacts, name, number }) => ({
      contacts: [...contacts, { id: nanoid(), name, number }],
      name: ''
    }));
  }

  filterContacts = () => {
    const { contacts } = this.state;
    const filter = this.state.filter.toLocaleLowerCase();

    return filter ? contacts.filter(({ name }) => name.toLocaleLowerCase().includes(filter)) : contacts;
  }
  
  render() {
    const { filter, name, number } = this.state;
    const filteredContacts = this.filterContacts();

    return (
      <div className="container">

        <Section title={'PhoneBook'}>
          <form onSubmit={this.addContact}>
            <label>
              Name
              <input className={css.input}
                onChange={this.inputChange}
                value={name}
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
              />
            </label>

            <label>
              Number
              <input className={css.input}
                onChange={this.inputChange}
                value={number}
                type="tel"
                name="number"
              />
            </label>

            <button className={css.add} type="submit">Add contact</button>
          </form>
        </Section>

        <Section title={'Contacts'}>
          <label>
            Find contacts by name
            <input className={css.input}
              onChange={this.inputChange}
              value={filter}
              type="tel"
              name="filter"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <ul>
            {filteredContacts.map(({ id, name, number }) => (
              <li key={id}>
                <p className={css.contact}>{name}: {number}</p>
              </li>
            ))}
          </ul>
          
        </Section>
      </div>
    )
  }
}