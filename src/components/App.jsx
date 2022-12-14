import React, {Component} from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Title, Container} from './App.styled';
import { Filter } from './Filter/Filter';


export class App extends Component{
  state = {
    contacts: [
    ],
    filter: '',
  };

  
  addContact = ({ name, number }) => {
    if (this.state.contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevStat => ({
      contacts: [newContact, ...prevStat.contacts],
    }));
  };

  findContact = searchName => {
    this.setState({ filter: searchName });
  };

  deleteContact = contactId=> {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidMount() {
    const contactsInLocalStorage = JSON.parse(localStorage.getItem('contacts'));
    if (contactsInLocalStorage ) this.setState({contacts:contactsInLocalStorage})
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  };

  render= () => {
  const normalizedFilter = this.state.filter.toLowerCase();
  const visibleContacts = this.state.contacts.filter(contact =>
  contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
  <Container>
    <h1>Phonebook</h1>
    <ContactForm onSubmit={this.addContact}>
    </ContactForm>
    <Title>Contacts</Title>
    <Filter value={this.state.filter} onSearch={this.findContact} />
    <ContactList contacts={visibleContacts} deleteContact={this.deleteContact} />
  </Container>)
  
  
  }
};