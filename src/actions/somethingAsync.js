export const somethingAsync = textObj => {
	// console.log('OUTPUT ÄR: textObj', textObj);
	return async (dispatch, getState, { getFirebase, getFirestore }) => {
		// make async call to database
		try {
			// ger oss en referens till vår firestore-db
			const firestore = getFirestore();
			const timestamp = firestore.FieldValue.serverTimestamp();
			console.log('OUTPUT ÄR: timestamp', timestamp);
			let textObjWithTimeStamp = {
				...textObj,
				createdAt: timestamp
			};

			await firestore
				.collection('todotexter')
				.add(textObjWithTimeStamp);
			// let idFromFirestore = await firestore
			// 	.collection('todotexter')
			// 	// .doc()
			// 	// .set(newStuff)
			// 	.get();
			// // .add({ ...textObj, createdAt: timestamp });

			// idFromFirestore.forEach(el =>
			// 	console.log('ELELELELEL', el.data(), el.id, el)
			// );
			// let test = await firestore.collection('todotexter').get();
			// console.log('OUTPUT ÄR: test', test);
			// test.forEach(to => {
			// 	console.log('UTLOOPAD', to.data());
			// });

			dispatch({
				type: 'SOMETHING_ASYNC',
				payload: textObjWithTimeStamp
			});
		} catch (err) {
			dispatch({ type: 'SOMETHING_ASYNC_ERROR', err });
		}
	};
};
