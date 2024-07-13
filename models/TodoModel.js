import mongoose from "mongoose";
import { Schema } from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timeStamp: true
})

const TodoModel = mongoose.models.todo || mongoose.model('todo', taskSchema);
export default TodoModel;