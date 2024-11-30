import {jwtDecode} from 'jwt-decode'
const verifyToken =async (token) => {
    try {
      const tokenprovided= token
      if(!tokenprovided){
        res.json("errrorrr")
      }
      const decoded= jwtDecode(token)
    
    
     return decoded;
    } catch (error) {
      console.log(error.message)
    }
    };

    export default verifyToken