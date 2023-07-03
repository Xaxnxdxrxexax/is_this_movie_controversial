type Message = {
  content: string;
  role: string;
};

type Choices = {
  finish_reason: string;
  index: number;
  message: Message;
};

export type ChatGPT = {
  choices: Choices[];
  created: number;
  id: string;
  model: string;
  object: string;
  usage: {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
  };
};

export const chatGPTResponse: ChatGPT = {
  choices: [
    {
      finish_reason: "stop",
      index: 0,
      message: {
        content:
          "The 2020 World Series was played in Texas at Globe Life Field in Arlington.",
        role: "assistant",
      },
    },
  ],
  created: 1677664795,
  id: "chatcmpl-7QyqpwdfhqwajicIEznoc6Q47XAyW",
  model: "gpt-3.5-turbo-0613",
  object: "chat.completion",
  usage: {
    completion_tokens: 17,
    prompt_tokens: 57,
    total_tokens: 74,
  },
};
