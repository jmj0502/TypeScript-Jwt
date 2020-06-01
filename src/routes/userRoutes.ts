// importing express.
import {Router } from "express";
import { UserController } from '../controller/UserController';
import { AuthController } from '../controller/AuthController';
const router = Router({mergeParams: true});

// building our routes up.
router.get('/api/users', AuthController.authValidator, UserController.getUsers)
      .post('/api/sign-up', UserController.createUser)
      .post('/api/sign-in', UserController.login)
      .get('/api/users/:id', AuthController.authValidator, UserController.getUser)
      .put('/api/change-password', AuthController.authValidator, UserController.modifyPassword)
      .delete('/api/users/:id', UserController.deleteUser);

// exporting router.
export default router;