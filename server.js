const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({path: './config.env'});

const app = require('./app');
console.log(process.env);
const port = process.env.PORT || 3000;

const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
}).then(con => {
	console.log(con.connections);
	console.log('DB connection successful');
})




app.listen(port, () => {
	console.log(`App running on the port ${port}...`);
});