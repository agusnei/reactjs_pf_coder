import React, { useState } from 'react';
//Firebase firestore
import {db} from '../../Services/Firebase/FirebaseConfig'
import { collection, addDoc } from 'firebase/firestore';
import './Buy.css'
import MessageSuccess from '../MessageSuccess/MessageSuccess';
import TextField from '@mui/material/TextField';

const initialState = {
	name: '',
	email: '',
	phone: '',
};

const styles = {
	containerShop: {
		textAlign: 'center',
		paddingTop: 20,
	},
};

const Buy = () => {

	const [values, setValues] = useState(initialState);
	
	const [purchaseID, setPurchaseID] = useState('');

	const handleOnChange = (e) => {
		const { value, name } = e.target;
		setValues({ ...values, [name]: value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		console.log(values);
		if(values.name.length > 5 || values.phone.length > 8 || values.email.length > 8){
			const docRef = await addDoc(collection(db, 'purchases'), {
				values,
			});
			console.log('Document written with ID: ', docRef.id);
			setPurchaseID(docRef.id);
			setValues(initialState);
		} else {
			alert('Complete the form')
		}
	};

	return (
		<div style={styles.containerShop} >
			<h1>Complete the form</h1>
			<form className='FormContainer' onSubmit={onSubmit}>
				<TextField
					placeholder='Name'
					style={{ margin: 10, width: 400 }}
					value={values.name}
					name='name'
					onChange={handleOnChange}
					className='bgtx'
				/>
				<TextField
					placeholder='Email'
                    type='email'
					style={{ margin: 10, width: 400 }}
					value={values.email}
					name='email'
					onChange={handleOnChange}
					className='bgtx'
				/>
				<TextField
					placeholder='Phone'
                    type='number'
					style={{ margin: 10, width: 400 }}
					value={values.phone}
					name='phone'
					onChange={handleOnChange}
					className='bgtx'
				/>
					<button className='btnASendAction'>Confirm order</button>
			</form>
			{purchaseID && <MessageSuccess purchaseID={purchaseID} />}
		</div>
	);
};

export default Buy;