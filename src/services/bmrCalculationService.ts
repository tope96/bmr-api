import { CalculatedBmr, BmrToCalculate } from '../types';
import { sexValues } from './values/sexValues';

export class BmrService {

    async calculateBmr(data: BmrToCalculate): Promise<CalculatedBmr>{
        let bmr = 0;

        if(data.sex === "female") {
            bmr = +((9.99 * data.weight) + (6.25 * data.height) - (4.92 * data.age) - sexValues.female).toFixed(2);
        }

        if(data.sex === "male") {
            bmr = +((9.99 * data.weight) + (6.25 * data.height) - (4.92 * data.age) - sexValues.male).toFixed(2);
        }

        const calculated: CalculatedBmr = {
            ...data,
            bmr: bmr
        }

        return calculated;
    }
}