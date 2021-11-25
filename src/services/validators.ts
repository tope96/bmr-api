export interface Validatable {
    valueName: string;
    value: string|number;
    require: boolean;
    min?: number;
    max?: number;
    allowedValues?: string[];
}

export function validate(validatableInput: Validatable): [boolean, string] {
    let isValid = true;
    let errorMessage = "";

    if(validatableInput.require) {
        const check = validatableInput.value.toString().trim().length !== 0;
        isValid = isValid && check;
        if(!check) {
            errorMessage += validatableInput.valueName + " is required!\n";
            return [isValid, errorMessage];
        }
    }

    if(validatableInput.min != null || validatableInput.max != null) {
        const check = !isNaN(+validatableInput.value);
        isValid = isValid && check;
        if(!check) {
            errorMessage += "Value of " + validatableInput.valueName + " should be a number \n";
            return [isValid, errorMessage];
        }
    }

    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
        const check = validatableInput.value >= validatableInput.min;
        isValid = isValid && check;
        if(!check) {
            errorMessage += "Value of " + validatableInput.valueName + " " + validatableInput.value + " cannot be smaller than " + validatableInput.min + "\n";
            return [isValid, errorMessage];
        }
    }

    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        const check = validatableInput.value <= validatableInput.max;
        isValid = isValid && check;
        if(!check) {
            errorMessage += "Value of " + validatableInput.valueName + " " + validatableInput.value + " cannot be greater than " + validatableInput.max + "\n";
            return [isValid, errorMessage];
        }
    }

    if(validatableInput.allowedValues != null) {
        const check = validatableInput.allowedValues.indexOf(validatableInput.value.toString().trim()) !== -1;
        isValid = isValid && check;
        if(!check) {
            errorMessage += "Value of " + validatableInput.valueName + " not exist in " + validatableInput.allowedValues + "\n";
            return [isValid, errorMessage];
        }
    }

    return [isValid, errorMessage];
}