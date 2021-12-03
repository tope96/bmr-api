"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai = __importStar(require("chai"));
const chai_1 = require("chai");
const chai_http_1 = __importDefault(require("chai-http"));
const sexValues_1 = require("../src/services/values/sexValues");
chai.use(chai_http_1.default);
const app_1 = __importDefault(require("../app"));
const activityValues_1 = require("../src/services/values/activityValues");
describe("Start", () => {
    describe('Base express tests', () => {
        it("Should return 'SUCCESS' if GET /", () => __awaiter(void 0, void 0, void 0, function* () {
            return (0, chai_1.request)(app_1.default).get("/").then(res => {
                (0, chai_1.expect)(res.status).to.equal(200);
            });
        }));
    });
});
describe("BMR", () => {
    it("Should calculate bmr for male", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, chai_1.request)(app_1.default).get("/calculate-bmr?weight=64&height=170&age=24&sex=male").then(res => {
            const expectResult = {
                "weight": 64,
                "height": 170,
                "age": 24,
                "sex": "male",
                "bmr": 1578.78
            };
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).to.eql(expectResult);
        });
    }));
    it("Should calculate bmr for female", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, chai_1.request)(app_1.default).get("/calculate-bmr?weight=64&height=170&age=24&sex=female").then(res => {
            const expectResult = {
                "weight": 64,
                "height": 170,
                "age": 24,
                "sex": "female",
                "bmr": 1422.78
            };
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).to.eql(expectResult);
        });
    }));
    it("Should throw bad request", () => __awaiter(void 0, void 0, void 0, function* () {
        const pathToTest = "/calculate-bmr?weight=64&height=170&age=24";
        return (0, chai_1.request)(app_1.default).get(pathToTest).then(res => {
            const error = {
                errorCode: 400,
                path: pathToTest,
                message: "Bad request"
            };
            (0, chai_1.expect)(res.status).to.equal(400);
            (0, chai_1.expect)(res.body).to.eql(error);
        });
    }));
    it("Should throw bad request. Bad weight", () => __awaiter(void 0, void 0, void 0, function* () {
        const badWeight = 647;
        const pathToTest = "/calculate-bmr?height=170&age=24&weight=" + badWeight + "&sex=male";
        return (0, chai_1.request)(app_1.default).get(pathToTest).then(res => {
            const error = {
                errorCode: 400,
                path: pathToTest,
                message: "Value of weight " + badWeight + " cannot be greater than 400\n"
            };
            (0, chai_1.expect)(res.status).to.equal(400);
            (0, chai_1.expect)(res.body).to.eql(error);
        });
    }));
    it("Should throw bad request. Bad height", () => __awaiter(void 0, void 0, void 0, function* () {
        const badheight = 280;
        const pathToTest = "/calculate-bmr?height=" + badheight + "&age=24&weight=64&sex=male";
        return (0, chai_1.request)(app_1.default).get(pathToTest).then(res => {
            const error = {
                errorCode: 400,
                path: pathToTest,
                message: "Value of height " + badheight + " cannot be greater than 250\n"
            };
            (0, chai_1.expect)(res.status).to.equal(400);
            (0, chai_1.expect)(res.body).to.eql(error);
        });
    }));
    it("Should throw bad request. Bad age", () => __awaiter(void 0, void 0, void 0, function* () {
        const badAge = 280;
        const pathToTest = "/calculate-bmr?height=170&age=" + badAge + "&weight=64&sex=male";
        return (0, chai_1.request)(app_1.default).get(pathToTest).then(res => {
            const error = {
                errorCode: 400,
                path: pathToTest,
                message: "Value of age " + badAge + " cannot be greater than 130\n"
            };
            (0, chai_1.expect)(res.status).to.equal(400);
            (0, chai_1.expect)(res.body).to.eql(error);
        });
    }));
    it("Should throw bad request. Bad sex", () => __awaiter(void 0, void 0, void 0, function* () {
        const badSex = "test";
        const pathToTest = "/calculate-bmr?height=170&age=24&weight=64&sex=" + badSex;
        return (0, chai_1.request)(app_1.default).get(pathToTest).then(res => {
            const error = {
                errorCode: 400,
                path: pathToTest,
                message: "Value of sex not exist in " + Object.keys(sexValues_1.sexValues) + "\n"
            };
            (0, chai_1.expect)(res.status).to.equal(400);
            (0, chai_1.expect)(res.body).to.eql(error);
        });
    }));
});
describe("TMR", () => {
    it("Should calculate tmr for male with none activity", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, chai_1.request)(app_1.default).get("/calculate-tmr?weight=64&height=170&age=24&sex=male&activity=none").then(res => {
            const expectResult = {
                "weight": 64,
                "height": 170,
                "age": 24,
                "sex": "male",
                "activity": "none",
                "tmr": 1894.54
            };
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).to.eql(expectResult);
        });
    }));
    it("Should calculate tmr for male with medium activity", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, chai_1.request)(app_1.default).get("/calculate-tmr?weight=64&height=170&age=24&sex=male&activity=medium").then(res => {
            const expectResult = {
                "weight": 64,
                "height": 170,
                "age": 24,
                "sex": "male",
                "activity": "medium",
                "tmr": 2526.05
            };
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).to.eql(expectResult);
        });
    }));
    it("Should calculate tmr for male with high activity", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, chai_1.request)(app_1.default).get("/calculate-tmr?weight=64&height=170&age=24&sex=male&activity=high").then(res => {
            const expectResult = {
                "weight": 64,
                "height": 170,
                "age": 24,
                "sex": "male",
                "activity": "high",
                "tmr": 2841.8
            };
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).to.eql(expectResult);
        });
    }));
    it("Should calculate tmr for male with highest activity", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, chai_1.request)(app_1.default).get("/calculate-tmr?weight=64&height=170&age=24&sex=male&activity=highest").then(res => {
            const expectResult = {
                "weight": 64,
                "height": 170,
                "age": 24,
                "sex": "male",
                "activity": "highest",
                "tmr": 3473.32
            };
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).to.eql(expectResult);
        });
    }));
    it("Should calculate tmr for female with none activity", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, chai_1.request)(app_1.default).get("/calculate-tmr?weight=64&height=170&age=24&sex=female&activity=none").then(res => {
            const expectResult = {
                "weight": 64,
                "height": 170,
                "age": 24,
                "sex": "female",
                "activity": "none",
                "tmr": 1707.34
            };
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).to.eql(expectResult);
        });
    }));
    it("Should calculate tmr for female with medium activity", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, chai_1.request)(app_1.default).get("/calculate-tmr?weight=64&height=170&age=24&sex=female&activity=medium").then(res => {
            const expectResult = {
                "weight": 64,
                "height": 170,
                "age": 24,
                "sex": "female",
                "activity": "medium",
                "tmr": 2276.45
            };
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).to.eql(expectResult);
        });
    }));
    it("Should calculate tmr for female with high activity", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, chai_1.request)(app_1.default).get("/calculate-tmr?weight=64&height=170&age=24&sex=female&activity=high").then(res => {
            const expectResult = {
                "weight": 64,
                "height": 170,
                "age": 24,
                "sex": "female",
                "activity": "high",
                "tmr": 2561
            };
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).to.eql(expectResult);
        });
    }));
    it("Should calculate tmr for female with highest activity", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, chai_1.request)(app_1.default).get("/calculate-tmr?weight=64&height=170&age=24&sex=female&activity=highest").then(res => {
            const expectResult = {
                "weight": 64,
                "height": 170,
                "age": 24,
                "sex": "female",
                "activity": "highest",
                "tmr": 3130.12
            };
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).to.eql(expectResult);
        });
    }));
    it("Should throw bad request", () => __awaiter(void 0, void 0, void 0, function* () {
        const pathToTest = "/calculate-tmr?weight=64&height=170&age=24";
        return (0, chai_1.request)(app_1.default).get(pathToTest).then(res => {
            const error = {
                errorCode: 400,
                path: pathToTest,
                message: "Bad request"
            };
            (0, chai_1.expect)(res.status).to.equal(400);
            (0, chai_1.expect)(res.body).to.eql(error);
        });
    }));
    it("Should throw bad request. Bad weight", () => __awaiter(void 0, void 0, void 0, function* () {
        const badWeight = 647;
        const pathToTest = "/calculate-tmr?weight=" + badWeight + "&height=170&age=24&sex=male&activity=highest";
        return (0, chai_1.request)(app_1.default).get(pathToTest).then(res => {
            const error = {
                errorCode: 400,
                path: pathToTest,
                message: "Value of weight " + badWeight + " cannot be greater than 400\n"
            };
            (0, chai_1.expect)(res.status).to.equal(400);
            (0, chai_1.expect)(res.body).to.eql(error);
        });
    }));
    it("Should throw bad request. Bad height", () => __awaiter(void 0, void 0, void 0, function* () {
        const badheight = 280;
        const pathToTest = "/calculate-tmr?weight=64&height=" + badheight + "&age=24&sex=male&activity=highest";
        return (0, chai_1.request)(app_1.default).get(pathToTest).then(res => {
            const error = {
                errorCode: 400,
                path: pathToTest,
                message: "Value of height " + badheight + " cannot be greater than 250\n"
            };
            (0, chai_1.expect)(res.status).to.equal(400);
            (0, chai_1.expect)(res.body).to.eql(error);
        });
    }));
    it("Should throw bad request. Bad age", () => __awaiter(void 0, void 0, void 0, function* () {
        const badAge = 280;
        const pathToTest = "/calculate-tmr?weight=64&height=170&age=" + badAge + "&sex=male&activity=highest";
        return (0, chai_1.request)(app_1.default).get(pathToTest).then(res => {
            const error = {
                errorCode: 400,
                path: pathToTest,
                message: "Value of age " + badAge + " cannot be greater than 130\n"
            };
            (0, chai_1.expect)(res.status).to.equal(400);
            (0, chai_1.expect)(res.body).to.eql(error);
        });
    }));
    it("Should throw bad request. Bad sex", () => __awaiter(void 0, void 0, void 0, function* () {
        const badSex = "test";
        const pathToTest = "/calculate-tmr?weight=64&height=170&age=24&sex=" + badSex + "&activity=highest";
        return (0, chai_1.request)(app_1.default).get(pathToTest).then(res => {
            const error = {
                errorCode: 400,
                path: pathToTest,
                message: "Value of sex not exist in " + Object.keys(sexValues_1.sexValues) + "\n"
            };
            (0, chai_1.expect)(res.status).to.equal(400);
            (0, chai_1.expect)(res.body).to.eql(error);
        });
    }));
    it("Should throw bad request. Bad activity", () => __awaiter(void 0, void 0, void 0, function* () {
        const badActivity = "test";
        const pathToTest = "/calculate-tmr?weight=64&height=170&age=24&sex=male&activity=" + badActivity;
        return (0, chai_1.request)(app_1.default).get(pathToTest).then(res => {
            const error = {
                errorCode: 400,
                path: pathToTest,
                message: "Value of activity not exist in " + Object.keys(activityValues_1.activityValues) + "\n"
            };
            (0, chai_1.expect)(res.status).to.equal(400);
            (0, chai_1.expect)(res.body).to.eql(error);
        });
    }));
});
describe("Test dictionaries", () => {
    it("Should return list of sexes", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, chai_1.request)(app_1.default).get("/sex-values").then(res => {
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).to.eql(Object.keys(sexValues_1.sexValues));
        });
    }));
    it("Should return list of activity", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, chai_1.request)(app_1.default).get("/activity-values").then(res => {
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).to.eql(Object.keys(activityValues_1.activityValues));
        });
    }));
    it("Should return bad request for activity values", () => __awaiter(void 0, void 0, void 0, function* () {
        const pathToTest = "/activity-values?test=test";
        return (0, chai_1.request)(app_1.default).get(pathToTest).then(res => {
            const error = {
                errorCode: 400,
                path: pathToTest,
                message: "Bad request. No params should be provided"
            };
            (0, chai_1.expect)(res.status).to.equal(400);
            (0, chai_1.expect)(res.body).to.eql(error);
        });
    }));
    it("Should return bad request for sex values", () => __awaiter(void 0, void 0, void 0, function* () {
        const pathToTest = "/activity-values?test=test";
        return (0, chai_1.request)(app_1.default).get(pathToTest).then(res => {
            const error = {
                errorCode: 400,
                path: pathToTest,
                message: "Bad request. No params should be provided"
            };
            (0, chai_1.expect)(res.status).to.equal(400);
            (0, chai_1.expect)(res.body).to.eql(error);
        });
    }));
});
after('Exit mocha after finishing all tests execution', process.exit);
