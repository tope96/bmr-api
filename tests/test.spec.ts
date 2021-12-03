import * as chai from 'chai';
import { request, expect } from 'chai';
import chaiHttp from 'chai-http';
import { CalculatedBmr, CalculatedTmr, errorResponse } from '../src/types';
import { sexValues } from '../src/services/values/sexValues';

chai.use(chaiHttp);

import server from '../app';
import { activityValues } from '../src/services/values/activityValues';

describe("Start", () => {
  describe('Base express tests', () => {
      it("Should return 'SUCCESS' if GET /", async () => {
          return request(server).get("/").then(res => {
              expect(res.status).to.equal(200);
          })
      });
  });
});

describe("BMR", () => {
  it("Should calculate bmr for male", async () => {
    return request(server).get("/calculate-bmr?weight=64&height=170&age=24&sex=male&inImperial=false").then(res => {
      const expectResult = {
        "weight": 64,
        "height": 170,
        "age": 24,
        "sex": "male",
        "inImperial": "false",
        "bmr": 1578.78,
      }

      expect(res.status).to.equal(200);
      expect(<CalculatedBmr>res.body).to.eql(expectResult);
    })
  });

  it("Should calculate bmr for male in imperial", async () => {
    return request(server).get("/calculate-bmr?weight=141&height=67&age=24&sex=male&inImperial=true").then(res => {
      const expectResult = {
        "weight": 141,
        "height": 67,
        "age": 24,
        "sex": "male",
        "inImperial": "true",
        "bmr": 1579.47,
      }

      expect(res.status).to.equal(200);
      expect(<CalculatedBmr>res.body).to.eql(expectResult);
    })
  });

    it("Should calculate bmr for female", async () => {
      return request(server).get("/calculate-bmr?weight=64&height=170&age=24&sex=female&inImperial=false").then(res => {
        const expectResult: CalculatedBmr = {
          "weight": 64,
          "height": 170,
          "age": 24,
          "sex": "female",
          "bmr": 1422.78,
          "inImperial": "false"
        }

        expect(res.status).to.equal(200);
        expect(<CalculatedBmr>res.body).to.eql(expectResult);
      })
    });

    it("Should calculate bmr for female in imperial", async () => {
      return request(server).get("/calculate-bmr?weight=141&height=67&age=24&sex=female&inImperial=true").then(res => {
        const expectResult: CalculatedBmr = {
          "weight": 141,
          "height": 67,
          "age": 24,
          "sex": "female",
          "bmr": 1423.47,
          "inImperial": "true"
        }

        expect(res.status).to.equal(200);
        expect(<CalculatedBmr>res.body).to.eql(expectResult);
      })
    });

    it("Should throw bad request", async () => {
      const pathToTest = "/calculate-bmr?weight=64&height=170&age=24&inImperial=false";

      return request(server).get(pathToTest).then(res => {
        const error: errorResponse = {
          errorCode: 400,
          path: pathToTest,
          message: "Bad request"
        }
        expect(res.status).to.equal(400);
        expect(res.body).to.eql(error)
      })
    });

    it("Should throw bad request. Bad weight", async () => {
      const badWeight = 647;
      const pathToTest = "/calculate-bmr?height=170&age=24&weight=" + badWeight + "&sex=male&inImperial=false";

      return request(server).get(pathToTest).then(res => {
        const error: errorResponse = {
          errorCode: 400,
          path: pathToTest,
          message: "Value of weight " + badWeight + " cannot be greater than 400\n"
        }

        expect(res.status).to.equal(400);
        expect(res.body).to.eql(error)
      })
    });

    it("Should throw bad request. Bad height", async () => {
      const badheight = 280;
      const pathToTest = "/calculate-bmr?height=" + badheight + "&age=24&weight=64&sex=male&inImperial=false";

      return request(server).get(pathToTest).then(res => {
        const error: errorResponse = {
          errorCode: 400,
          path: pathToTest,
          message: "Value of height " + badheight + " cannot be greater than 250\n"
        }

        expect(res.status).to.equal(400);
        expect(res.body).to.eql(error)
      })
    });

    it("Should throw bad request. Bad age", async () => {
      const badAge = 280;
      const pathToTest = "/calculate-bmr?height=170&age=" + badAge + "&weight=64&sex=male&inImperial=false";

      return request(server).get(pathToTest).then(res => {
        const error: errorResponse = {
          errorCode: 400,
          path: pathToTest,
          message: "Value of age " + badAge + " cannot be greater than 130\n"
        }

        expect(res.status).to.equal(400);
        expect(res.body).to.eql(error)
      })
    });

    it("Should throw bad request. Bad sex", async () => {
      const badSex = "test";
      const pathToTest = "/calculate-bmr?height=170&age=24&weight=64&sex=" + badSex + "&inImperial=false";

      return request(server).get(pathToTest).then(res => {
        const error: errorResponse = {
          errorCode: 400,
          path: pathToTest,
          message: "Value of sex not exist in " + Object.keys(sexValues) + "\n"
        }

        expect(res.status).to.equal(400);
        expect(res.body).to.eql(error)
      })
    });

  });

  describe("TMR", () => {
    it("Should calculate tmr for male with none activity", async () => {
      return request(server).get("/calculate-tmr?weight=64&height=170&age=24&sex=male&activity=none&inImperial=false").then(res => {
        const expectResult: CalculatedTmr = {
          "weight": 64,
          "height": 170,
          "age": 24,
          "sex": "male",
          "activity": "none",
          "tmr": 1894.54,
          "inImperial": "false"
      }
        expect(res.status).to.equal(200);
        expect(<CalculatedTmr>res.body).to.eql(expectResult);
      })
    });

    it("Should calculate tmr for male with medium activity", async () => {
      return request(server).get("/calculate-tmr?weight=64&height=170&age=24&sex=male&activity=medium&inImperial=false").then(res => {
        const expectResult: CalculatedTmr = {
          "weight": 64,
          "height": 170,
          "age": 24,
          "sex": "male",
          "activity": "medium",
          "tmr": 2526.05,
          "inImperial": "false"
      }

        expect(res.status).to.equal(200);
        expect(<CalculatedTmr>res.body).to.eql(expectResult);
      })
    });

    it("Should calculate tmr for male with high activity", async () => {
      return request(server).get("/calculate-tmr?weight=64&height=170&age=24&sex=male&activity=high&inImperial=false").then(res => {
        const expectResult: CalculatedTmr = {
          "weight": 64,
          "height": 170,
          "age": 24,
          "sex": "male",
          "activity": "high",
          "tmr": 2841.8,
          "inImperial": "false"
      }

        expect(res.status).to.equal(200);
        expect(<CalculatedTmr>res.body).to.eql(expectResult);
      })
    });

    it("Should calculate tmr for male with highest activity", async () => {
      return request(server).get("/calculate-tmr?weight=64&height=170&age=24&sex=male&activity=highest&inImperial=false").then(res => {
        const expectResult: CalculatedTmr = {
          "weight": 64,
          "height": 170,
          "age": 24,
          "sex": "male",
          "activity": "highest",
          "tmr": 3473.32,
          "inImperial": "false"
      }

        expect(res.status).to.equal(200);
        expect(<CalculatedTmr>res.body).to.eql(expectResult);
      })
    });

    it("Should calculate tmr for female with none activity", async () => {
      return request(server).get("/calculate-tmr?weight=64&height=170&age=24&sex=female&activity=none&inImperial=false").then(res => {
        const expectResult: CalculatedTmr = {
          "weight": 64,
          "height": 170,
          "age": 24,
          "sex": "female",
          "activity": "none",
          "tmr": 1707.34,
          "inImperial": "false"
        }

        expect(res.status).to.equal(200);
        expect(<CalculatedTmr>res.body).to.eql(expectResult);
      })
    });

    it("Should calculate tmr for female with medium activity", async () => {
      return request(server).get("/calculate-tmr?weight=64&height=170&age=24&sex=female&activity=medium&inImperial=false").then(res => {
        const expectResult: CalculatedTmr = {
          "weight": 64,
          "height": 170,
          "age": 24,
          "sex": "female",
          "activity": "medium",
          "tmr": 2276.45,
          "inImperial": "false"
      }

        expect(res.status).to.equal(200);
        expect(<CalculatedTmr>res.body).to.eql(expectResult);
      })
    });

    it("Should calculate tmr for female with high activity", async () => {
      return request(server).get("/calculate-tmr?weight=64&height=170&age=24&sex=female&activity=high&inImperial=false").then(res => {
        const expectResult: CalculatedTmr = {
          "weight": 64,
          "height": 170,
          "age": 24,
          "sex": "female",
          "activity": "high",
          "tmr": 2561,
          "inImperial": "false"
      }

        expect(res.status).to.equal(200);
        expect(<CalculatedTmr>res.body).to.eql(expectResult);
      })
    });

    it("Should calculate tmr for female with highest activity", async () => {
      return request(server).get("/calculate-tmr?weight=64&height=170&age=24&sex=female&activity=highest&inImperial=false").then(res => {
        const expectResult: CalculatedTmr = {
          "weight": 64,
          "height": 170,
          "age": 24,
          "sex": "female",
          "activity": "highest",
          "tmr": 3130.12,
          "inImperial": "false"
      }

        expect(res.status).to.equal(200);
        expect(<CalculatedTmr>res.body).to.eql(expectResult);
      })
    });

    it("Should throw bad request", async () => {
      const pathToTest = "/calculate-tmr?weight=64&height=170&age=24&inImperial=false";

      return request(server).get(pathToTest).then(res => {
        const error: errorResponse = {
          errorCode: 400,
          path: pathToTest,
          message: "Bad request"
        }
        expect(res.status).to.equal(400);
        expect(res.body).to.eql(error)
      })
    });

    it("Should throw bad request. Bad weight", async () => {
      const badWeight = 647;
      const pathToTest = "/calculate-tmr?weight=" + badWeight + "&height=170&age=24&sex=male&activity=highest&inImperial=false";

      return request(server).get(pathToTest).then(res => {
        const error: errorResponse = {
          errorCode: 400,
          path: pathToTest,
          message: "Value of weight " + badWeight + " cannot be greater than 400\n"
        }

        expect(res.status).to.equal(400);
        expect(res.body).to.eql(error)
      })
    });

    it("Should throw bad request. Bad height", async () => {
      const badheight = 280;
      const pathToTest = "/calculate-tmr?weight=64&height=" + badheight + "&age=24&sex=male&activity=highest&inImperial=false";

      return request(server).get(pathToTest).then(res => {
        const error: errorResponse = {
          errorCode: 400,
          path: pathToTest,
          message: "Value of height " + badheight + " cannot be greater than 250\n"
        }

        expect(res.status).to.equal(400);
        expect(res.body).to.eql(error)
      })
    });

    it("Should throw bad request. Bad age", async () => {
      const badAge = 280;
      const pathToTest = "/calculate-tmr?weight=64&height=170&age=" + badAge + "&sex=male&activity=highest&inImperial=false";

      return request(server).get(pathToTest).then(res => {
        const error: errorResponse = {
          errorCode: 400,
          path: pathToTest,
          message: "Value of age " + badAge + " cannot be greater than 130\n"
        }

        expect(res.status).to.equal(400);
        expect(res.body).to.eql(error)
      })
    });

    it("Should throw bad request. Bad sex", async () => {
      const badSex = "test";
      const pathToTest = "/calculate-tmr?weight=64&height=170&age=24&sex=" + badSex + "&activity=highest&inImperial=false";

      return request(server).get(pathToTest).then(res => {
        const error: errorResponse = {
          errorCode: 400,
          path: pathToTest,
          message: "Value of sex not exist in " + Object.keys(sexValues) + "\n"
        }

        expect(res.status).to.equal(400);
        expect(res.body).to.eql(error)
      })
    });

    it("Should throw bad request. Bad activity", async () => {
      const badActivity = "test";
      const pathToTest = "/calculate-tmr?weight=64&height=170&age=24&sex=male&activity=" + badActivity + "&inImperial=false";

      return request(server).get(pathToTest).then(res => {
        const error: errorResponse = {
          errorCode: 400,
          path: pathToTest,
          message: "Value of activity not exist in " + Object.keys(activityValues) + "\n"
        }

        expect(res.status).to.equal(400);
        expect(res.body).to.eql(error)
      })
    });

    it("Should calculate tmr for female with highest activity in imperial", async () => {
      return request(server).get("/calculate-tmr?weight=141&height=67&age=24&sex=female&activity=highest&inImperial=true").then(res => {
        const expectResult: CalculatedTmr = {
          "weight": 141,
          "height": 67,
          "age": 24,
          "sex": "female",
          "activity": "highest",
          "tmr": 3131.63,
          "inImperial": "true"
      }

        expect(res.status).to.equal(200);
        expect(<CalculatedTmr>res.body).to.eql(expectResult);
      })
    });
  });

  describe("Test dictionaries", () => {
    it("Should return list of sexes", async () => {
      return request(server).get("/sex-values").then(res => {
        expect(res.status).to.equal(200);
        expect(res.body).to.eql(Object.keys(sexValues))
      })
    });

    it("Should return list of activity", async () => {
      return request(server).get("/activity-values").then(res => {
        expect(res.status).to.equal(200);
        expect(res.body).to.eql(Object.keys(activityValues))
      })
    });

    it("Should return bad request for activity values", async () => {
      const pathToTest = "/activity-values?test=test";

      return request(server).get(pathToTest).then(res => {
        const error: errorResponse = {
          errorCode: 400,
          path: pathToTest,
          message: "Bad request. No params should be provided"
        }

        expect(res.status).to.equal(400);
        expect(res.body).to.eql(error)
      })
    });

    it("Should return bad request for sex values", async () => {
      const pathToTest = "/activity-values?test=test";

      return request(server).get(pathToTest).then(res => {
        const error: errorResponse = {
          errorCode: 400,
          path: pathToTest,
          message: "Bad request. No params should be provided"
        }

        expect(res.status).to.equal(400);
        expect(res.body).to.eql(error)
      })
    });
  });

after('Exit mocha after finishing all tests execution', process.exit);