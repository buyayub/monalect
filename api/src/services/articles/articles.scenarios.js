export const standard = defineScenario({
  article: {
    one: {
      data: {
        uploaded: true,
        course: {
          create: {
            title: 'String',
            user: {
              create: {
                email: 'String4132509',
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
        course: {
          create: {
            title: 'String',
            user: {
              create: {
                email: 'String8550703',
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
