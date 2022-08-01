export const standard = defineScenario({
	lesson: {
		one: {
			data: {
				user: {
					create: {
						email: 'String1400857',
						hashedPassword: 'String',
						salt: 'String',
					},
				},

				course: {
					create: {
						title: 'String',
						user: {
							create: {
								email: 'String6195449',
								hashedPassword: 'String',
								salt: 'String',
							},
						},
					},
				},
			},
		},

		two: {
			data: {
				user: {
					create: {
						email: 'String551368',
						hashedPassword: 'String',
						salt: 'String',
					},
				},

				course: {
					create: {
						title: 'String',
						user: {
							create: {
								email: 'String653408',
								hashedPassword: 'String',
								salt: 'String',
							},
						},
					},
				},
			},
		},
	},
})
