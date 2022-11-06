import {FiPlus} from 'react-icons/fi';
import { IconButton } from 'src/components';
  
const LearningMaterialAdd = ({onClick, label="Add Material", className=""}) => {
  return (
    <div className={"mn-flex-row mn-align-center mn-gap-medium mn-clickable " + className} onClick={onClick}>
	    <IconButton className="mn-is-secondary mn-icon-medium">
		    <FiPlus />
	    </IconButton>
		<h3 className="mn-text-blue">{label}</h3>
    </div>
  )
}

export default LearningMaterialAdd
