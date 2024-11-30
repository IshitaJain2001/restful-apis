import multer from 'multer'



    const storage = multer.diskStorage({
  
        destination: function (req, file, cb) {
            
           console.log(req)
            cb(null,'c:/Users/jains/OneDrive/Desktop/leaning backend/temp');
            
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
            
        }

    
 
});






export const multerUpload= multer({
    storage
})

