import express from "express";
import {
  allNotes,
  deleteNote,
  newNote,
  updateNote,
} from "../controllers/note.js";
import { isAuth } from "../middlewares/auth.js";

// router is a mini version of app
const router = express.Router();

// Routes
router.post("/new", isAuth, newNote);

router.get("/all", isAuth, allNotes);

router.route("/:id").put(isAuth, updateNote).delete(isAuth, deleteNote); // update and delete by id

export default router;
