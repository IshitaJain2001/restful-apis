import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: 'dxqn9ka7p', 
    api_key: '896631232563822', 
    api_secret: 'bBPbgEWF5hfcApBA38LkZUvKHiE' 
})

const upload = async (filePath)=>{
    try{
        console.log("cloudinary chl gya")
        if(!filePath) return null
        const res= await cloudinary.uploader.upload(filePath,{
            resource_type:"auto"
        })

     
        return res
    }
    catch(err){
        fs.unlinkSync(filePath)
        return null
    }
}

export {upload}