export function getQuestions(success, error) {
  success([
    {
      id: 0,
      title: "How are you feeling?",
      responses: [
        {
          value: 0,
          text: "Good"
        },
        {
          value: 1,
          text: "Okay"
        },
        {
          value: 2,
          text: "Bad"
        }
      ]
    },
    {
      id: 1,
      title: "How are you sleeping at night?",
      responses: [
        {
          value: 0,
          text: "Good"
        },
        {
          value: 1,
          text: "Okay"
        },
        {
          value: 2,
          text: "Bad"
        }
      ]
    },
    {
      id: 2,
      title: "Are you worried right now?",
      responses: [
        {
          value: 0,
          text: "Yes"
        },
        {
          value: 1,
          text: "No"
        }
      ]
    }
  ]);
}
