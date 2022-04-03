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

exports.getAllTours = async (req, res) => {
	try {
	const queryObj = {...req.query}
	const excludedFields = ['page', 'sort', 'limit', 'fields'];
	excludedFields.forEach(el => delete queryObj[el]);

	// 2) Advanced Filtering
	let queryStr = JSON.stringify(queryObj);
	queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
	console.log(JSON.parse(queryStr));
	
	let query = Tour.find(JSON.parse(queryStr));
	
	//3) Sorting
	if (req.query.sort) {
		const sortBy = req.query.sort.split(',').join(' ')
		console.log(sortBy);
		query = query.sort(sortBy);
		// sort('price ratings/average);
	} else {
		query = query.sort('-createdAt');
	}

	//4) Field Limiting.
	if (req.query.fields) {
		const fields = req.query.fields.split(',').join(' ');
		query = query.select(fields);
	} else {
		query = query.select('-__v')
	}

	//5) Pagination 
	// page=2&limit=10 - 1-10 page1 , 11-20 page2
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 100;
	const skip = limit * (page-1);

	query = query.skip(skip).limit(limit);

	if (skip >= numTours) throw new Error('This page does not exist');

	
	// const tours = await Tour.find()
	// .where('duration')
	// .equals(5)
	// .where('difficulty')
	// .equals('easy');

	// EXECUTE QUERY
	const tours = await query;

	res.status(200).json({
		status: 'success',
		results: tours.length,
		data: {
			tours,
		},
		});
	}catch(err) {
		res.status(404).json({
			status: 'fail',
			message: 'Error occurred'
		})	
	}
};

exports.getTour = async(req, res) => {
	try{
		const tour = await Tour.findById(req.params.id);
		// Tour.findOne({_id: req.params.id})
		res.status(200).json({
			status: 'success',
			data: {
				tour,
			},
		});
	}catch(err) {
		res.status(404).json({
			status: 'fail',
			message: 'Error occurred'
		});
	}
};

exports.updateTour = async(req, res) => {
	try {

		const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});

		res.status(200).json({
			status: 'success',
			data: {
				tour,
			}
		})
	} catch(err) {
		res.status(404).json({
			status: 'fail',
			message: 'Error occurred'
		});
	}
};

exports.deleteTour = async (req, res) => {
	try{
		await Tour.findByIdAndDelete(req.params.id);
		res.status(204).json({
			status: 'success'
		});
	}catch( err) {
		res.status(404).json({
			status: 'fail',
			message: 'Error occurred'
		});
	}	
};
