import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import AppStateProvider from './views/components/AppStateProvider';
import AppSwitch from './AppSwitch';
import AppTheme from './views/components/common/AppTheme';

const App: React.FC = () => (
  <>
    <CssBaseline />
    <AppStateProvider>
      <AppTheme>
        <BrowserRouter>
          <AppSwitch />
        </BrowserRouter>
      </AppTheme>
    </AppStateProvider>
  </>
);

export default App;
