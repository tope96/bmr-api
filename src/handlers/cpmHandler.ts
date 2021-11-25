import { CpmToCalculate, CalculatedCpm, errorResponse, Handler } from '../types';
import { CpmService } from '../services/cpmCalculationService';

const cpmService = new CpmService();

export const calculateCpm: Handler = async (req, res) => {
    const data: CpmToCalculate = { weight: +req.query.weight, height: +req.query.height, age: +req.query.age, sex: <string>req.query.sex, activity: <string>req.query.activity};
    const calculated: CalculatedCpm = await cpmService.calculateCpm(data);
    res.status(200).json(calculated);
}