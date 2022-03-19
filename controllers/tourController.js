const fs = require('fs');

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkBody = (req, res, next) => {
	if(!req.body.name || !req.body.price) {
		return res.status(400).json({
			status: 'fail',
			message: 'Missing name or price'
		})
	}
}
exports.getAllTours = (req, res) => {
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

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
