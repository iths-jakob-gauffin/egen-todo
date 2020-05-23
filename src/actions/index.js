export const updateNumbers = () => {
	return {
		type: 'UPDATE_NUMBERS',
		payload: 'sajkidnak'
	};
};

export const saveText = targetObj => {
	console.log('OUTPUT ÄR: saveText -> targetObj', targetObj);
	let obj = {
		type: 'UPDATE_TEXT',
		payload: targetObj
	};
	console.log(obj);

	return {
		type: 'UPDATE_TEXT',
		payload: targetObj
	};
};
