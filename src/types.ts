import { Request, Response, RequestHandler as Middleware } from "express";
export type BmrToCalculate = {
    weight: number;
    height: number;
    age: number;
    sex: string;
    inImperial: string;
};

export type TmrToCalculate = {
    weight: number;
    height: number;
    age: number;
    sex: string;
    activity: string;
    inImperial: string;
};

export type CalculatedBmr = {
    weight: number;
    height: number;
    age: number;
    sex: string;
    bmr: number;
    inImperial: string;
};

export type CalculatedTmr = {
    weight: number;
    height: number;
    age: number;
    sex: string;
    activity: string;
    tmr: number;
    inImperial: string;
};


type Method =
| 'get'
| 'post'
| 'head'


export type Handler = (req: Request, res: Response) => any;

export type Route = {
    method: Method;
    path: string;
    middleware: Middleware[];
    handler: Handler;
}

export type errorResponse = {
    errorCode: number;
    path: string;
    message: string;
}

export type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T];
export type OptionalKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T];

export const kgToPound:number = 0.45359237;
export const cmToInches:number = 2.54;