export const somethingAsync = textObj => {
	return async (dispatch, getState, { getFirebase, getFirestore }) => {
		//make async call to database
		try {
			// ger oss en referens till vår firestore-db
			const firestore = getFirestore();
			await firestore.collection('todotexter').add({
				...textObj,
				authorFirstName: 'bomull',
				authorLastName: 'ninja',
				authorId: 123456,
				createdAt: new Date()
			});
			dispatch({ type: 'SOMETHING_ASYNC', payload: textObj });
		} catch (err) {
			dispatch({ type: 'SOMETHING_ASYNC_ERROR', err });
		}
		// ger oss en referens till vår firestore-db
		// .catch(err => {
		// firestore
		// 	.collection('todotexter')
		// 	.add({
		// 		...textObj,
		// 		authorFirstName: 'bomull',
		// 		authorLastName: 'ninja',
		// 		authorId: 123456,
		// 		createdAt: new Date()
		// 	})
		// 	.then(() => {
		// 		dispatch({ type: 'SOMETHING_ASYNC', payload: textObj });
		// 	})
		// 	.catch(err => {
		// 		dispatch({ type: 'SOMETHING_ASYNC_ERROR', err });
		// 	});
	};
};
