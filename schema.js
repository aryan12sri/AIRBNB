const Joi = require('joi');

const schemalist=Joi.object({
        list:Joi.object({
            title:Joi.string().required(),
            description:Joi.string().required(),
            location:Joi.string().required(),
            country:Joi.string().required(),
            price:Joi.number().required().min(0),
            image:Joi.string().allow("",null)
        }).required()
     })

const Schemareview=Joi.object({
    review:Joi.object({
        rating:Joi.number().required(),
        comment:Joi.string().required(),
    }).required()
 })


 module.exports={schemalist,Schemareview}

