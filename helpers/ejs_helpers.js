module.exports = {
	editIcon: function (userId, tripUserId, tripId) {
		if (userId._id.toString() == tripUserId.toString()) {
			return `<a href="edit/${tripId}">edit</a>`
		}
		return ''
	}
}
