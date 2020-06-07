const initState = [];

const updateTodoReducer = (todoArr = initState, action) => {
	console.log('OUTPUT ÄR: updateTodoReducer -> todoArr', todoArr);
	console.log('OUTPUT ÄR: updateTodoReducer -> action', action);
	if (action.type === 'UPDATE_TEXT') {
		if (todoArr.find(todo => todo.todoId === action.payload.todoId)) {
			let allTodosExceptTodoToBeUpdated = todoArr.filter(
				obj => obj.todoId !== action.payload.todoId
			);
			console.log(
				'OUTPUT ÄR: updateTodoReducer -> allTodosExceptTodoToBeUpdated',
				allTodosExceptTodoToBeUpdated
			);
			return [ ...allTodosExceptTodoToBeUpdated, action.payload ];
		}
		return [ ...todoArr, action.payload ];
	}
	if (action.type === 'NEW_TODO') {
		return [ ...todoArr, action.payload ];
	}
	return todoArr;
};

export default updateTodoReducer;
