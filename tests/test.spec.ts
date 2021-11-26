import * as chai from 'chai';
import { request, expect } from 'chai';
import chaiHttp from 'chai-http';
import { CalculatedBmr, CalculatedCpm, errorResponse } from '../src/types';
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
    return request(server).get("/calculate-bmr?weight=64&height=170&age=24&sex=male").then(res => {
      const expectResult: CalculatedBmr = {
        "weight": 64,
        "height": 170,
        "age": 24,
        "sex": "male",
        "bmr": 1578.78
      }

      expect(res.status).to.equal(200);
      expect(<CalculatedBmr>res.body).to.eql(expectResult);
    })
  });

    it("Should calculate bmr for female", async () => {
      return request(server).get("/calculate-bmr?weight=64&height=170&age=24&sex=female").then(res => {
        const expectResult: CalculatedBmr = {
          "weight": 64,
          "height": 170,
          "age": 24,
          "sex": "female",
          "bmr": 1422.78
        }

        expect(res.status).to.equal(200);
        expect(<CalculatedBmr>res.body).to.eql(expectResult);
      })
    });

    it("Should throw bad request", async () => {
      const pathToTest = "/calculate-bmr?weight=64&height=170&age=24";

      return request(server).get(pathToTest).then(res => {
        const error: errorResponse = {
          path: pathToTest,
          message: "Bad request"
        }
        expect(res.status).to.equal(400);
        expect(res.body).to.eql(error)
      })
    });

    it("Should throw bad request. Bad weight", async () => {
      const badWeight = 647;
      const pathToTest = "/calculate-bmr?height=170&age=24&weight=" + badWeight + "&sex=male";

      return request(server).get(pathToTest).then(res => {
        const error: errorResponse = {
          path: pathToTest,
          message: "Value of weight " + badWeight + " cannot be greater than 400\n"
        }

        expect(res.status).to.equal(400);
        expect(res.body).to.eql(error)
      })
    });

    it("Should throw bad request. Bad height", async () => {
      const badheight = 280;
      const pathToTest = "/calculate-bmr?height=" + badheight + "&age=24&weight=64&sex=male";

      return request(server).get(pathToTest).then(res => {
        const error: errorResponse = {
          path: pathToTest,
          message: "Value of height " + badheight + " cannot be greater than 250\n"
        }

        expect(res.status).to.equal(400);
        expect(res.body).to.eql(error)
      })
    });

    it("Should throw bad request. Bad age", async () => {
      const badAge = 280;
      const pathToTest = "/calculate-bmr?height=170&age=" + badAge + "&weight=64&sex=male";

      return request(server).get(pathToTest).then(res => {
        const error: errorResponse = {
          path: pathToTest,
          message: "Value of age " + badAge + " cannot be greater than 130\n"
        }

        expect(res.status).to.equal(400);
        expect(res.body).to.eql(error)
      })
    });

    it("Should throw bad request. Bad sex", async () => {
      const badSex = "test";
      const pathToTest = "/calculate-bmr?height=170&age=24&weight=64&sex=" + badSex;

      return request(server).get(pathToTest).then(res => {
        const error: errorResponse = {
          path: pathToTest,
          message: "Value of sex not exist in " + Object.keys(sexValues) + "\n"
        }

        expect(res.status).to.equal(400);
        expect(res.body).to.eql(error)
      })
    });

  });

  describe("CPM", () => {
    it("Should calculate cpm for male with none activity", async () => {
      return request(server).get("/calculate-cpm?weight=64&height=170&age=24&sex=male&activity=none").then(res => {
        const expectResult: CalculatedCpm = {
          "weight": 64,
          "height": 170,
          "age": 24,
          "sex": "male",
          "activity": "none",
          "cpm": 1894.54
      }
        expect(res.status).to.equal(200);
        expect(<CalculatedCpm>res.body).to.eql(expectResult);
      })
    });

    it("Should calculate cpm for male with medium activity", async () => {
      return request(server).get("/calculate-cpm?weight=64&height=170&age=24&sex=male&activity=medium").then(res => {
        const expectResult: CalculatedCpm = {
          "weight": 64,
          "height": 170,
          "age": 24,
          "sex": "male",
          "activity": "medium",
          "cpm": 2526.05
      }

        expect(res.status).to.equal(200);
        expect(<CalculatedCpm>res.body).to.eql(expectResult);
      })
    });

    it("Should calculate cpm for male with high activity", async () => {
      return request(server).get("/calculate-cpm?weight=64&height=170&age=24&sex=male&activity=high").then(res => {
        const expectResult: CalculatedCpm = {
          "weight": 64,
          "height": 170,
          "age": 24,
          "sex": "male",
          "activity": "high",
          "cpm": 2841.8
      }

        expect(res.status).to.equal(200);
        expect(<CalculatedCpm>res.body).to.eql(expectResult);
      })
    });

    it("Should calculate cpm for male with highest activity", async () => {
      return request(server).get("/calculate-cpm?weight=64&height=170&age=24&sex=male&activity=highest").then(res => {
        const expectResult: CalculatedCpm = {
          "weight": 64,
          "height": 170,
          "age": 24,
          "sex": "male",
          "activity": "highest",
          "cpm": 3473.32
      }

        expect(res.status).to.equal(200);
        expect(<CalculatedCpm>res.body).to.eql(expectResult);
      })
    });

    it("Should calculate cpm for female with none activity", async () => {
      return request(server).get("/calculate-cpm?weight=64&height=170&age=24&sex=female&activity=none").then(res => {
        const expectResult: CalculatedCpm = {
          "weight": 64,
          "height": 170,
          "age": 24,
          "sex": "female",
          "activity": "none",
          "cpm": 1707.34
        }

        expect(res.status).to.equal(200);
        expect(<CalculatedCpm>res.body).to.eql(expectResult);
      })
    });

    it("Should calculate cpm for female with medium activity", async () => {
      return request(server).get("/calculate-cpm?weight=64&height=170&age=24&sex=female&activity=medium").then(res => {
        const expectResult: CalculatedCpm = {
          "weight": 64,
          "height": 170,
          "age": 24,
          "sex": "female",
          "activity": "medium",
          "cpm": 2276.45
      }

        expect(res.status).to.equal(200);
        expect(<CalculatedCpm>res.body).to.eql(expectResult);
      })
    });

    it("Should calculate cpm for female with high activity", async () => {
      return request(server).get("/calculate-cpm?weight=64&height=170&age=24&sex=female&activity=high").then(res => {
        const expectResult: CalculatedCpm = {
          "weight": 64,
          "height": 170,
          "age": 24,
          "sex": "female",
          "activity": "high",
          "cpm": 2561
      }

        expect(res.status).to.equal(200);
        expect(<CalculatedCpm>res.body).to.eql(expectResult);
      })
    });

    it("Should calculate cpm for female with highest activity", async () => {
      return request(server).get("/calculate-cpm?weight=64&height=170&age=24&sex=female&activity=highest").then(res => {
        const expectResult: CalculatedCpm = {
          "weight": 64,
          "height": 170,
          "age": 24,
          "sex": "female",
          "activity": "highest",
          "cpm": 3130.12
      }

        expect(res.status).to.equal(200);
        expect(<CalculatedCpm>res.body).to.eql(expectResult);
      })
    });

    it("Should throw bad request", async () => {
      const pathToTest = "/calculate-cpm?weight=64&height=170&age=24";

      return request(server).get(pathToTest).then(res => {
        const error: errorResponse = {
          path: pathToTest,
          message: "Bad request"
        }
        expect(res.status).to.equal(400);
        expect(res.body).to.eql(error)
      })
    });

    it("Should throw bad request. Bad weight", async () => {
      const badWeight = 647;
      const pathToTest = "/calculate-cpm?weight=" + badWeight + "&height=170&age=24&sex=male&activity=highest";

      return request(server).get(pathToTest).then(res => {
        const error: errorResponse = {
          path: pathToTest,
          message: "Value of weight " + badWeight + " cannot be greater than 400\n"
        }

        expect(res.status).to.equal(400);
        expect(res.body).to.eql(error)
      })
    });

    it("Should throw bad request. Bad height", async () => {
      const badheight = 280;
      const pathToTest = "/calculate-cpm?weight=64&height=" + badheight + "&age=24&sex=male&activity=highest";

      return request(server).get(pathToTest).then(res => {
        const error: errorResponse = {
          path: pathToTest,
          message: "Value of height " + badheight + " cannot be greater than 250\n"
        }

        expect(res.status).to.equal(400);
        expect(res.body).to.eql(error)
      })
    });

    it("Should throw bad request. Bad age", async () => {
      const badAge = 280;
      const pathToTest = "/calculate-cpm?weight=64&height=170&age=" + badAge + "&sex=male&activity=highest";

      return request(server).get(pathToTest).then(res => {
        const error: errorResponse = {
          path: pathToTest,
          message: "Value of age " + badAge + " cannot be greater than 130\n"
        }

        expect(res.status).to.equal(400);
        expect(res.body).to.eql(error)
      })
    });

    it("Should throw bad request. Bad sex", async () => {
      const badSex = "test";
      const pathToTest = "/calculate-cpm?weight=64&height=170&age=24&sex=" + badSex + "&activity=highest";

      return request(server).get(pathToTest).then(res => {
        const error: errorResponse = {
          path: pathToTest,
          message: "Value of sex not exist in " + Object.keys(sexValues) + "\n"
        }

        expect(res.status).to.equal(400);
        expect(res.body).to.eql(error)
      })
    });

    it("Should throw bad request. Bad activity", async () => {
      const badActivity = "test";
      const pathToTest = "/calculate-cpm?weight=64&height=170&age=24&sex=male&activity=" + badActivity;

      return request(server).get(pathToTest).then(res => {
        const error: errorResponse = {
          path: pathToTest,
          message: "Value of activity not exist in " + Object.keys(activityValues) + "\n"
        }

        expect(res.status).to.equal(400);
        expect(res.body).to.eql(error)
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
          path: pathToTest,
          message: "Bad request. No params should be provided"
        }

        expect(res.status).to.equal(400);
        expect(res.body).to.eql(error)
      })
    });
  });

after('Exit mocha after finishing all tests execution', process.exit);