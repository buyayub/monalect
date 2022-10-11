const Logo = () => {
	const thickness = 17.5
	const sideHeight = 80
	const radius = thickness * 1.5
	const centerX = radius + thickness / 2
	const sideY = (100 - sideHeight) / 2
	const top = 2.5 
	const correction = 3
	const heightdiff = 50 - (radius - thickness / 2) - top - correction
	const bottomY = 50 + (radius - thickness / 2) + correction
	return (
		<svg viewBox="0 0 100 100" height="100%" width="100%">
			<rect width={thickness} height={sideHeight} y={sideY} />
			<circle
				cx={centerX}
				cy="50"
				r={radius}
				stroke="black"
				stroke-width={thickness}
				fill="none"
			/>
			<circle cx={centerX} cy="50" r={thickness / 2} />
			<rect width={thickness} height={sideHeight} y={sideY} x={radius * 2} />
			<rect
				x={centerX - thickness / 2}
				y={top}
				height={heightdiff}
				width={thickness}
			/>
			<rect
				x={centerX - thickness / 2}
				y={bottomY}
				height={heightdiff}
				width={thickness}
			/>
		</svg>
	)
}

export default Logo
