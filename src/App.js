import './App.css';

//CORE REACT
import {Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//REACT APPLICATION COMPONENTS
import Header from './components/pages/navigation/Header';
import Navbar from './components/pages/navigation/Navbar';
import Main from './components/pages/Main';
import Category from './components/pages/categories/Category';

//MODAL COMPONENTS
import Alert from './components/forms/alert-forms/Alert';

//PROTECTED ROUTES
import Register from './components/Register';
import RegisterForm  from './components/staffs/RegisterForm';
import LoginForm from './components/staffs/LoginForm';
import StaffDashboard from './components/staffs/StaffDashboard';
import CompanyManagement from './components/boss/company-management/CompanyManagement';
import SiteManagenet from './components/boss/site-management/SiteManagement';
import UploadVideo from './components/boss/site-management/UploadVideo';
import EmployeePrivateRoutes from './components/routing/EmployeePrivateRoutes';
import BossPrivateRoutes from './components/routing/BossPrivateRoutes';
import DetailedVideo from './components/pages/videos/DetailedVideo';

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
//import materializeMin from 'materialize-css/dist/js/materialize.min.js';
import Categories from './components/boss/site-management/Categories';
import UpdateCategory from './components/boss/site-management/UpdateCategory';
import MainPageInfo from './components/boss/site-management/MainPageInfo';



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
          <Header/>
          <Navbar />
          <Alert />
          <div className='main_app_container'>
            <Switch>
                <Route exact path="/" component={Main}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/register-form" component={RegisterForm}/>
                <Route exact path="/login" component={LoginForm}/>
                <Route path="/category/:slug" exact component={Category} />
                <Route exact path="/video/:slug" component={DetailedVideo} />
                <EmployeePrivateRoutes exact path="/employee-dashboard" component={StaffDashboard}/>
                <BossPrivateRoutes exact path='/company-management' component={CompanyManagement} />
                <BossPrivateRoutes exact path='/site-management' component={SiteManagenet} />
                <BossPrivateRoutes exact path='/upload-video' component={UploadVideo} />
                <BossPrivateRoutes exact path='/main-page-info' component={MainPageInfo} />
                <BossPrivateRoutes exact path='/categories' component={Categories} />
                <BossPrivateRoutes exact path='/get-category-to-update/:id' component={UpdateCategory} />
            </Switch>
            </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
