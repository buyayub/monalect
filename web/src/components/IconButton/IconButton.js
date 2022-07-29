const IconButton = ({
		children,
		className = "",
		onClick	= null,
	}) => {
  return (
	  <button onClick={onClick} className={"mn-c-icon-button " + className}>
		  {children}
	  </button>
  )
}

export default IconButton;
