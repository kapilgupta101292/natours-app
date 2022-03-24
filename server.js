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


const tourSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'A tour must have a name'],
		unique: true
	},
	rating: {
		type: Number,
		default: 4.5
	},
	price: {
		type: Number,
		required: [true, 'A tour must have a price']
	},
})

const Tour = mongoose.model('Tour', tourSchema);

app.listen(port, () => {
	console.log(`App running on the port ${port}...`);
});