export default function asyncAction(loadingSlot, action) {
	return (dispatch, getState) => {
		const setLoading = x => dispatch({
			type: 'GENERIC',
			[loadingSlot]: x,
		});
		setLoading(true);
		const promise = action(dispatch, getState);
		return promise.then(
			() => setLoading(false),
			err => {
				setLoading(false);
				return Promise.reject(err);
			},
		);
	};
}
