const initState = [];

const newTodoReducer = (state = initState, action) => {
	console.log('OUTPUT ÄR: newTodoReducer -> action', action);
	switch (action.type) {
		case 'NEW_TODO':
			return action.payload;
			break;

		default:
			return state;
	}
};

export default newTodoReducer;
