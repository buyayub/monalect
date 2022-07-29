export const standard = defineScenario({
  textbook: {
    one: {
      data: {
        course: {
          create: {
            title: 'String',
            user: {
              create: {
                email: 'String5977364',
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
        course: {
          create: {
            title: 'String',
            user: {
              create: {
                email: 'String2633772',
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
