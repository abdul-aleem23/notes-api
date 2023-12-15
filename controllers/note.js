import ErrorHandler from "../middlewares/error.js";
import { Note } from "../models/note.js";

export const newNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    await Note.create({
      title,
      content,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Note saved",
    });
  } catch (error) {
    next(error);
  }
};

export const allNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    // Find the note by ID
    const note = await Note.findById(id);

    // If the note is not found, send a 404 response
    if (!note) return next(new ErrorHandler("Note not found", 404));

    // Update the title and content of the note
    note.title = title;
    note.content = content;

    // Save the updated note to the database
    await note.save();

    // Send a success response with the updated note
    res.status(200).json({
      success: true,
      message: "Note updated",
      note,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return next(new ErrorHandler("Note not found", 404));

    await note.deleteOne();

    res.status(200).json({
      success: true,
      message: "Note deleted",
    });
  } catch (error) {
    next(error);
  }
};
