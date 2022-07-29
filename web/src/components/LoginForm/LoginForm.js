import TextInput from 'src/components/TextInput';
import Button from 'src/components/Button';
import { routes, Link } from '@redwoodjs/router'
import { useState } from 'react';
import { useAuth } from '@redwoodjs/auth'

const LoginForm = ({
	className = "",
	cancel = null
}) => {
	const {isAuthenticated, logIn} = useAuth();

	let handleSubmit = async (e) => {
		e.preventDefault()
		console.log(e.target[0].value);
		console.log(e.target[1].value);
		const response = await logIn({
			username: e.target[0].value,
			password: e.target[1].value
		});
		console.log(response);
	}

  return (
	  <form className={"mn-c-login-form " + className} onSubmit={handleSubmit}>
		  <TextInput label="Email:" name="username"/>
		  <TextInput label="Password:" type="password" name="password"/>
		  <div className="buttons">
			  <Button className="mn-is-small" type="submit" > Login </Button>
			  <Button className="mn-is-secondary mn-is-small" onClick={cancel}> Cancel </Button>
		  </div>
		  <Button className="mn-is-tertiary">
			  <Link to={routes.register()}> 
				  Register 
			  </Link>
		</Button>
	  </form>
  )
}

export default LoginForm
