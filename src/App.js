import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Jobs } from './pages/jobs/Jobs.page';
import { AddJob } from './pages/add-job/AddJob.page';
import { Job } from './pages/job/Job.page';
import { NotFound } from './pages/not-found/NotFound.page';
import { Header } from './components/header/Header.component';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import CustomTheme from './theme';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ThemeProvider theme={CustomTheme}>
      <CSSReset />
      <div className="App">
        <ToastContainer 
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
        />
        <Header />
        <Switch>
          <Route exact path="/jobs" component={Jobs} />
          <Route exact path="/jobs/:id" component={Job} />
          <Route exact path="/add-job" component={AddJob} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
