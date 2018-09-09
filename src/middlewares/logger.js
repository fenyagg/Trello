
export const logger = store => next => action => {
	const result = next(action);

	console.log('logger', action);

	return result;
};