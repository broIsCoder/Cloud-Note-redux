const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");
const fetchLoginUser = require("../middleware/fetchLoginUser");

//Route 1 : fetching notes of logged in user   //////////////////////
router.get("/fetchnotes", fetchLoginUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    if (!notes) {
      return res.json({ message: "Invalid User Id" });
    }
    console.log(req.user);
    return res.json({ notes: notes, message: "All Notes are Fetched" });
  } catch (error) {
    console.log(`An ERROR occured on Server:\n${error.message}\n`);
    return res.status(500).json({ message: "Error occured on Server!" });
  }
});

//Route 2 : add note while logged in
router.post(
  "/addnote",
  fetchLoginUser,
  [
    body("title", "Title should be atleast of 3 characters").isLength({
      min: 3,
    }), // setting the validationo with vaildating library
    body(
      "description",
      "Description should be atleast of 5 characters"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    // if there are errors ,return bad request
    const errors = validationResult(req); // if validation is invalid,give error
    if (!errors.isEmpty()) {
      console.log(errors.errors[0].msg);
      return res.status(400).json({ message: errors.errors[0].msg});
    }

    try {
      const { title, description, tag } = req.body;
      const tagUserSet = tag === "" ? "General" : tag;

      const note = new Note({
        title,
        description,
        tag: tagUserSet,
        user: req.user.id,
      });
      const savedNote = await note.save();
      console.log(savedNote);
      return res.json({ note: savedNote, message: "New Note Added" });
    } catch (error) {
      console.log(`An ERROR occured on Server:\n${error.message}\n`);
      return res.status(500).json({ message: "Error occured on Server!" });
    }
  }
);

// ROUTE 3 : Update selected note
// /updatenote/:id ==== :id is req.params
router.put(
  "/updatenote/:id",
  fetchLoginUser,
  [
    body("title", "Title should be atleast of 3 characters").isLength({
      min: 3,
    }), // setting the validationo with vaildating library
    body(
      "description",
      "Description should be atleast of 5 characters"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    // if there are errors ,return bad request
    const errors = validationResult(req); // if validation is invalid,give error
    if (!errors.isEmpty()) {
      console.log(errors[0]);
      return res.status(400).json({ message: errors.errors[0].msg});
    }
    try {
      const { title, description, tag } = req.body;
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      //find the  note to be updated and update it
      let note = await Note.findById(req.params.id); // req.params.id = /updatenote/:id
      // if note don't exists
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }
      console.log(`note : ${note}`);

      // if user id didn't match
      if (note.user.toString() !== req.user.id) {
        console.log("\nUnauthorized\n");
        return res.status(401).json({ message: "Unauthorized note ID" });
      }
      // update note in mongoDb
      const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      ); // req.params.id = /updatenote/:id
      console.log(updatedNote);
      console.log(`note has been updated`);
      return res.json({ note: updatedNote, message: "Note has been Updated" });
    } catch (error) {
      console.log(`An ERROR occured on Server:\n${error.message}\n`);
      return res.status(500).json({ message: "Error occured on Server!" });
    }
  }
);

// ROUTE 4 : Delete selected note
// /deletenote/:id ==== :id is req.params
router.delete("/deletenote/:id", fetchLoginUser, async (req, res) => {
  try {
    //find the  note to be deleted
    let note = await Note.findById(req.params.id); // req.params.id = /deletenote/:id
    // if note don't exists
    if (!note) {
      return res.status(404).json({ message: "Note not founded" });
    }
    console.log(`note founded for deleting : ${note}`);
    // allow deletetion if user own the notes
    // if user.id === req.user.id
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized Note ID" });
    }
    // delete note in mongoDb
    const deleteNote = await Note.findByIdAndDelete(req.params.id); // req.params.id = /deletenote/:id
    if (!deleteNote) {
      return res.status(404).json({ message: "Note was not Deleted" });
    }
    console.log(`note has been deleted`);
    return res.status(200).json({ message: "Note has been Deleted" });
  } catch (error) {
    console.log(`An ERROR occured on Server:\n${error.message}\n`);
    return res.status(500).json({ message: "Error occured on Server!" });
  }
});
module.exports = router;
