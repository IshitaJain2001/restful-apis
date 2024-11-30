import {Link,  Route,Routes} from 'react-router-dom'
import Registration from './registration.jsx';
import Login from './login.jsx';
import LoggedIn from './LoggedIn.jsx';
import Editprofile from './Editprofile.jsx';

function App() {
  return (
    <div className="App">
   <Link to="/registration">
        <button>Register</button>
      </Link>

      <Link to="/login">
      <button>login</button>
      </Link>


      <Routes>
  
  <Route  path="/registration" element={<Registration/>} />
  <Route path='/login'    element={<Login/>}/>
  <Route path="/LoggedIn" element={<LoggedIn/>}/>
  <Route path='/edit-profile' element={<Editprofile/>}/>
</Routes>

    </div>
  );
}

export default App;
