const Tour = require('./../models/tourModel')

exports.createTour = async (req, res) => {
	try {

		const newTour = await Tour.create(req.body);
		res.status(201).json({
			status: 'success',
			data: {
				tour: newTour,
			},
		});
	} catch(err) {
		res.status(400).json({
			status: 'fail',
			message: err
		})
	}
};

exports.getAllTours = (req, res) => {
	console.log(req.requestTime);
	res.status(200).json({
		status: 'success',
		// results: tours.length,
		// data: {
		// 	tours,
		// },
		requestedAt: req.requestTime,
	});
};

exports.getTour = (req, res) => {
	console.log(req.params);

	const id = req.params.id * 1;

	// const tour = tours.find((el) => el.id === id);
	// if (!tour) {
	// 	res.status(404).json({
	// 		status: 'fail',
	// 		messase: 'Invalid Tour Id',
	// 	});
	// 	return;
	// }
	// res.status(200).json({
	// 	status: 'success',
	// 	data: {
	// 		tour,
	// 	},
	// });
};



exports.updateTour = (req, res) => {
	// if (req.params.id * 1 > tours.length) {
	// 	res.status(404).json({
	// 		status: 'fail',
	// 		message: 'Invalid tour Id',
	// 	});
	// }

	// res.status(200).json({
	// 	status: 'success',
	// 	data: {
	// 		tour: '<Updated tour here>',
	// 	},
	// });
};

exports.deleteTour = (req, res) => {
	// if (req.params.id * 1 > tours.length) {
	// 	res.status(404).json({
	// 		if (req.params.id * 1 > tours.length) {
	// 			// 	res.status(404).json({
	// 			// 		status: 'fail',
	// 			// 		message: 'Invalid tour Id',
	// 			// 	});
	// 			// }
			
	// 			// res.status(200).json({
	// 			// 	status: 'success',
	// 			// 	data: {
	// 			// 		tour: '<Updated tour here>',
	// 			// 	},
	// 			// });	status: 'fail',
	// 		message: 'Invalid tour Id',
	// 	});
	// }

	// res.status(204).json({
	// 	status: 'success',
	// 	data: null,
	// });
};
