/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
// import { Configuration, OpenAIApi } from 'openai-edge';
// import { OpenAIStream, StreamingTextResponse } from 'ai';
import axios from 'axios';
import { NextResponse } from 'next/server'

export async function POST(req) {
  // 確認從請求中獲取內容的方式
  const { context } = await req.json();
  console.log(context);
  
  const headers = {
    'Authorization': 'Bearer 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',
    'Content-Type': 'application/json',
  };

  const data = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role:'system',
        content:"你現在一個笑話大師，我要你針對我講的內容講笑話" 

      },
      {
        role: 'user',
        content: context,
      },
    ],
    
    temperature: 1,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  };

  try {
    // 使用axios發送POST請求
    const response = await axios.post('https://api.openai.com/v1/chat/completions', data, { headers });
    console.log(response.data.choices[0].message.content);
    return  NextResponse.json({ content: response.data.choices[0].message.content })
  } 
  catch (error) {
    console.error('Error when communicating with OpenAI:', error);
    throw error; // or return some custom error response
  }
}
