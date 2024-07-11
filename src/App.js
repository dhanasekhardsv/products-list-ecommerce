import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Dashboard from './pages/Dashboard';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;
