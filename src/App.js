import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useEffect, useState } from 'react'
import "./App.css"
import * as yup from "yup"

const initialValues = {
	username: "",
	email: "",
	language: ""
}

const validationSchema = yup.object({
	username: yup.string().required().min(4).max(12),
	email: yup.string().required().email(),
	language: yup.string().required()
})

export default function App() {
	const [data, setData] = useState([])

	const handleSubmit = (value, action) => {
		action.resetForm()
	  setData([...data, value])
	}
	const handleClick = (index) => {
		setData(data.filter((_, i) => i !== index))
	}

	useEffect(() => {
		const savedData = localStorage.getItem('formData');
		if (savedData) {
			setData(JSON.parse(savedData));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('formData', JSON.stringify(data));
	}, [data]);
  return (
	<div className='conteiner'>
		<Formik 
		initialValues={initialValues}
		onSubmit={handleSubmit}
		validateOnBlur= {false}
		validateOnChange={false}
		validationSchema={validationSchema}
		>
			<Form className='form'>
				<div className='field-div'>
					<label htmlFor='username'>Username</label>
					<Field className="text-email" type="text" name="username" id="username"/>
					<ErrorMessage name='username' component="p"/>
				</div>
				<div className='field-div'>
					<label htmlFor='email'>Email</label>
					<Field className="text-email" type="email" name="email" id="email"/>
					<ErrorMessage component="p" name='email'/>
				</div>
				<div className='field-div'>
					  <label htmlFor='language'>Language</label>
					<Field className="select" as="select" name='language'>
						<option selected disabled></option>
						<option name="html">HTML5</option>
						<option name="css">CSS3</option>
						<option name="javascript">JavaScript</option>
						<option name="reactjs">Reactjs</option>
						<option name="python">Python</option>
					</Field>
				</div>
				<input className='submit' value="Submit" type='submit' name='submit'/>
			</Form>
		</Formik>
		<div className='map-div'>
			{data.map((elem, index) => {
				return(
					<div key={index} className='div-index'>
						<span className='span-map' onClick={() => handleClick(index)}>X</span>
						<h2>{elem.username}</h2>
						<h2>{elem.email}</h2>
						<h2>{elem.language}</h2>
					</div>
				)
			})}
		</div>
	</div>
  )
}
