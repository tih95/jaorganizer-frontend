import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Header } from './components/header/Header.component';
import { ThemeProvider, CSSReset, Spinner } from '@chakra-ui/core';

import CustomTheme from './theme';

import 'react-toastify/dist/ReactToastify.css';

const Landing = lazy(() => import('./pages/landing/Landing.page'));
const SignUp = lazy(() => import('./pages/sign-up/SignUp.page'));
const Login = lazy(() => import('./pages/login/Login.page'));
const Account = lazy(() => import('./pages/account/Account.page'));
const Jobs = lazy(() => import('./pages/jobs/Jobs.page'));
const AddJob = lazy(() => import('./pages/add-job/AddJob.page'));
const Job = lazy(() => import('./pages/job/Job.page'));
const NotFound = lazy(() => import('./pages/not-found/NotFound.page'));

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
        <Suspense fallback={<Spinner size="xl" />}>
          <Switch>
            <Route exact path="/" render={() => user ? <Redirect to="/jobs" /> : <Landing />} />
            <Route exact path="/signup" render={() => user ? <Redirect to="/jobs" /> : <SignUp setUser={setUser} />} />
            <Route exact path="/login" render={() => user ? <Redirect to="/jobs" /> : <Login setUser={setUser} />} />
            <Route exact path="/jobs" render={props => user ? <Jobs user={user} {...props} /> : <Redirect to="/login" />} />
            <Route exact path="/jobs/:id" render={props => user ? <Job user={user} {...props} /> : <Redirect to="/login" />} />
            <Route exact path="/add-job" render={props => user ? <AddJob user={user} {...props} /> : <Redirect to="/login" />} />
            <Route exact path="/account" render={props => user ? <Account {...props} user={user} setUser={setUser} /> : <Redirect to="/login" />} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Suspense>
      </div>
    </ThemeProvider>
  );
}

export default App;
