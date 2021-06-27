import './App.css';

//CORE REACT
import {Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//REACT APPLICATION COMPONENTS
import Navbar from './components/Navbar';
import Main from './components/pages/Main'

//MODAL COMPONENTS
import Alert from './components/forms/alert-forms/Alert';

//PROTECTED ROUTES
import Register from './components/Register';
import  RegisterForm  from './components/staffs/RegisterForm';
import LoginForm from './components/staffs/LoginForm';
import StaffDashboard from './components/staffs/StaffDashboard';
import CompanyManagement from './components/boss/company-management/CompanyManagement';
import SiteManagenet from './components/boss/site-management/SiteManagement';
import HomePageVideo from './components/boss/site-management/HomePageVideo';

//REDUX
import { Provider } from 'react-redux';
import store from './redux/store';

//GET EMPLOYEE
import { loadEmployee } from './redux/actions/employee_actions';

//LOAD PASSWORD NAME AND PASSWORD TO GET ACCESS TO REGISTER PAGE
import { loadEntryToken } from './redux/actions/register_entry';

//MATERIALIZE is a UI library
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

//REACT APPLICATION MIDDLEWARES
import setAuthToken from './utils/setAuthToken';
import materializeMin from 'materialize-css/dist/js/materialize.min.js';


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

  useEffect(() => {
    store.dispatch(loadEntryToken())
  },[]);
  
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar/>
          <Alert />
            <Switch>
              <Route exact path="/" component={Main}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/register-form" component={RegisterForm}/>
              <Route exact path="/login" component={LoginForm}/>
              <Route exact path="/employee-dashboard" component={StaffDashboard}/>
              <Route exact path='/company-management' component={CompanyManagement} />
              <Route exact path='/site-management' component={SiteManagenet} />
              <Route exact path='/home-page-video' component={HomePageVideo} />
            </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
