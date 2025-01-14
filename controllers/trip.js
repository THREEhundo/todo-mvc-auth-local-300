const Trip = require('../models/trip')
const User = require('../models/User')

module.exports = {
	dashboard: async (req, res) => {
		try {
			let allUserTrips = await Trip.find({
				userId: req.user._id,
			})
			let user = await User.findOne({
				_id: req.user._id,
			})
			res.render('dashboard', {
				allUserTrips,
				user,
			})
		} catch (err) {
			console.log(err)
		}
	},

	createTrip: async (req, res) => {
		try {
			console.log(req.user._id)
			res.render('createTrip')
		} catch (err) {
			console.log(err)
		}
	},

	createPostTrip: async (req, res) => {
		try {
			await Trip.create({
				tripTitle: req.body.tripTitle,
				option1: req.body.option1,
				option2: req.body.option2,
				option3: req.body.option3,
				dateFrom: req.body.dateFrom,
				dateTo: req.body.dateTo,
				tripMembers: req.body.tripMembers,
				userId: req.user._id,
			})
			console.log('Trip created')
			res.redirect('dashboard')
		} catch (err) {
			console.log(err)
			res.render('error/500')
		}
	},

	edit: async (req, res) => {
		try {
			const trip = await Trip.findOne({
				_id: req.params.id,
			})
			const formatDateFrom = trip.dateFrom.toLocaleDateString()
			const formatDateTo = trip.dateTo.toLocaleDateString()
			if (!trip) return res.render('error/404')

			if (req.user.id != trip.userId) {
				res.redirect('dashboard', trip)
			} else {
				console.log(trip)
				res.render('edit', {
					trip,
					formatDateFrom,
					formatDateTo,
				})
			}
		} catch (err) {
			console.log(err)
		}
	},

	editPut: async (req, res) => {
		try {
			let trip = await Trip.findById(req.params.id)

			if (!trip) return res.render('error/404')

			if (req.user.id != trip.userId) {
				res.redirect('dashboard')
			} else {
				let params = {}

				for (let prop in req.body)
					if (req.body[prop]) params[prop] = req.body[prop]

				trip = await Trip.findOneAndUpdate({ _id: req.params.id }, params, {
					new: true,
					runValidators: true,
				})
			}

			res.redirect('dashboard')
		} catch (err) {
			console.log(err)
		}
	},
}
