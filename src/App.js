import './App.css';
import {Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Register from './components/Register';
import  RegisterForm  from './components/staffs/RegisterForm';
import { Provider } from 'react-redux';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import store from './redux/store';
import setAuthToken from './utils/setAuthToken';
import { loadEmployee } from './redux/actions/employee_actions';
import LoginForm from './components/staffs/LoginForm';
import StaffDashboard from './components/staffs/StaffDashboard';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {

  

  useEffect(() => {
    //Materialize initialization
    M.AutoInit();
  });

  useEffect(() => {
    store.dispatch(loadEmployee())
  },[]);
  
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar/>
            <Switch>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/register-form" component={RegisterForm}/>
              <Route exact path="/login" component={LoginForm}/>
              <Route exact path="/employee-dashboard" component={StaffDashboard}/>
            </Switch>
        </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
