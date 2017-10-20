import _ from 'lodash';

export default function studyReducer(state = {}, action) {
	const newState = _.cloneDeep(state);

	let modelMap;
	switch (action.type) {
	case 'LOAD':
		modelMap = newState[action.modelType] = newState[action.modelType] || {};
		action.payload.forEach(m => modelMap[m.id] = m);
		return newState;
	case 'UNLOAD':
		modelMap = newState[action.modelType] = newState[action.modelType] || {};
		action.payload.forEach(m => delete modelMap[m.id]);
		return newState;
	default:
		return state;
	}
}

export function allOf(modelType, state) {
	const list = [];
	if (!state) return list;
	const modelMap = state[modelType];
	if (!modelMap) return list;
	Object.keys(modelMap).forEach(id => list.push(modelMap[id]));
	return list;
}
