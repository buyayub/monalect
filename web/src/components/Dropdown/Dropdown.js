import {FiChevronDown} from 'react-icons/fi';

const Dropdown = ({
	name,
	label = null,
	items,
	id,
	className,
	selected,
	onChange
}) => {
  return (
    <div className={"mn-c-dropdown " + className}>
	    {label != null ? <label htmlFor={name}>{label}</label> : ""}
	    <select name={name} id={id} onChange={onChange} defaultValue={selected}>
		    {
			items.map((item, i) => {
		    		return <option 	value={item.value} 
						key={i}
					> 
		    				{item.title} 
					</option>
		    	})
		    }
	    </select>
    </div>
  )
}

export default Dropdown
