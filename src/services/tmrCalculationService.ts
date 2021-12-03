import { BmrService } from "./bmrCalculationService";
import { CalculatedBmr, BmrToCalculate, TmrToCalculate, CalculatedTmr } from '../types';
import { activityValues } from './values/activityValues';

export class TmrService {

    async calculateTmr(data: TmrToCalculate): Promise<CalculatedTmr>{
        let activity = data.activity ? activityValues[data.activity] : 1;
        const bmrData: BmrToCalculate = {
            weight: data.weight,
            height: data.height,
            age: data.age,
            sex: data.sex,
            inImperial: data.inImperial
        }

        const bmrService = new BmrService();
        const bmr: CalculatedBmr = await bmrService.calculateBmr(bmrData);
        const tmrValue = +(bmr.bmr * activity).toFixed(2);
        const calculated: CalculatedTmr = {
            ...data,
            tmr: tmrValue
        }

        return calculated;
    }
}