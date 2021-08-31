import './App.css';
import Modal from 'react-modal';


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
import MainPageInfoUpdate from './components/boss/site-management/MainPageInfoUpdate';
import ExcessToRegister from './components/boss/site-management/ExcessToRegister';
import UpdateExcessToRegister from './components/boss/site-management/UpdateExcessToRegister';
import UpdateVideo from './components/boss/site-management/UpdateVideo';
import RoleComponent from './components/boss/company-management/RoleComponent';
import MyBusiness from './components/boss/company-management/calendar/MyBusiness';
import BusinessScheduler from './components/boss/company-management/business-scheduler/BusinessScheduler';
import UpdateRole from './components/boss/company-management/UpdateRole';
import EmployeeList from './components/boss/company-management/EmployeeList';
import Employee from './components/boss/company-management/Employee';
import MyBusinessById from './components/boss/company-management/calendar/MyBusinessById';
import CalendarDayById from './components/boss/company-management/calendar/CalendarDayById';



if(localStorage.token){
  setAuthToken(localStorage.token)
}

Modal.setAppElement('#root');

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
                <BossPrivateRoutes exact path='/excess-to-register' component={ExcessToRegister} />
                <BossPrivateRoutes exact path='/update-excess-to-register/:id' component={UpdateExcessToRegister} />
                <BossPrivateRoutes exact path='/company-management' component={CompanyManagement} />
                <BossPrivateRoutes exact path='/site-management' component={SiteManagenet} />
                <BossPrivateRoutes exact path='/upload-video' component={UploadVideo} />
                <BossPrivateRoutes exact path='/update-video/:id' component={UpdateVideo} />
                <BossPrivateRoutes exact path='/main-page-info' component={MainPageInfo} />
                <BossPrivateRoutes exact path='/main-page-info-update/:id' component={MainPageInfoUpdate} />
                <BossPrivateRoutes exact path='/categories' component={Categories} />
                <BossPrivateRoutes exact path='/get-category-to-update/:id' component={UpdateCategory} />
                <BossPrivateRoutes exact path='/role-component' component={RoleComponent} />
                <BossPrivateRoutes exact path='/my-business' component={MyBusiness} />
                <BossPrivateRoutes exact path='/business-scheduler' component={BusinessScheduler} />
                <BossPrivateRoutes exact path='/my-business-by-id/:id' component={MyBusinessById} />
                <BossPrivateRoutes exact path='/day-by-id/:id' component={CalendarDayById} />
                <BossPrivateRoutes exact path='/update-role/:id' component={UpdateRole} />
                <BossPrivateRoutes exact path='/employee-list' component={EmployeeList} />
                <BossPrivateRoutes exact path='/employee/:id' component={Employee} />
            </Switch>
            </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
