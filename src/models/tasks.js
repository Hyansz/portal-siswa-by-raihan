import mongoose from "mongoose";

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
        default: "",
    },
    teacher_id: {
        type: String,
        required: true,
    },
    status: {
        // 0: tidak aktif, sedangkan 1: aktif
        type: Number,
        default: 1,
    },
});

let TaskModel;

// Pastikan bahwa model 'Task' belum ada sebelum membuatnya
try {
    TaskModel = mongoose.model("Task");
} catch (error) {
    TaskModel = mongoose.model("Task", taskSchema);
}

export default TaskModel;
