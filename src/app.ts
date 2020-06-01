// Here we are importing the modules we require in our app.
import "reflect-metadata";
import { createConnection } from "typeorm";
import * as cors from "cors";
import * as express from "express";
import * as bodyParser from "body-parser";

// Importing our routes.
import userRoutes from './routes/userRoutes';

// Initializing our app and our connection.
const app = express();
createConnection()
.then(res => console.log('Connected to the db'))
.catch(err => console.log(err));

// Setting a port.
app.set('port', process.env.PORT || 3000);

// Setting up our middlewares.
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// getting our routes.
app.use('/', userRoutes);

// Exporting app.
export default app;
