export const somethingAsync = textObj => {
	console.log('OUTPUT ÄR: textObj', textObj);
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
				createdAt: new Date(),
				title: 'Överskrift',
				text:
					'jaha det här var en jäkla massa text. Man ska liksom inte få plats med all den här texten. Frågar är hur man trunkatar den. Vilken typ av hof jag tar. Tror jag söker på stackoverflow och hittar nåt smidigt sätt.'
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
