const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const app = express();

//MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());
app.use((req, res, next) => {
	console.log('Hello from the middleware');
	next();
});

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
	console.log(req.requestTime);
	res.status(200).json({
		status: 'success',
		results: tours.length,
		data: {
			tours,
		},
		requestedAt: req.requestTime,
	});
};

const getTour = (req, res) => {
	console.log(req.params);

	const id = req.params.id * 1;

	const tour = tours.find((el) => el.id === id);
	if (!tour) {
		res.status(404).json({
			status: 'fail',
			messase: 'Invalid Tour Id',
		});
		return;
	}
	res.status(200).json({
		status: 'success',
		data: {
			tour,
		},
	});
};

const createTour = (req, res) => {
	const newId = tours[tours.length - 1].id + 1;
	const newTour = Object.assign({ id: newId }, req.body);
	tours.push(newTour);
	fs.writeFile(
		`${__dirname}/dev-data/data/tours-simple.json`,
		JSON.stringify(tours),
		(err) => {
			res.status(201).json({
				status: 'success',
				data: {
					tour: newTour,
				},
			});
		}
	);
};

const updateTour = (req, res) => {
	if (req.params.id * 1 > tours.length) {
		res.status(404).json({
			status: 'fail',
			message: 'Invalid tour Id',
		});
	}

	res.status(200).json({
		status: 'success',
		data: {
			tour: '<Updated tour here>',
		},
	});
};

const deleteTour = (req, res) => {
	if (req.params.id * 1 > tours.length) {
		res.status(404).json({
			status: 'fail',
			message: 'Invalid tour Id',
		});
	}

	res.status(204).json({
		status: 'success',
		data: null,
	});
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//ROUTES

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
	.route('/api/v1/tours/:id')
	.get(getTour)
	.patch(updateTour)
	.delete(deleteTour);

const port = 3000;

app.listen(port, () => {
	console.log(`App running on the port ${port}...`);
});
