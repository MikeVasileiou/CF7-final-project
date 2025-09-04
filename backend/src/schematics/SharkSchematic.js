/**
 * this file defines a Shark schematic for the Shark route
 */
import Joi from 'joi';

const SharkSchematic = new Joi.object({
    name: Joi.string().required()
});

export default SharkSchematic;