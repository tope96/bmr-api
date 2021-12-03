import { CalculatedBmr, BmrToCalculate, kgToPound, cmToInches } from '../types';
import { sexValues } from './values/sexValues';

export class BmrService {

    async calculateBmr(data: BmrToCalculate): Promise<CalculatedBmr>{
        let bmr = 0;
        let convertedWeight = data.weight;
        let convertedHeight = data.height;

        if(data.inImperial === "true") {
            convertedWeight = convertedWeight * kgToPound;
            convertedHeight = convertedHeight * cmToInches;
        }

        if(data.sex === "female") {
            bmr = +((9.99 * convertedWeight) + (6.25 * convertedHeight) - (4.92 * data.age) - sexValues.female).toFixed(2);
        }

        if(data.sex === "male") {
            bmr = +((9.99 * convertedWeight) + (6.25 * convertedHeight) - (4.92 * data.age) - sexValues.male).toFixed(2);
        }

        const calculated: CalculatedBmr = {
            ...data,
            bmr: bmr
        }

        return calculated;
    }
}