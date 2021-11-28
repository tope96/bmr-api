import express from 'express';
import bodyParser from 'body-parser';
import {routes} from './src/routes'
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = 3000;

//100 per 15 minutes
const apiRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
})

app.use(apiRateLimit)

app.use(bodyParser.urlencoded({ extended: false }));

routes.forEach((route) => {
    const { method, path, middleware, handler } = route;
    app[method](path, ...middleware, handler);
})

app.listen(PORT, () =>{
    console.log("Server listen...");
})

export default app;