import {bindProps, fromState} from '../shared/redux.utils';
import IdentityDao from '../daos/IdentityDao';

export const IDENTITY = 'generic.identity';

export async function loadIdentity(dispatch, getState) {
	let {identity} = bindProps(getState, {
		identity: fromState(IDENTITY),
	});
	if (!identity) {
		identity = await IdentityDao.get();
		dispatch({
			type: 'GENERIC',
			[IDENTITY]: identity.loggedInUser,
		});
	}
}
