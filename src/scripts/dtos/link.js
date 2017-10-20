import PropTypes from 'prop-types';

export default PropTypes.shape({
	pathname: PropTypes.string,
	search: PropTypes.string,
	hash: PropTypes.string,
	state: PropTypes.object
});
