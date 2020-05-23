const initState = [];

const updateTodoReducer = (todoArr = initState, action) => {
	if (action.type === 'UPDATE_TEXT') {
		if (todoArr.find(todo => todo.todoId === action.payload.todoId)) {
			let allTodosExceptTheTodoWithTheSameIdThatHasToBeUpdated = todoArr.filter(
				obj => obj.todoId !== action.payload.todoId
			);
			return [
				...allTodosExceptTheTodoWithTheSameIdThatHasToBeUpdated,
				action.payload
			];
		}
		return [ ...todoArr, action.payload ];
	}
	return todoArr;
};

export default updateTodoReducer;
