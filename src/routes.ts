import { Route } from "./types";
import { calculateBmr, getActivityValues, getSexes } from "./handlers/bmrHandler";
import { calculateCpm } from "./handlers/cpmHandler";
import { validateParamsBmr, validateNoParams, validateParamsCpm } from "../middleware";

export const routes: Route[] = [
    {
        method: 'get',
        path: '/calculate-bmr',
        middleware: [validateParamsBmr],
        handler: calculateBmr
    },

    {
        method: 'get',
        path: '/activity-values',
        middleware: [validateNoParams],
        handler: getActivityValues
    },

    {
        method: 'get',
        path: '/sex-values',
        middleware: [validateNoParams],
        handler: getSexes
    },

    {
        method: 'get',
        path: '/calculate-cpm',
        middleware: [validateParamsCpm],
        handler: calculateCpm
    }
]