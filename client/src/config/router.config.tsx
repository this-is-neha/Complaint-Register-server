import {Routes,Route} from "react-router-dom"
import LandingPage from "../pages/landing/landing.page";
import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";
import Contact from "../pages/auth/contact"
 import SearchBox from "../pages/auth/Map";
import Poll from "../pages/auth/reviews";
import Aboutus from "../pages/auth/about";
import Bento from "../pages/auth/Bento"
import CategoriesPage from "../pages/auth/categories";
import Activate from "../pages/auth/practice";
import ExampleComponent from "../pages/auth/UserPage"
import AdminComponent from "../pages/auth/AdminPage"
import Complaints from "../../src/Complaints"
import MessagePage from "../Message store"
import OtherPage from "../../src/pages/auth/Another"
import Complaintss from "../pages/Notifications";
import Individual from "../pages/auth/Individual complaint";
import ChangePassword from "../pages/auth/Reset";
import Reactivate from "../pages/auth/Reactivate";
const RoutingConfig=()=>{
    return (<>

<Routes>

<Route index  element={<LandingPage />}></Route>
<Route path ="*" element ={<>Error page</>}></Route>
<Route path ="login" element={<LoginPage/>}></Route>
<Route path ="register" element={<RegisterPage/>}></Route>
<Route path ="healthcare" element={<SearchBox/>}></Route>
<Route path ="road" element={<SearchBox/>}></Route>
<Route path ="transportation" element={<SearchBox/>}></Route>
<Route path ="drinking-water" element={<SearchBox/>}></Route>
<Route path ="education" element={<SearchBox/>}></Route>
<Route path ="crimes" element={<SearchBox/>}></Route>
<Route path ="activate" element={<Activate/>}></Route>
<Route path ="domestic" element={<SearchBox/>}></Route>
<Route path ="categories" element={<CategoriesPage/>}></Route>
<Route path ="review" element={<Poll/>}></Route>
<Route path ="about" element={<Aboutus/>}></Route>
<Route path ="contact" element={<Contact/>}></Route>
<Route path ="practice" element={<Activate/>}></Route>
<Route path ="user/:userId" element={<ExampleComponent/>}></Route>
<Route path ="admin/:userId" element={<AdminComponent/>}></Route>
<Route path ="admin/complaints" element={<Complaints/>}></Route>
<Route path ="admin/messages" element={<MessagePage/>}></Route>
<Route path ="/rating" element={<Bento/>}></Route>
<Route path ="/rate" element={<OtherPage/>}></Route>
<Route path ="/notification" element={<Complaintss/>}></Route>
<Route path ="/name/:userId" element={<Individual/>}></Route>
<Route path="/reset-password" element={<ChangePassword />}></Route>
<Route path="/reactivate" element={<Reactivate />}></Route>

</Routes>


    </>
    )}

 export default RoutingConfig