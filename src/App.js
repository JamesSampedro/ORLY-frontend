import './style.min.css';
import {BrowserRouter as Router, Switch, Route, useRouteMatch, useHistory} from 'react-router-dom'
import {useState,useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { getUser, getUserProfile, removeUserResponse } from './actions/users';
import ProtectedRoute from './components/routes/ProtectedRoute';
import ProtectedUserRoute from './components/routes/ProtectedUserRoute';
import ProtectedAdminRoute from './components/routes/ProtectedAdminRoute'
import ProtectedUnauthorizedRoute from './components/routes/ProtectedUnauthorizedRoute'
import ProtectedNonAdminRoute from './components/routes/ProtectedNonAdminRoute'
import ScrollToTop from './components/wrappers/ScrollToTop';
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Footer from './components/footer/Footer'
import Register from './pages/register/AccountRegistration'
import Login from './components/login/Login'
import Ayuda from './pages/ayuda/Ayuda'
import AyudaProgram from './pages/ayuda-program/AyudaProgram'
import Assistance  from './pages/assistance/Assistance'
import Services from './pages/assistance/Services'
import About from './pages/about/About'
import CertificatesApplication from './pages/certificates-application/CertificatesApplication'
import ApplicationStatus from './pages/application-status/ApplicationStatus'
import AyudaUser from './pages/ayuda-user/Ayuda'
import VaccinationData from './pages/vaccination-data/Vaccination'
import ContactUs from './pages/contact-us/ContactUs'
import NotFound from './pages/errorPages/NotFound'
import BusinessClearance from './pages/certificates-application/BusinessClearance'
import Indigency from './pages/certificates-application/Indigency'
import BarangayEquipment from './pages/certificates-application/BarangayEquipment'
import Residency from './pages/certificates-application/Residency'
import BarangayClearance from './pages/certificates-application/BarangayClearance'
import IdApplication from './pages/certificates-application/IdApplication'
import Cedula from './pages/certificates-application/Cedula'
import RegistrationRequestSent from './pages/register/RegistrationRequestSent';
import ResetPasswordSent from './components/login/ResetPasswordSent'
import AyudaAdminDashboard from './pages/ayuda/AyudaAdminDashboard';
import EquipmentInventoryAdmin from './pages/equipment-inventory/EquipmentInventoryAdmin';
import AddEquipment from './pages/equipment-inventory/AddEquipment';
import UpdateVaccinationData from './pages/vaccination-data/UpdateVaccinationData';
import SupplyInventoryAdmin from './pages/supply-inventory/SupplyInventoryAdmin';
import RegisteredProfileAdmin from './pages/registered-profile/RegisteredProfileAdmin';
import AddSupply from './pages/supply-inventory/AddSupply';
import AyudaRecipientTable from './pages/ayuda-recipient/AyudaRecipientTable';
import BlotterGuidelines from './pages/blotter/BlotterGuidelines';
import EquipmentTableUser from './pages/barangay-equipment/EquipmentTableUser';
import CreateAyudaProgram from './pages/ayuda/CreateAyudaProgram';
import ProgramDetails from './pages/ayuda/ProgramDetails';
import ApplicationRequests from './pages/application-requests/ApplicationRequests';
import UploadPayment from './pages/upload-payment/UploadPayment';
import UserProfile from './pages/user-profile/UserProfile';
import Reports from './pages/reports/Reports'
import ApplicationSales from './pages/application-sales/ApplicationSales';
import 'react-toastify/dist/ReactToastify.css'
import AyudaRecipientTest from './pages/ayuda-recipient/AyudaRecipientTest';
import ResidentsTable from './pages/residents/ResidentsTable';
import Residents from './pages/residents/Residents';
import GuestTable from './pages/guest-ayuda/GuestTable';
import HouseholdMembers from './pages/ayuda-beneficiary/HouseholdMembers';
import UserHouseholdMembers from './pages/ayuda-user/UserHouseholdMembers';
import AdminHouseholdMembers from './pages/ayuda/AdminHouseholdMembers';
import Verification from './pages/verification/Verification';
import Household from './pages/guest-ayuda/Household';
import HouseholdMember from './pages/guest-ayuda/HouseholdMember';
import UserMembers from './pages/ayuda-user/UserMembers';
import UserHousehold from './pages/ayuda-user/UserHousehold';
import AyudaAdminTable from './pages/ayuda/AyudaAdminTable';
import AyudaAdminHousehold from './pages/ayuda/AyudaAdminHousehold';
import AyudaAdminMembers from './pages/ayuda/AyudaAdminMembers';
import HouseholdTable from './pages/ayuda/HouseholdTable';

function App() {
  const response = useSelector((state) => state.auth)
  const history = useHistory();
  const loginResponse = useSelector((state) => state.users)
  const {user} = response
  const {success,userInfo} = loginResponse
  const dispatch = useDispatch()
  const [loginIsOpen,setLoginIsOpen] = useState(false)
  const [auth, setAuth] = useState({isAuth:false,role:""})


  useEffect(() => {
    // let token = localStorage.getItem('authToken')
    // dispatch(getUserProfile(token))
    const users = {
      user : {
        _id: localStorage.getItem('_id'),
        username: localStorage.getItem('username'),
        email: localStorage.getItem('email'),
        role: localStorage.getItem('role'),
        firstName: localStorage.getItem('firstName')
      }
    }
    if(users?.user.username){
      dispatch(getUser(users)) 
    }
  },[])

  // useEffect(() => {
  //   if(success){
  //     const users = {
  //       user : {
  //         _id: localStorage.getItem('_id'),
  //         username: localStorage.getItem('username'),
  //         email: localStorage.getItem('email'),
  //         role: localStorage.getItem('role'),
  //         firstName: localStorage.getItem('firstName')
  //       }
  //     }
  //     if(users?.user.username){
  //       dispatch(getUser(users)) 
  //     }
  //   }

  //   dispatch(removeUserResponse())
  // },[success])

  useEffect(() => {
    if(user?.username){
      setAuth({isAuth: true, role: user?.role})
    }
  },[user])

  return (
    <div className="container">
      <Router>
          <Navbar setLoginIsOpen={setLoginIsOpen}/>
          <div className="navbar-buffer"></div>
          <ScrollToTop>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/ayuda-program' exact component={GuestTable}/>
            <Route path='/about' exact component={About}/>
            <Route path='/services/vaccination-data' exact component={VaccinationData}/>
            <Route path='/services/blotter' exact component={BlotterGuidelines}/>
            <Route path='/reports' exact component={Reports} />
            <Route exact path='/sample' component={AdminHouseholdMembers}/>
            <Route exact path='/view-guest-household' component = {Household}/>
            <Route exact path='/view-guest-householdmembers' component = {HouseholdMember}/>
            
            <ProtectedUnauthorizedRoute path='/registration-request-sent' exact component={RegistrationRequestSent} auth={auth}/>
            <ProtectedUnauthorizedRoute path='/register' exact component={Register} auth={auth}/>
            <ProtectedUnauthorizedRoute path='/password-reset-sent' exact component={ResetPasswordSent} auth={auth}/>

            <ProtectedNonAdminRoute path='/contact-us' exact component={ContactUs} auth={auth}/>
            <ProtectedNonAdminRoute path='/services' exact component={Assistance} auth={auth}/>
        
            <ProtectedUserRoute path='/services/ayuda-user' exact component={AyudaUser} auth={auth}/>
            <ProtectedUserRoute path='/services/application-and-reservation/certificates-application' exact component={CertificatesApplication} auth={auth}/>
            <ProtectedUserRoute path='/services/application-and-reservation/id-application' exact component={IdApplication} auth={auth}/>
            <ProtectedUserRoute path='/application-status' exact component={ApplicationStatus} auth={auth}/>
            <ProtectedUserRoute path='/id-application' exact component={IdApplication} auth={auth}/>
            <ProtectedUserRoute path='/services/application-and-reservation/certificates-application/business-clearance' exact component={BusinessClearance} auth={auth}/>
            <ProtectedUserRoute path='/services/application-and-reservation/certificates-application/indigency' exact component={Indigency} auth={auth}/>
            <ProtectedUserRoute path='/services/application-and-reservation/certificates-application/residency' exact component={Residency} auth={auth}/>
            <ProtectedUserRoute path='/services/application-and-reservation/certificates-application/barangay-clearance' exact component={BarangayClearance} auth={auth}/>
            <ProtectedUserRoute path='/services/application-and-reservation/certificates-application/cedula' exact component={Cedula} auth={auth}/>
            <ProtectedNonAdminRoute path='/services/application-and-reservation/barangay-equipment' exact component={EquipmentTableUser} auth={auth}/>
            <ProtectedUserRoute path='/upload-payment/:name/:id' exact component={UploadPayment} auth={auth}/>
            <ProtectedUserRoute path='/user-profile' exact component={UserProfile} auth={auth} />
            <ProtectedUserRoute path='/view-user-household' exact component={UserHousehold} auth={auth} />
            <ProtectedUserRoute path='/view-user-householdmembers' exact component={UserMembers} auth={auth} />

            <ProtectedAdminRoute path='/services-admin' exact component={AyudaAdminDashboard} auth={auth}/>
            <ProtectedAdminRoute path='/equipment-inventory-admin' exact component={EquipmentInventoryAdmin} auth={auth} />
            <ProtectedAdminRoute path="/add-equipment" exact component={AddEquipment} auth={auth} />
            <ProtectedAdminRoute path="/update-vaccination-data" exact component={UpdateVaccinationData} auth={auth} />
            <ProtectedAdminRoute path='/supply-inventory-admin' exact component={SupplyInventoryAdmin} auth={auth} />
            <ProtectedAdminRoute path='/registered-profile-admin' exact component={RegisteredProfileAdmin} auth={auth} />
            <ProtectedAdminRoute path='/add-supply' exact component={AddSupply} auth={auth} />
            <ProtectedAdminRoute path='/ayuda-recipient' exact component={AyudaRecipientTable} auth={auth} />
            <ProtectedAdminRoute path='/create-ayuda-program' exact component={CreateAyudaProgram} auth={auth}/>
            <ProtectedAdminRoute path='/program-details' exact component={AyudaAdminTable} auth={auth} />
            <ProtectedAdminRoute path='/application-requests' exact component={ApplicationRequests} auth={auth}/>
            <ProtectedAdminRoute path='/application-sales' exact component={ApplicationSales} auth={auth}/>
            <ProtectedAdminRoute path='/residents' exact component={ResidentsTable} auth={auth}/>
            <ProtectedAdminRoute path='/residents-form' exact component={Residents} auth={auth} />
            <ProtectedAdminRoute path='/view-admin-householdmembers' exact component={AyudaAdminMembers} auth={auth} />
            <ProtectedAdminRoute path='/view-admin-household' exact component={HouseholdTable} auth={auth} />

            <ProtectedAdminRoute path='/user-verification' exact component={Verification} auth={auth}/>

            <Route component={NotFound}/>
          </Switch>
          </ScrollToTop>
          <div className="footer-buffer"></div>
        <Footer/>
        <Login loginIsOpen={loginIsOpen}
        loginOnClose={() => setLoginIsOpen(false)}/>
      </Router>      
    </div>
  );
}

export default App;
