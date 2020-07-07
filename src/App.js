import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Jobs } from './pages/jobs/Jobs.page';
import { AddJob } from './pages/add-job/AddJob.page';
import { Job } from './pages/job/Job.page';
import { NotFound } from './pages/not-found/NotFound.page';
import { SignUp } from './pages/sign-up/SignUp.page';
import { Login } from './pages/login/Login.page';
import { Header } from './components/header/Header.component';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { Landing } from './pages/landing/Landing.page';
import { Profile } from './pages/profile/Profile.page';

import CustomTheme from './theme';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    // checking to see if there is logged in user
    const loggedInUser = window.localStorage.getItem('loggedInUser');

    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
    }
  }, [])

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
        <Header user={user} setUser={setUser} />
        <Switch>
          
          <Route exact path="/" render={() => user ? <Redirect to="/jobs" /> : <Landing />} />
          <Route exact path="/signup" render={() => user ? <Redirect to="/jobs" /> : <SignUp setUser={setUser} />} />
          <Route exact path="/login" render={() => user ? <Redirect to="/jobs" /> : <Login setUser={setUser} />} />
          <Route exact path="/jobs" render={props => user ? <Jobs user={user} {...props} /> : <Redirect to="/login" />} />
          <Route exact path="/jobs/:id" render={props => user ? <Job user={user} {...props} /> : <Redirect to="/login" />} />
          <Route exact path="/add-job" render={props => user ? <AddJob user={user} {...props} /> : <Redirect to="/login" />} />
          <Route exact path="/profile" render={props => user ? <Profile {...props} /> : <Login />} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
