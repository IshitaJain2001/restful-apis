import {Link, NavLink, Route,Routes} from 'react-router-dom'
import Registration from './registration.jsx';
import Login from './login.jsx';

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
</Routes>

    </div>
  );
}

export default App;
