require('dotenv').config();

const config = {
	databaseUrl: process.env.DATABASE_URI || 'mongodb://localhost:27017/notes1',
	port: process.env.PORT || 3000,
};

export default config;
