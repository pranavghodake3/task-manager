const { successResponse, errorResponse }= require('../utils/responseHelper');
const tasks = [];

const taskController = {};

taskController.getTasks = async (req, res) => {
    try {
        return successResponse(res, tasks);   
    } catch (error) {
        return errorResponse(res, error, error.message, error.statusCode);
    }
};

taskController.getTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        return successResponse(res, tasks[id]);   
    } catch (error) {
        return errorResponse(res, error, error.message, error.statusCode);
    }
};

taskController.createTask = async (req, res) => {
    try {
        const task = req.body;
        tasks.push(task);
        return successResponse(res, task);   
    } catch (error) {
        return errorResponse(res, error, error.message, error.statusCode);
    }
};

taskController.updateTask = async (req, res) => {
    try {
        const task = req.body;
        return successResponse(res, task);   
    } catch (error) {
        return errorResponse(res, error, error.message, error.statusCode);
    }
};

taskController.deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        return successResponse(res, tasks[id]);   
    } catch (error) {
        return errorResponse(res, error, error.message, error.statusCode);
    }
};

module.exports = taskController;
