const makeBoolean = (value) => {
    if(value && typeof value === 'string' && (value === 'true' || value === '1')){
        return true;
    }
    return false;
};

module.exports = makeBoolean;
