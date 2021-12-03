import { BmrToCalculate, CalculatedBmr, Handler } from '../types';
import { BmrService } from '../services/bmrCalculationService';
import { activityValues } from '../services/values/activityValues';
import { sexValues } from '../services/values/sexValues';

const bmrService = new BmrService();

export const calculateBmr: Handler = async (req, res) => {
    const data: BmrToCalculate = { weight: +req.query.weight, height: +req.query.height, age: +req.query.age, sex: <string>req.query.sex, inImperial: <string>req.query.inImperial };
    const calculated: CalculatedBmr = await bmrService.calculateBmr(data);
    res.status(200).json(calculated);
}

export const getActivityValues: Handler = async (req, res) => {
    res.status(200).json(Object.keys(activityValues));
}

export const getSexes: Handler = async (req, res) => {
    res.status(200).json(Object.keys(sexValues));
}