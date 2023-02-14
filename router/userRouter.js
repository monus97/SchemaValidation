const express = require('express');
const router = express.Router();
const user = require('../controller/userController')
const auth = require('../middleWares/authetication')
const {upload} = require('../middleWares/image')



 router.post('/api/v1/register',upload.single('profilePic'),upload.single('identity'),user.userRegister);
// router.post('/api/v1/register',cpUpload,user.userRegister);

router.post('/api/v1/login',user.userLogin);

router.patch('/api/v1/update/:id',auth.verifyToken,user.userUpdateHisProfile);

router.delete('/api/v1/delete/:id',user.deleteUser)

router.get('/api/v1/details',user.UserDetail)

module.exports = router;