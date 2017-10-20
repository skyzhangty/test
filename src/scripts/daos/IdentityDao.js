import AbstractDao from './AbstractDao';

export default class IdentityDao extends AbstractDao {
	static get() {
		return this.ajax({
			url: '/backend/public/auth-details'
		});
	}

}