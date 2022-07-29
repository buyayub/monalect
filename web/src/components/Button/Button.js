const Button = ({children, className, onClick=null, type="button"}) => {
  return (
	  <button className={"mn-c-button " + className} onClick={onClick} type={type}>
		  {children}
	  </button>
  )
}

export default Button
