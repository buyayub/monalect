export const standard = defineScenario({
  choice: {
    one: {
      data: {
        choice: 'String',
        question: { create: { question: 'String', multiple: true } },
      },
    },

    two: {
      data: {
        choice: 'String',
        question: { create: { question: 'String', multiple: true } },
      },
    },
  },
})
