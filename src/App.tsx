import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import AppStateProvider from './views/components/AppStateProvider';
import AppSwitch from './AppSwitch';

const App: React.FC = () => (
  <>
    <CssBaseline />
    <AppStateProvider>
      <BrowserRouter>
        <AppSwitch />
      </BrowserRouter>
    </AppStateProvider>
  </>
);

export default App;
