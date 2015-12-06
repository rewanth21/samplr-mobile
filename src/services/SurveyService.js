export function getQuestions(success, error) {
  success([
    {
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
