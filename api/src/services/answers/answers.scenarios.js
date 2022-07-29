export const standard = defineScenario({
  answer: {
    one: {
      data: {
        answer: 'String',
        question: { create: { question: 'String', multiple: true } },
      },
    },

    two: {
      data: {
        answer: 'String',
        question: { create: { question: 'String', multiple: true } },
      },
    },
  },
})
