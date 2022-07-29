export default function Modal({children, title, show=false, changeState}) {
	return (
		<div className={`mn-c-modal ${!show ? "mn-is-fadeout" : "mn-is-fadein"}`}>
			<div className="mn-c-modal-blocker" onClick={changeState}/>
			<div className="mn-c-modal-content">
				<h4 className="mn-c-modal-title">{title} </h4>
				{children}
			</div>
		</div>
	)
};
