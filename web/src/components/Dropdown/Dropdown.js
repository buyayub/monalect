const Dropdown = ({
	name,
	label = null,
	items,
	id,
	icon=null,
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
	    <div className="icon">{icon}</div>
	    <div className="breadcrumb-bg" />
	    <div className="breadcrumb" />
    </div>
  )
}

export default Dropdown
