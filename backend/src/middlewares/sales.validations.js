const salesValidation = (req, res, next) => {
    const { body } = req;

    const missionField = body.reduce((_acc, curr) => {
        let camp;
        if (typeof curr.productId === 'undefined') {
            camp = 'productId';
        }
        if (typeof curr.quantity === 'undefined') {
            camp = 'quantity';
        }
        return camp;
    }, undefined);

    if (missionField) {
        return res.status(400).json({
            message: `"${missionField}" is required`,
        });
    }

    return next();
};

module.exports = { salesValidation }; // tinha quebrado o código sem as chaves mesmo sendo apenas 1 exportação :)
