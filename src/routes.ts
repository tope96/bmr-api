import { Route } from "./types";
import { calculateBmr, getActivityValues, getSexes } from "./handlers/bmrHandler";
import { calculateTmr } from "./handlers/tmrHandler";
import { validateParamsBmr, validateNoParams, validateParamsTmr } from "../middleware";
import { getHome } from "./handlers/homeHandler";

export const routes: Route[] = [
    {
        method: 'get',
        path: '/',
        middleware: [],
        handler: getHome
    },

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
        path: '/calculate-tmr',
        middleware: [validateParamsTmr],
        handler: calculateTmr
    }
]