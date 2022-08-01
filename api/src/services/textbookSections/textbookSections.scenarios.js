export const standard = defineScenario({
	textbookSection: {
		one: {
			data: {
				start: 5716564,
				end: 1673104,
				user: {
					create: {
						email: 'String4068165',
						hashedPassword: 'String',
						salt: 'String',
					},
				},

				textbook: {
					create: {
						user: {
							create: {
								email: 'String4316590',
								hashedPassword: 'String',
								salt: 'String',
							},
						},

						course: {
							create: {
								title: 'String',
								user: {
									create: {
										email: 'String9829585',
										hashedPassword: 'String',
										salt: 'String',
									},
								},
							},
						},
					},
				},
			},
		},

		two: {
			data: {
				start: 7786615,
				end: 7807496,
				user: {
					create: {
						email: 'String5347348',
						hashedPassword: 'String',
						salt: 'String',
					},
				},

				textbook: {
					create: {
						user: {
							create: {
								email: 'String8063188',
								hashedPassword: 'String',
								salt: 'String',
							},
						},

						course: {
							create: {
								title: 'String',
								user: {
									create: {
										email: 'String7888174',
										hashedPassword: 'String',
										salt: 'String',
									},
								},
							},
						},
					},
				},
			},
		},
	},
})
