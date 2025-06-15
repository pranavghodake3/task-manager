const TaskService = require("../services/TaskService")
const { successResponse, errorResponse } = require("../utils/responseHelper");

const index = async (req, res) => {
    try {
        const tasks = await TaskService.getTasks();
        return successResponse(res, tasks);
    } catch (error) {
        return errorResponse(res, error);
    }
};

const create = async (req, res) => {
    try {
        return res.render("tasks/add");
    } catch (error) {
        return errorResponse(res, error);
    }
};

const store = async (req, res) => {
    try {
        console.log("req.body: ",req.body)
        const { name } = req.body;
        if (name) {
            req.session.success = "Item added successfully!";
        }
        // const response = await TaskService.create(req.body);
        return res.redirect("/tasks");
    } catch (error) {
        return errorResponse(res, error);
    }
};

const show = async (req, res) => {
    try {
        const id = req.params.id;
        const book = {
            id: 2,
            name: 'testnew'
        }
        // const book = await TaskService.getTask(id);
        return res.render("tasks/view", {
            book,
        });
    } catch (error) {
        return errorResponse(res, error);
    }
};

const edit = async (req, res) => {
    try {
        const successMessage = req.session.success;
        delete req.session.success;
        const id = req.params.id;
        const book = {
            id: 2,
            name: 'testnew'
        }
        // const book = await TaskService.getTask(id);
        return res.render("tasks/edit", {
            book,
            successMessage,
        });
    } catch (error) {
        return errorResponse(res, error);
    }
};

const update = async (req, res) => {
    try {
        console.log("req.body: ",req.body)
        const id = req.params.id;
        // const response = await TaskService.updateTask(id, req.body);
        req.session.success = "Item updated successfully!";
        return res.redirect("/tasks");
    } catch (error) {
        return errorResponse(res, error);
    }
};

const destroy = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await TaskService.deleteTask(id);
        req.session.success = "Item added successfully!";
        return res.redirect("/tasks");
    } catch (error) {
        return errorResponse(res, error);
    }
};

module.exports = {
    index,
    create,
    store,
    show,
    edit,
    update,
    destroy,
};
