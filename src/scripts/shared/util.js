import _ from 'lodash';

/**
 * @return {string}
 */
function Util() {
	this.redirect = (url, openInNewWindow) => {
		if (url) {
			if (openInNewWindow) {
				window.open(url);
			} else {
				window.location.href = url;
			}
		} else {
			throw new Error('No url specified for redirect');
		}
	};

	/**
     * formats a message by replacing {\n} placeholders with array values, in order.
     * @param message - the message to be formatted
     * @param values - the array of values to be injected into message
     * @returns {modified message}
     */
	this.format = (message,values) => {
		let formatedMessage = message;
		if (formatedMessage) {
			if (values && values.length > 0) {
				for (let index=0;index<values.length;index+=1) {
					const value = values[index];
					formatedMessage = formatedMessage.split(`{${index}}`).join(value);
				}
			}
		} else {
			throw new Error('Please specify message to be formatted');
		}

		return formatedMessage;
	};

	/**
     * formats a number by adding commas. e.g. 10000 -> 10,000
     * @param number - the unformatted number without commas
     * @returns {formatted number with commas}
     */
	this.numberWithCommas = (number)  => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	/**
     * returns a random integer between min (included) and max (excluded)
     * @param min - the minimum range (included)
     * @param max - the maximum range (excluded)
     * @returns {random number in range [min, max)}
     */
	this.randomInt = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);

	this.formatDate = (date) => {
		if (date !== null) {
			const monthIndex = date.getUTCMonth();
			const monthNames = [
				'January', 'February', 'March',
				'April', 'May', 'June', 'July',
				'August', 'September', 'October',
				'November', 'December'
			];
			const month = monthNames[monthIndex];
			const day = date.getUTCDate();
			const year = date.getUTCFullYear();
			return `${month   } ${  day }, ${  year}`;
		} 
		return null;
		
	};

	this.setGlobalVar = (variableName,value) => {
		window.UMCS = window.UMCS?window.UMCS:{};
		window.UMCS[variableName] = value;
	};

	this.getGlobalVar = (variableName) => window.UMCS[variableName];

	this.getLoggedInUserId = () => {
		const loggedInUser = this.getGlobalVar('authDetails').loggedInUser;
		if (loggedInUser) {
			return loggedInUser.userId;
		} 
		return undefined;
		
	};

	this.getLoggedInUserRoles = () => {
		const loggedInUser = this.getGlobalVar('authDetails').loggedInUser;
		if (loggedInUser) {
			return loggedInUser.roles;
		}
		return undefined;
	};

	/*
     * @description Extracts a query string parameter/variable's value from an url encoded query string.
     * @see Courtesy of http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript#answer-2480180
     * @function getUrlParam
     * @param {string} param - The name of the query string parameter to extract.
     * @url {string} url - The Url from which query string parameter will be extracted
     * @returns {string} - The query string parameter value. (url decoded)
     */
	this.getUrlParam = (param, url) => {
		let newUrl = url;
		if (!newUrl) {
			newUrl = window.location.href;
		}
		const results = new RegExp(`[\\?&]${  param  }=([^&#]*)`).exec(newUrl);
		if (!results) {
			return undefined;
		}
		return decodeURIComponent(results[1]) || undefined;
	};

	/**
     * util.setUrlParam(page, 2, 'https://umcs.org/index.html#study-results?gender=100&page=1')
     * returns gender=100&page=2
     *
     * util.setUrlParam(page-size, 2, 'https://umcs.org/index.html#study-results?gender=100')
     * returns gender=100&page-size=2
     */
	this.setUrlParam = (param, paramVal, url) => {
		let newUrl = url;
		if (!newUrl) {
			newUrl = window.location.href;
		}
		let newAdditionalURL = '';
		let tempArray = newUrl.split('?');
		const additionalURL = tempArray[1];
		let temp = '';
		if (additionalURL) {
			tempArray = additionalURL.split('&');
			for (let i=0; i<tempArray.length; i+=1){
				if(tempArray[i].split('=')[0] !== param){
					newAdditionalURL += temp + tempArray[i];
					temp = '&';
				}
			}
		}

		const rowsTxt = `${temp  }${  param  }=${  paramVal}`;
		return newAdditionalURL + rowsTxt;
	};

	this.removeParamFromQuery = (parameter, query) => {

		const prefix= `${encodeURIComponent(parameter)}=`;
		const pars= query.split(/[&;]/g);
		// reverse iteration as may be destructive
		for (let i = pars.length; i --> 0;) {
			if (pars[i].lastIndexOf(prefix, 0) !== -1) {
				pars.splice(i, 1);
			}
		}

		return (pars.length > 0 ? pars.join('&') : '');

	};

	this.aggregateArrayValues = (array) => {
		const aggregatedArray = [];
		array.forEach((element) => {
			const existingAnswer = _.find(aggregatedArray, {name: element.name});
			if (existingAnswer) {
				if (existingAnswer.value.constructor === Array) {
					existingAnswer.value.push(element.value);
				} else {
					existingAnswer.value = [existingAnswer.value, element.value];
				}
			} else {
				aggregatedArray.push(element);
			}
		});
		return aggregatedArray;
	};

	this.isAndroid = () => (navigator.userAgent.toLowerCase().indexOf('android') > -1);
}

Util.prototype.collectFromTo = function collectFromTo(a, b, c = x => x) {
	const l = [];
	for (let i = a; i <= b; i++) {
		l.push(c(i));
	}
	return l;
};

Util.prototype.bindToMe = function bindToMe(me, ...args) {
	args.forEach(arg => me[arg] = me[arg].bind(me));
};


export default new Util();
