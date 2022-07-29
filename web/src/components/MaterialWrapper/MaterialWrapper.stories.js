import MaterialWrapper from './MaterialWrapper'

const items = [	
	{
		id: 1,
		type: "textbook",
		title: "Proof of Mathematics",
		pages: 315,
		sections: [
			{
				title: "Introduction",
				start: 1,
				end: 16
			},
			{
				title: "Set Theory",
				start: 42,
				end: 62 
			}
		]
	},
	{
		id: 2,
		type: "article",
		title: "Summation",
		pages: 14,
	}
]

export const generated = () => {
  return <MaterialWrapper materials={items}/>
}

export default { title: 'Components/MaterialWrapper' }
