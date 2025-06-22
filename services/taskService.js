const TaskModel = require("../models/taskModel");

const getAllTasks = async() => {
    const tasks = await TaskModel.find();

    return tasks;
};

const getSingleTask = async(id) => {
    const data = await TaskModel.findById(id);

    return data;
};

const createTask = async(body) => {
    const TaskModelObj = new TaskModel(body);
    const data = TaskModelObj.save();

    return data;
};

const updateSingleTask = async(id, body) => {
    const data = await TaskModel.findByIdAndUpdate(id, body);

    return data;
};

const deleteSingleTask = async(id) => {
    const data = await TaskModel.findByIdAndDelete(id);

    return data;
};

module.exports = {
    getAllTasks,
    getSingleTask,
    createTask,
    updateSingleTask,
    deleteSingleTask,
};
