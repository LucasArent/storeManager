const productValidation = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({
            message: '"name" is required',
        });
    }
    return next();
};

module.exports = { productValidation }; // tinha quebrado o código sem as chaves mesmo sendo apenas 1 exportação :)
