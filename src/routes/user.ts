import { Router } from "express";

import { getUsers, saveUser, getUserById, updateUserById, deleteUserById } from "../controllers/userController";

const router = Router();

router.get('/', getUsers);
router.post('/', saveUser);
router.get('/:userId', getUserById);
router.put('/:userId', updateUserById);
router.delete('/:userId', deleteUserById);

export default router;