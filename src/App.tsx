import React from 'react';

import { BrowserRouter   } from 'react-router-dom';
import GlobalStyle from './global/globalStyles';
import AppProvider from './hooks';

import Routes from './routes';

function App() {

  return (
    <BrowserRouter>
      <AppProvider>
       <Routes />
      </AppProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
