const TaskService = require("../services/taskService")
const { successResponse, errorResponse } = require("../utils/responseHelper");

const getAllTasks = async (req, res) => {
    try {
        const tasks = await TaskService.getAllTasks();
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
