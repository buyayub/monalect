export const standard = defineScenario({
	articleOnLesson: {
		one: {
			data: {
				lesson: {
					create: {
						user: {
							create: {
								email: 'String6859981',
								hashedPassword: 'String',
								salt: 'String',
							},
						},

						course: {
							create: {
								title: 'String',
								user: {
									create: {
										email: 'String95997',
										hashedPassword: 'String',
										salt: 'String',
									},
								},
							},
						},
					},
				},

				article: {
					create: {
						uploaded: true,
						user: {
							create: {
								email: 'String7671783',
								hashedPassword: 'String',
								salt: 'String',
							},
						},

						course: {
							create: {
								title: 'String',
								user: {
									create: {
										email: 'String8741914',
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
				lesson: {
					create: {
						user: {
							create: {
								email: 'String1615310',
								hashedPassword: 'String',
								salt: 'String',
							},
						},

						course: {
							create: {
								title: 'String',
								user: {
									create: {
										email: 'String8190900',
										hashedPassword: 'String',
										salt: 'String',
									},
								},
							},
						},
					},
				},

				article: {
					create: {
						uploaded: true,
						user: {
							create: {
								email: 'String1333480',
								hashedPassword: 'String',
								salt: 'String',
							},
						},

						course: {
							create: {
								title: 'String',
								user: {
									create: {
										email: 'String6307397',
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
