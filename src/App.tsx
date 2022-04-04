import React from 'react';
import './App.css';
import CovidHome from './screens/gameHome';
import PageHeader from './components/PageHeader/PageHeader';

function App() {
  return (
    <div className="App">
      <PageHeader/>
      <CovidHome/>
    </div>
  );
}

export default App;
