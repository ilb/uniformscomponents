import React from 'react';
import 'fomantic-ui-css/semantic.min.css';
// import 'semantic-ui-offline/semantic.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import AppForm from './AppForm';
import ManualForm from './ManualForm';
import { Segment } from 'semantic-ui-react';

export default function App() {
  return (
    <div className="ui container">
      <h1>Hello World!</h1>
      <Segment>
        <AppForm />
      </Segment>
      <Segment>
        <ManualForm />
      </Segment>
    </div>
  );
}
