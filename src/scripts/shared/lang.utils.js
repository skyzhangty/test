
export const constFunc = x => () => x;

export function forEachOwnProperty(o, c) {
	Object.getOwnPropertyNames(o).forEach(p => {
		c(p, o[p]);
	});
}
