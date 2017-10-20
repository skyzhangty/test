import feedbackReducer from '../../src/scripts/reducers/feedback';

describe('Feedback Reducer', ()=> {
	it('initial state', ()=>{
		const newState = feedbackReducer(undefined, {});
		const expectedNewState = {};

		expect(newState).toEqual(expectedNewState);
	});

	it('SHOW_FEEDBACK state', ()=> {
		const newState = feedbackReducer(undefined, {type: 'SHOW_FEEDBACK', payload: {title: 'title', message: 'message'}});
		const expectedNewState = {title: 'title', message: 'message'};

		expect(newState).toEqual(expectedNewState);
	});
});