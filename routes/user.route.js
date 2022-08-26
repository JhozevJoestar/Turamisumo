const { Router } = require('express');
const router = Router();
const { userController } = require("../controllers/user.controller")

router.post('/user/:roomType', userController.addUser);
// router.patch('/user/:id', userController.patchUser);
// router.get("/profile/:id", userController.getProfile);
// router.get('/user', userController.getUsers);
// router.post('/login', userController.login);
// router.delete('/user/:id', userController.deleteUser);


module.exports = router;
