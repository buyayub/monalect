import {FiPlus} from 'react-icons/fi';
  
const LearningMaterialAdd = ({onClick, label="Add Section", className=""}) => {
  return (
    <div className={"mn-c-material-section-add " + className} onClick={onClick}>
	    <div class="icon">
		    <FiPlus />
	    </div>
	    <div class="title">
		    <p>{label}</p>
	    </div>
    </div>
  )
}

export default LearningMaterialAdd
