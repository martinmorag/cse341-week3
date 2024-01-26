const validator = require('../helpers/validate');

const saveContact = async (req, res, next) => {
    const validationRule = {
        "firstName": "required|string",
        "lastName": "required|string",
        "medals": "required|integer",
        "favoritePokemon": "required|string",
        "pokedex": "required|integer"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    })
};
module.exports = {
    saveContact
};