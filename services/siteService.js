const siteModel = require("../models/siteModel");

const getSites = async() => {
    const data = await siteModel.find();

    return data;
};

const getSiteById = async(id) => {
    const data = await siteModel.findById(id);

    return data;
};

const createSite = async(body) => {
    const siteModelObj = new siteModel(body);
    const data = siteModelObj.save();

    return data;
};

const updateSiteById = async(id, body) => {
    const data = await siteModel.findByIdAndUpdate(id, body);

    return data;
};

const deleteSiteById = async(id) => {
    const data = await siteModel.findByIdAndDelete(id);

    return data;
};

module.exports = {
    getSites,
    getSiteById,
    createSite,
    updateSiteById,
    deleteSiteById,
};
