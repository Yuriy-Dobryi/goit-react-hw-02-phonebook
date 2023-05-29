import { Component } from "react";
// import PropTypes from "prop-types";
import css from './ContactForm.module.css'

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  }
  
  inputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  submitClick = (e) => {
    e.preventDefault();
    const { addContact } = this.props;
    addContact()
  }

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={submitClick}>
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
    )
  }
}
// ContactForm.propTypes = {
//   title: PropTypes.string.isRequired,
//   children: PropTypes.node.isRequired,
// };