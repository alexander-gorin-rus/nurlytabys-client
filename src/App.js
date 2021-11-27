import Modal from 'react-modal';

import {Fragment, useEffect} from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import './App.css';

import Register from './components/Register';
import store from './redux/store';
import setAuthToken from './utils/setAuthToken';
import BossPage from './components/boss/BossPage';
import ChangeStaffInfo from './components/boss/ChangeStaffInfo';
import Main from './components/pages/Main';
import BossPrivateRoutes from './components/routing/BossPrivateRoutes';
import EmployeePrivateRoutes from './components/routing/EmployeePrivateRoutes';
import LoginForm from './components/staffs/LoginForm';
import RegisterForm  from './components/staffs/RegisterForm';
import { loadEmployee } from './redux/actions/employee_actions';
import { loadEntryToken } from './redux/actions/register_entry';
import CompanyManagement from './components/boss/company-management/CompanyManagement';
import Employee from './components/boss/company-management/Employee';
import EmployeeList from './components/boss/company-management/EmployeeList';
import RoleComponent from './components/boss/company-management/RoleComponent';
import UpdateRole from './components/boss/company-management/UpdateRole';
import Categories from './components/boss/site-management/Categories';
import ExcessToRegister from './components/boss/site-management/ExcessToRegister';
import MainPageInfo from './components/boss/site-management/MainPageInfo';
import MainPageInfoUpdate from './components/boss/site-management/MainPageInfoUpdate';
import SiteManagenet from './components/boss/site-management/SiteManagement';
import UpdateCategory from './components/boss/site-management/UpdateCategory';
import UpdateExcessToRegister from './components/boss/site-management/UpdateExcessToRegister';
import UpdateVideo from './components/boss/site-management/UpdateVideo';
import UploadVideo from './components/boss/site-management/UploadVideo';
import Alert from './components/forms/alert-forms/Alert';
import Category from './components/pages/categories/Category';
import CompletedWorks from './components/pages/completed-works/CompletedWorks';
import HeavyMachines from './components/pages/heavy-machines/HeavyMachines';
import Header from './components/pages/navigation/Header';
import Navbar from './components/pages/navigation/Navbar';
import SmallMech from './components/pages/small-mech/SmallMech';
import DetailedVideo from './components/pages/videos/DetailedVideo';
import StaffDashboard from './components/staffs/staff-calendar/StaffDashboard';
import MyBusiness from './components/boss/company-management/calendar/MyBusiness';
import EmployeeWithTasks from './components/boss/company-management/tasks/EmployeeWithTasks';
import Task from './components/boss/company-management/tasks/Task';
import TaskFullInfo from './components/boss/company-management/tasks/TaskFullInfo';
import UpdateTasksLength from './components/boss/company-management/tasks/UpdateTasksLength';



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
                <Route exact path="/completed-works" component={CompletedWorks} />
                <Route exact path="/heavy-machines" component={HeavyMachines} />
                <Route exact path="/small-mech" component={SmallMech} />
                <EmployeePrivateRoutes exact path="/employee-dashboard" component={StaffDashboard}/>
                <EmployeePrivateRoutes exact path="/task-full-info/:id" component={TaskFullInfo}/>
                <EmployeePrivateRoutes exact path="/update-tasks-length" component={UpdateTasksLength}/>
                <BossPrivateRoutes exact path='/boss-page' component={BossPage} />
                <BossPrivateRoutes exact path='/change-staff-info/:id' component={ChangeStaffInfo} />
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
                <BossPrivateRoutes exact path='/tasks' component={Task} />
                <BossPrivateRoutes exact path='/employee-with-tasks/:id' component={EmployeeWithTasks} />
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
