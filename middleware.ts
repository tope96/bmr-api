import { RequestHandler as Middleware } from 'express';
import { errorResponse } from './src/types';
import { Validatable, validate } from './src/services/validators';
import { activityValues } from './src/services/values/activityValues';
import { sexValues } from './src/services/values/sexValues';

export const validateParamsBmr: Middleware = (req, res, next) => {

    const allowedParams = ["height", "weight", "age", "sex"];
    const validity = validateParams(allowedParams, req.query, req.originalUrl);

    if(validity !== true){
        res.status(validity.errorCode);
        res.send(validity);
        return;
    }

    const heightValidate: Validatable = {
        valueName: allowedParams[0],
        value: +req.query.height,
        require: true,
        min: 0,
        max: 250
    }

    const weightValidate: Validatable = {
        valueName: allowedParams[1],
        value: +req.query.weight,
        require: true,
        min: 0,
        max: 400
    }

    const ageValidate: Validatable = {
        valueName: allowedParams[2],
        value: +req.query.age,
        require: true,
        min: 0,
        max: 130
    }

    const sexValidate: Validatable = {
        valueName: allowedParams[3],
        value: <string>req.query.sex,
        require: true,
        allowedValues: Object.keys(sexValues)
    }

    if(!validate(heightValidate)[0] || !validate(weightValidate)[0] || !validate(ageValidate)[0] || !validate(sexValidate)[0]) {
        const message = validate(heightValidate)[1] + validate(weightValidate)[1] + validate(ageValidate)[1] + validate(sexValidate)[1]
        const errorMessage: errorResponse = {
            errorCode: 400,
            path: req.originalUrl,
            message: message
        }

        res.status(400).send(errorMessage);
        return;
    }

    next();
}

export const validateParamsCpm: Middleware = (req, res, next) => {
    const allowedParams = ["height", "weight", "age", "sex", "activity"];
    const validity = validateParams(allowedParams, req.query, req.originalUrl);

    if(validity !== true){
        res.status(validity.errorCode);
        res.send(validity);
        return;
    }

    const heightValidate: Validatable = {
        valueName: allowedParams[0],
        value: +req.query.height,
        require: true,
        min: 0,
        max: 250
    }

    const weightValidate: Validatable = {
        valueName: allowedParams[1],
        value: +req.query.weight,
        require: true,
        min: 0,
        max: 400
    }

    const ageValidate: Validatable = {
        valueName: allowedParams[2],
        value: +req.query.age,
        require: true,
        min: 0,
        max: 130
    }

    const sexValidate: Validatable = {
        valueName: allowedParams[3],
        value: <string>req.query.sex,
        require: true,
        allowedValues: Object.keys(sexValues)
    }

    const activityValidate: Validatable = {
        valueName: allowedParams[4],
        value: <string>req.query.activity,
        require: true,
        allowedValues: Object.keys(activityValues)
    }

    if(!validate(heightValidate)[0] || !validate(weightValidate)[0] || !validate(ageValidate)[0] || !validate(sexValidate)[0] || !validate(activityValidate)[0]) {
        const message = validate(heightValidate)[1] + validate(weightValidate)[1] + validate(ageValidate)[1] + validate(sexValidate)[1] + validate(activityValidate)[1];
        const errorMessage: errorResponse = {
            errorCode: 400,
            path: req.originalUrl,
            message: message
        }

        res.status(400).send(errorMessage);
        return;
    }

    next();
}

export const validateNoParams: Middleware = (req, res, next) => {
    const allowedParams = [];
    const validity = validateParams(allowedParams, req.query, req.originalUrl, "Bad request. No params should be provided.");

    if(validity !== true){
        res.status(validity.errorCode);
        res.send(validity);
        return;
    }
    next();
}

function validateParams(allowedParams: string[], paramsInRequest: Object, originalUrl: string, customErrorMessage?: string): true|errorResponse{
    const errorMessage: errorResponse = {
        errorCode: 400,
        path: originalUrl,
        message: customErrorMessage ? customErrorMessage : "Bad request"
    }

    if(Object.keys(paramsInRequest).length != allowedParams.length){
        return errorMessage;
    }

    for(const param in allowedParams){
        if(!(allowedParams[param] in paramsInRequest)) {
            return errorMessage;
        }
    }

    return true;
}
