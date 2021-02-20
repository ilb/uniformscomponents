import React from 'react';
import 'semantic-ui-offline/semantic.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import AppForm from './AppForm';

export default function App() {
  return (
    <div className="ui container">
      <h1>Hello World!</h1>
      <AppForm />
    </div>
  );
}
