export const standard = defineScenario({
	test: {
		one: {
			data: {
				quiz: true,
				user: {
					create: {
						email: 'String16841',
						hashedPassword: 'String',
						salt: 'String',
					},
				},

				course: {
					create: {
						user: {
							create: {
								email: 'String6788639',
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
				quiz: true,
				user: {
					create: {
						email: 'String2961539',
						hashedPassword: 'String',
						salt: 'String',
					},
				},

				course: {
					create: {
						user: {
							create: {
								email: 'String6523126',
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
