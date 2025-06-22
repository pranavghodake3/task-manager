const TaskService = require("../services/taskService")
const { successResponse, errorResponse } = require("../utils/responseHelper");
const redis = require("../config/redis");

const getAllTasks = async (req, res) => {
    try {
        const cachedTasks = await redis.get("TASKS");
        let tasks;
        if(cachedTasks && cachedTasks.length > 0){
            tasks = cachedTasks;
        }else{
            tasks = await TaskService.getAllTasks();
            if(tasks.length > 0)    await redis.set("TASKS", tasks);
        }

        return successResponse(res, tasks);
    } catch (error) {
        return errorResponse(res, error);
    }
};

const getSingleTask = async (req, res) => {
    try {
        const tasks = await TaskService.getSingleTask(req.params.id);
        return successResponse(res, tasks);
    } catch (error) {
        return errorResponse(res, error);
    }
};

const createTask = async (req, res) => {
    try {
        const response = await TaskService.createTask(req.body);
        await redis.set("TASKS", null);
        return successResponse(res, response);
    } catch (error) {
        return errorResponse(res, error);
    }
};

const updateSingleTask = async (req, res) => {
    try {
        const response = await TaskService.updateSingleTask(req.params.id, req.body);
        return successResponse(res, response);
    } catch (error) {
        return errorResponse(res, error);
    }
};

const deleteSingleTask = async (req, res) => {
    try {
        const tasks = await TaskService.deleteSingleTask(req.params.id);
        return successResponse(res, tasks);
    } catch (error) {
        return errorResponse(res, error);
    }
};

module.exports = {
    getAllTasks,
    getSingleTask,
    createTask,
    updateSingleTask,
    deleteSingleTask,
};
