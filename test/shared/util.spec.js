import util from '../../src/scripts/shared/util';

describe('Util Tests', () => {
	it('redirect - new window', () => {
		const newUrl = '/new/url';
		window.open = jasmine.createSpy();

		util.redirect(newUrl, true);

		expect( window.open ).toHaveBeenCalled();
	});

	it('redirect - no url specified, throws error', () => {
		expect( () => {util.redirect();}).toThrow(new Error('No url specified for redirect'));
	});

	it('format values exist', () => {
		const message = 'Your account has been locked for {0} minutes because of {1} failed login attempts. Try logging in again {0} minutes later';
		const expectedMessage = 'Your account has been locked for 5 minutes because of 10 failed login attempts. Try logging in again 5 minutes later';
		const values = [5, 10];
		const actualMessage = util.format(message, values);
		expect(actualMessage).toEqual(expectedMessage);
	});

	it('format no values exist for replacing', () => {
		const message = 'Hello World';
		const expectedMessage = 'Hello World';
		const values = [];
		const actualMessage = util.format(message, values);
		expect(actualMessage).toEqual(expectedMessage);
	});

	it('format no values arg', () => {
		const message = 'Hello World';
		const expectedMessage = 'Hello World';
		const actualMessage = util.format(message);
		expect(actualMessage).toEqual(expectedMessage);
	});

	it('format no message arg', () => {
		expect( () => {util.format();}).toThrow(new Error('Please specify message to be formatted'));
	});

	it('Test getLoggedInUserRoles', () => {
		const loggedInUser = {roles: ['STAFF']};
		spyOn(util, 'getGlobalVar').and.returnValue({loggedInUser});

		const actual = util.getLoggedInUserRoles();

		expect(actual).toEqual(['STAFF']);
	});

	it('Test getLoggedInUserId', () => {
		const userId = 1;
		const loggedInUser = {userId};
		spyOn(util, 'getGlobalVar').and.returnValue({loggedInUser});

		const actual = util.getLoggedInUserId();

		expect(actual).toBe(userId);
	});

	it('Test setUrlParam - with url provided', () => {
		const expected = 'gender=100&page=2';

		expect(util.setUrlParam('page', 2, 'https://umcs.org/index.html#study-results?gender=100')).toBe(expected);
	});

	it('Test removeParamFromQuery', () => {
		const expected = 'gender=100&page=2';

		expect(util.removeParamFromQuery('remove', `${expected}&remove=1`)).toBe(expected);
	});

	it ('numberWithCommas', () => {
		const number1 = 1000000;
		const number2 = 10000;
		const number3 = 1000;

		const formattedNumber1 = util.numberWithCommas(number1);
		const formattedNumber2 = util.numberWithCommas(number2);
		const formattedNumber3 = util.numberWithCommas(number3);

		expect(formattedNumber1).toEqual('1,000,000');
		expect(formattedNumber2).toEqual('10,000');
		expect(formattedNumber3).toEqual('1,000');
	});

});
