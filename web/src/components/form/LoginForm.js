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
	  <form className={"mn-flex-column mn-gap-medium mn-form-width-medium mn-align-center mn-c-card  mn-is-red " + className} onSubmit={handleSubmit}>
		  <div className="mn-flex-column mn-gap-small">
		  <TextInput className="mn-is-column" label="Email:" name="username"/>
		  <TextInput className="mn-is-column" label="Password:" type="password" name="password"/>
		  </div>
		  <div className="mn-flex-row mn-gap-small">
			  <Button className="mn-is-secondary mn-is-small" onClick={cancel}> Cancel </Button>
			  <Button className="mn-is-small mn-is-highlight" type="submit" > Login </Button>
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
