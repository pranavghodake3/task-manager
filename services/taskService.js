const TaskModel = require("../models/TaskModel");

const getTasks = async() => {
    const data = [
        {
            id: 1,
            name: "test"
        }
    ]; // await TaskModel.find();

    return data;
};

const getTask = async(id) => {
    const data = await TaskModel.findById(id);

    return data;
};

const create = async(body) => {
    const TaskModelObj = new TaskModel(body);
    const data = TaskModelObj.save();

    return data;
};

const updateTask = async(id, body) => {
    const data = await TaskModel.findByIdAndUpdate(id, body);

    return data;
};

const deleteTask = async(id) => {
    const data = await TaskModel.findByIdAndDelete(id);

    return data;
};

module.exports = {
    getTasks,
    getTask,
    create,
    updateTask,
    deleteTask,
};
