import { FiBook, FiFileText, FiX} from 'react-icons/fi';
import IconButton from 'src/components/IconButton';

const MaterialSection = ({start=0, end=0, title="Untitled", className="", handleDelete}) => {
  return (
    <div className={"mn-c-material-section " + className}>
	    <div className="main">
		    <div className="icon">
			    <FiFileText />  
		    </div>
		    <div className="title">
			    <p> {title} </p>
			    <p className="mn-is-secondary">{start} - {end}</p>
		    </div>
	    </div>
	    
	    <IconButton className="mn-is-danger mn-is-small" onClick={handleDelete}> <FiX /> </IconButton>
    </div>
  )
}

export default MaterialSection
