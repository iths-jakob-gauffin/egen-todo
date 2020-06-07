export const updateNumbers = () => {
	return {
		type: 'UPDATE_NUMBERS',
		payload: 'sajkidnak'
	};
};

export const saveText = todoObj => {
	console.log('OUTPUT ÄR: saveText -> targetObj', todoObj);
	return {
		type: 'UPDATE_TEXT',
		payload: todoObj
	};
};

export const newTodoAC = todoId => {
	console.log('newTodoAC körs');

	return {
		type: 'NEW_TODO',
		payload: { title: '', text: '', todoId: todoId }
	};
};
