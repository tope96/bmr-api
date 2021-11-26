import express from 'express';
import bodyParser from 'body-parser';
import {routes} from './src/routes'

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

routes.forEach((route) => {
    const { method, path, middleware, handler } = route;
    app[method](path, ...middleware, handler);
})

app.listen(PORT, () =>{
    console.log("Server listen...");
})

export default app;