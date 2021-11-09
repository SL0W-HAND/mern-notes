import express from 'express';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import morgan from 'morgan';
import cors from 'cors';
import { connect } from 'mongoose';

import  config  from './config/config';
import './config/passport'

//import routes
import usersRoutes from './routes/users';
import notesRoutes from './routes/notes';


//initializations
const app = express();

//conect to db
try {
	connect('mongodb://localhost:27017/notes1');
	console.log('connected to mongodb');
} catch (error) {
	console.log(error);
	console.log('error connecting to mongodb');
	process.exit(1);
}

//settings
app.set("port", config.port);


//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());



//static files
app.use(express.static(path.join(__dirname, "public")));


//routes
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use(usersRoutes)
app.use(notesRoutes)


export default app;