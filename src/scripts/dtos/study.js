import PropTypes from 'prop-types';

export default PropTypes.shape({
	irbNum: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	piFirstName: PropTypes.string.isRequired,
	piMiddleName: PropTypes.string.isRequired,
	piLastName: PropTypes.string.isRequired,
	newVolunteers: PropTypes.number.isRequired,
	newMessages: PropTypes.number.isRequired,
	recommendations: PropTypes.number.isRequired,
	active: PropTypes.bool.isRequired,
	archived: PropTypes.bool.isRequired,
});

