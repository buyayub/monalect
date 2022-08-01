export const standard = defineScenario({
	article: {
		one: {
			data: {
				uploaded: true,
				user: {
					create: {
						email: 'String1907768',
						hashedPassword: 'String',
						salt: 'String',
					},
				},

				course: {
					create: {
						title: 'String',
						user: {
							create: {
								email: 'String8568924',
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
				uploaded: true,
				user: {
					create: {
						email: 'String2411480',
						hashedPassword: 'String',
						salt: 'String',
					},
				},

				course: {
					create: {
						title: 'String',
						user: {
							create: {
								email: 'String3484332',
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
