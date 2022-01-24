const Joi = require("joi");

const ImagesDeleteSchema = Joi.object({
    imageURL: Joi.string().uri().required()
});

module.exports = {
    ImagesDeleteSchema
};