/* eslint-disable no-console */
import {immutableEmbeddedSet} from '../shared/property.utils';

export default function (state = {}, action) {
	if (action.type === 'GENERIC') {
		const props = Object.getOwnPropertyNames(action);
		props.splice(props.indexOf('type'), 1);// 'type' is already used.
		return immutableEmbeddedSet(state, set => {
			for (let i = 0; i < props.length; i++) {
				const prop = props[i];
				const localProp = prop.substring('generic.'.length);
				set(localProp, action[prop]);
			}
		});
	}
	return state;
}
