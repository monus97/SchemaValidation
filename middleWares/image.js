
const multer = require('multer')
const path = require('path')


const multerStorage = multer.diskStorage({
    destination: 'uploads',
    filename:  (req, file, callback)=> {
              var ext = file.originalname.substring(file.originalname.indexOf("."));
              callback(null, `image_${Date.now()}.${file.originalname}`);
          },

   });
   const upload = multer({
        storage: multerStorage,
        fileFilter:  (req, file, cb)=> {
            const filetypes = /jpeg|jpg|png|pdf/; 
            const mimetype = filetypes.test(file.mimetype);
            const extname = filetypes.test(path.extname(file.originalname));        
            if(mimetype && extname){
                return cb(null, true);
            }
          
            return cb("The uploaded file, isn't compatible :( we're sorry");
        },
        limits: {
                    fileSize: 1024 * 1024 * 1024 * 5,
                },
            
            })
           
        //   .fields([{ name: 'profilePic', maxCount: 1 }, { name: 'identity', 
        // maxCount: 1 }]) 

module.exports = {upload};
    
    // const storagepp = multer.diskStorage({
    //     destination: "uploads",
    //     filename:  (req, file, callback)=> {
    //                        var ext = file.originalname.substring(file.originalname.indexOf("."));
    //                      callback(null, `image_${Date.now()}.${file.originalname}`);}
    //   });
    // //   const upload = multer({
    // //     storage: storagepp
    // //   }).single("profilePic");
     
    //   const storagebanner = multer.diskStorage({
    //     destination: "identity",
    //     filename:  (req, file, callback)=> {
    //         var ext = file.originalname.substring(file.originalname.indexOf("."));
    //       callback(null, `${Date.now()}.${file.originalname}`);}
    //   });
    //   const identy = multer({
    //     storage: storagebanner,
    //     storage: storagepp
    //   }).fields([{name : 'profilePic'},{name : 'identity'}])


