import { TmrToCalculate, CalculatedTmr, Handler } from '../types';
import { TmrService } from '../services/tmrCalculationService';

const tmrService = new TmrService();

export const calculateTmr: Handler = async (req, res) => {
    const data: TmrToCalculate = { weight: +req.query.weight, height: +req.query.height, age: +req.query.age, sex: <string>req.query.sex, activity: <string>req.query.activity, inImperial: <string>req.query.inImperial};
    const calculated: CalculatedTmr = await tmrService.calculateTmr(data);
    res.status(200).json(calculated);
}