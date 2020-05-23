const initState = {};

const toFirebaseReducer = (state = initState, action) => {
	switch (action.type) {
		case 'SOMETHING_ASYNC':
			console.log(action);
			console.log(action.payload);
			return state;
		case 'SOMETHING_ASYNC_ERROR':
			console.log('something async error', action.err);
			return state;
		default:
			return state;
	}
};

export default toFirebaseReducer;
