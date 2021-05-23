const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    descripcion: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 255, // To avoid a maliciously long string
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
