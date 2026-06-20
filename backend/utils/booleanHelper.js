const makeBoolean = (value) => {
    if(value && typeof value === 'string' && value === 'true'){
        return true;
    }
    return false;
};

module.exports = makeBoolean;
