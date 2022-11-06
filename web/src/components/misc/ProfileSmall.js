import { useAuth } from '@redwoodjs/auth';
import { Button } from 'src/components';

const ProfileSmall = ({className}) => {
	const {currentUser, logOut} = useAuth()
	
  return (
    <div className={className}>
	    <p>Hello, {currentUser.email}</p>
	    <Button className="mn-is-tertiary" onClick={logOut}> signout </Button>
    </div>
  )
}

export default ProfileSmall
