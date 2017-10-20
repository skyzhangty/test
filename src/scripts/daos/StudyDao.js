import AbstractDao from './AbstractDao';

export default class extends AbstractDao {
	static get(constraints) {
		return this.ajax({
			url: '/backend/secure/staff/studies',
			payload: constraints
		});
	}
}
