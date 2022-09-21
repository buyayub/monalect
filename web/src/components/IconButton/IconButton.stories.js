import IconButton from './IconButton';
import { FiUser } from 'react-icons/fi';

export const primary = () => {
  return <IconButton />;
}

export const different = () => {
	return (
	<IconButton> 
		<FiUser />
	</IconButton>	
	);
}

export const secondary = () => {
	return (
	<IconButton className="mn-is-secondary"> 
		<FiUser />
	</IconButton>	
	);
}

export const danger = () => {
	return (
	<IconButton className="mn-is-danger"> 
		<FiUser />
	</IconButton>	
	);
}

export default { title: 'Components/IconButton' }
