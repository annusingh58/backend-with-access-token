import express from "express";
import { regeneratekey, register } from "../Controllers/UserControllers.js";



const router = express.Router();

router.post('/register',register);
router.post('/regeneratekey',regeneratekey)


export default router;



