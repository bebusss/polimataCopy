import React, { useState } from 'react';
import LoginScreen from './src/screens/LoginScreen';
import ContactsListScreen from './src/screens/ContactsListScreen';
import ContactDetailScreen from './src/screens/ContactDetailScreen';

export default function App() {
  const [screen, setScreen] = useState('login');
  const [selectedContact, setSelectedContact] = useState(null);

  const navigate = (screenName, params) => {
    if (params && params.contact) {
      setSelectedContact(params.contact);
    }
    setScreen(screenName);
  };

  const goBack = () => {
    setScreen('contacts');
    setSelectedContact(null);
  };

  if (screen === 'login') {
    return <LoginScreen navigation={{ replace: (s) => setScreen(s.toLowerCase().replace('list', '')) }} />;
  }

  if (screen === 'contacts') {
    return <ContactsListScreen navigation={{ navigate, replace: (s) => setScreen('login') }} />;
  }

  if (screen === 'detail') {
    return (
      <ContactDetailScreen
        route={{ params: { contact: selectedContact, onUpdate: () => {} } }}
        navigation={{ goBack }}
      />
    );
  }

  return <LoginScreen navigation={{ replace: (s) => setScreen(s.toLowerCase()) }} />;
}
