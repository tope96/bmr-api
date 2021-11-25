import { RequestHandler as Middleware } from 'express';
import { errorResponse } from './src/types';
import { Validatable, validate } from './src/services/validators';
import { activityValues } from './src/services/values/activityValues';
import { sexValues } from './src/services/values/sexValues';

export const validateParamsBmr: Middleware = (req, res, next) => {

    if(!("height" in req.query) || !("weight" in req.query) || !("age" in req.query) || !("sex" in req.query)) {
        const errorMessage: errorResponse = {
            path: req.originalUrl,
            message: "Bad request"
        }

        res.status(400).send(errorMessage);
        return;
    }

    const heightValidate: Validatable = {
        valueName: "height",
        value: +req.query.height,
        require: true,
        min: 0,
        max: 250
    }

    const weightValidate: Validatable = {
        valueName: "weight",
        value: +req.query.weight,
        require: true,
        min: 0,
        max: 400
    }

    const ageValidate: Validatable = {
        valueName: "age",
        value: +req.query.age,
        require: true,
        min: 0,
        max: 130
    }

    const sexValidate: Validatable = {
        valueName: "sex",
        value: <string>req.query.sex,
        require: true,
        allowedValues: Object.keys(sexValues)
    }

    if(!validate(heightValidate)[0] || !validate(weightValidate)[0] || !validate(ageValidate)[0] || !validate(sexValidate)[0]) {
        const message = validate(heightValidate)[1] + validate(weightValidate)[1] + validate(ageValidate)[1] + validate(sexValidate)[1]
        const errorMessage: errorResponse = {
            path: req.originalUrl,
            message: message
        }

        res.status(400).send(errorMessage);
        return;
    }

    next();
}

export const validateParamsCpm: Middleware = (req, res, next) => {
    if(!("height" in req.query) || !("weight" in req.query) || !("age" in req.query) || !("sex" in req.query) || !("activity" in req.query)) {
        const errorMessage: errorResponse = {
            path: req.originalUrl,
            message: "Bad request"
        }

        res.status(400).send(errorMessage);
        return;
    }

    const heightValidate: Validatable = {
        valueName: "height",
        value: +req.query.height,
        require: true,
        min: 0,
        max: 250
    }

    const weightValidate: Validatable = {
        valueName: "weight",
        value: +req.query.weight,
        require: true,
        min: 0,
        max: 400
    }

    const ageValidate: Validatable = {
        valueName: "age",
        value: +req.query.age,
        require: true,
        min: 0,
        max: 130
    }

    const sexValidate: Validatable = {
        valueName: "sex",
        value: <string>req.query.sex,
        require: true,
        allowedValues: Object.keys(sexValues)
    }

    const activityValidate: Validatable = {
        valueName: "activity",
        value: <string>req.query.activity,
        require: true,
        allowedValues: Object.keys(activityValues)
    }

    if(!validate(heightValidate)[0] || !validate(weightValidate)[0] || !validate(ageValidate)[0] || !validate(sexValidate)[0] || !validate(activityValidate)[0]) {
        const message = validate(heightValidate)[1] + validate(weightValidate)[1] + validate(ageValidate)[1] + validate(sexValidate)[1] + validate(activityValidate)[1];
        const errorMessage: errorResponse = {
            path: req.originalUrl,
            message: message
        }

        res.status(400).send(errorMessage);
        return;
    }

    next();
}

export const validateNoParams: Middleware = (req, res, next) => {
    if(Object.keys(req.query).length !== 0) {
        const errorMessage: errorResponse = {
            path: req.originalUrl,
            message: "Bad request. No params should be provided"
        }
        res.status(400).send(errorMessage);
        return;
    }
    next();
}
