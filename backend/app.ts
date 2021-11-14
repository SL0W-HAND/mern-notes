import express from 'express';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import morgan from 'morgan';
import cors from 'cors';
import { connect, connection } from 'mongoose';

import config from './config/config';
import genSecret from './helpers/genSecret';
import './config/passport';

//import routes
import usersRoutes from './routes/users';
import notesRoutes from './routes/notes';

//initializations
const app = express();

//conect to db
try {
	//error handling
	connect('mongodb://localhost:27017/notes1');
	/*
	if (connection.readyState !== 1) {
		throw new Error(`Failed to connect to server: ${config.databaseUrl} `);
	}
	*/
	console.log('connected to database:', connection.name);
} catch (error) {
	console.log('error connecting to mongodb');
	console.log(error);
	process.exit(1);
}

//settings
app.set('port', config.port);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(
	session({
		secret: genSecret(),
		resave: true,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use(usersRoutes);
app.use(notesRoutes);
app.get('/', (req, res) => {
	res.send('Hello World');
});

export default app;
