const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    deadline: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    note: {
        type: String,
    },
    teacher_id: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        default: 1,
    },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
