import { BmrService } from "./bmrCalculationService";
import { CalculatedBmr, BmrToCalculate, CpmToCalculate, CalculatedCpm } from '../types';
import { activityValues } from './values/activityValues';

export class CpmService {

    async calculateCpm(data: CpmToCalculate): Promise<CalculatedCpm>{
        let activity = data.activity ? activityValues[data.activity] : 1;
        const bmrData: BmrToCalculate = {
            weight: data.weight,
            height: data.height,
            age: data.age,
            sex: data.sex
        }

        const bmrService = new BmrService();
        const bmr: CalculatedBmr = await bmrService.calculateBmr(bmrData);
        const cpmValue = +(bmr.bmr * activity).toFixed(2);
        const calculated: CalculatedCpm = {
            ...data,
            cpm: cpmValue
        }

        return calculated;
    }
}