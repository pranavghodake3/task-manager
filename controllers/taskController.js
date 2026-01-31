
const testFirstFunction = async (req, res) => {
    return res.status(200).json([
        1, 2, 3
    ]);
};

module.exports = {
    testFirstFunction,
};
