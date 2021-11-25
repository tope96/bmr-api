import { Request, Response, RequestHandler as Middleware } from "express";
export type BmrToCalculate = {
    weight: number;
    height: number;
    age: number;
    sex: string;
};

export type CpmToCalculate = {
    weight: number;
    height: number;
    age: number;
    sex: string;
    activity: string;
};

export type CalculatedBmr = {
    weight: number;
    height: number;
    age: number;
    sex: string;
    bmr: number;
};

export type CalculatedCpm = {
    weight: number;
    height: number;
    age: number;
    sex: string;
    activity: string;
    cpm: number;
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
    path: string;
    message: string;
}
