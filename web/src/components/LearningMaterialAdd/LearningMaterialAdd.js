import {FiPlus} from 'react-icons/fi';
  
const LearningMaterialAdd = ({onClick, label="Add Material", className=""}) => {
  return (
    <div className={"mn-c-material-add " + className} onClick={onClick}>
	    <div className="icon">
		    <FiPlus />
	    </div>
	    <div className="title">
		    <p>{label}</p>
	    </div>
    </div>
  )
}

export default LearningMaterialAdd
