import React, { useEffect, useState } from "react";
import OpenAI from "openai";
const generateAI = (props) => {
  const {input}=props
  const openai = new OpenAI({
    apiKey: 'sk-bcIta3RH1pbT-3gI3paTOL-a9kJOBvvFG7V2c20XqAT3BlbkFJLmXPW-OAbndQnn5B8kya3ae4aY6AVLRu0E59rpdCcA',
    organization: "org-vLDbTnoXHQHu7bgkVTWTfr2P",
    project: "proj_7arKzumGh222PLgK03D3WatQ",
    dangerouslyAllowBrowser: true
  });
  async function main() {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: input }],
      model: "gpt-4o",
    });

    console.log('CHAT GPT:', completion?.choices[0]?.message?.content);
    return (
       {all:completion?.choices,
        options:completion?.choices[0]?.message?.content
      }
    )
  }
return (main())


};

export default generateAI;