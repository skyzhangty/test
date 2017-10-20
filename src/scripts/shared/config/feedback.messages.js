module.exports = {
	'401-bad-credentials': {
		'type': 'error',
		'title': 'Invalid uniquename or password',
		'message': 'Sorry, that uniquename-password combination does not look correct.'
	},
	'save-lookup-value-success': {
		'type': 'info',
		'title': 'Success',
		'message': 'You have successfully saved a new lookup value'
	},
	'save-lookup-value-duplicate': {
		'type': 'error',
		'title': 'Fail',
		'message': 'You are trying to save an existing lookup value'
	},
	'delete-lookup-value-success': {
		'type': 'info',
		'title': 'Success',
		'message': 'You have successfully deleted a lookup value'
	},
	'delete-lookup-value-not-found': {
		'type': 'error',
		'title': 'Fail',
		'message': 'You trying to delete a lookup value that does not exist'
	}
};
