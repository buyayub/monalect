export const standard = defineScenario({
	textbook: {
		one: {
			data: {
				user: {
					create: {
						email: 'String4242788',
						hashedPassword: 'String',
						salt: 'String',
					},
				},

				course: {
					create: {
						title: 'String',
						user: {
							create: {
								email: 'String7094785',
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
						email: 'String8216778',
						hashedPassword: 'String',
						salt: 'String',
					},
				},

				course: {
					create: {
						title: 'String',
						user: {
							create: {
								email: 'String2607422',
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
