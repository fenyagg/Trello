
export const START_TASK_LOADING = 'START_TASK_LOADING';
export const SUCCESS_TASK_LOADING = 'SUCCESS_TASK_LOADING';

export const startTaskLoading = () => {
	return {
		type: START_TASK_LOADING
	}
};

export const successTaskLoading = (tasks) => {
	return {
		type: SUCCESS_TASK_LOADING
	}
};