import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './components/Form/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';

import Container from './App.styled';

export default function App() {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onFilter = e => {
    return setFilter(e.currentTarget.value);
  };

  const addContact = (name, number) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevState => {
      return [contact, ...prevState];
    });
  };

  function deleteContact(id) {
    setContacts(contacts.filter(contact => contact.id !== id));
  }
  const visibleContact = contacts?.filter(el =>
    el.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <h1>PhoneBook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} onFilter={onFilter} />
      <ContactList visible={visibleContact} onDelete={deleteContact} />
    </Container>
  );
}
