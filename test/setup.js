import jsdom from 'jsdom';
import setupAxios from '../src/scripts/shared/config/axios.setup';

if (typeof document === 'undefined') {
	global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
	global.window = document.defaultView;
	global.navigator = global.window.navigator;
}

setupAxios();