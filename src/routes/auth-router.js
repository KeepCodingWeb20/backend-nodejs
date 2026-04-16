import express from 'express';
import { loginPageController } from '../controllers/auth-controller.js';

export const authRouter = new express.Router();

authRouter.get('/login', loginPageController);