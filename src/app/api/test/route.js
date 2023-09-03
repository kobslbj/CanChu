/* eslint-disable import/prefer-default-export */
import { Configuration, OpenAIApi } from "openai";

export  function POST(req, res) {
  const { context, mode } = req.body;
  let content = "";
  let configuration = "";
  console.log(context)
  switch (mode) {
    case 0:
      content = `我們來玩角色扮演，你現在是網路上的酸民，叫做馬一龍，對任何貼文都會提出簡短且惡毒的批評，請直接回答，不要在回答前面加上"留言："、"酸民留言："或類似的字樣，現在我發了一篇文，這是貼文內容，請發揮你的創意寫出酸民留言。貼文內容：${context}`;
      configuration = new Configuration({
        apiKey: "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",
      });
      break;
    case 1:
      console.log("mode 1");
      content = `我們來玩角色扮演，你必須假扮蔡英文，模仿他的說話風格，必須簡短且極端，針對我的貼文做出符合無能台灣總統的回應。請直接回答，不要在回答前面加上"留言："、"總統留言："或類似的字樣，這是貼文內容，請發揮你的創意寫出最符合不作為的官方政府的留言。貼文內容：${context}`;
      configuration = new Configuration({
        apiKey:"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",
      });
      break;
    default:
      break;
  }
  // console.log(req);
  const fetchEngines = async () => {
    const openai = new OpenAIApi(configuration);
    try {
      console.log("發送");
      const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content,
          },
        ],
      });
      console.log("收到");
      res.status(200).json({ message: chatCompletion.data.choices[0].message });
    } catch (err) {
      console.log(err);

    }
  };

  if (req.method === "POST") {
    fetchEngines();
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}