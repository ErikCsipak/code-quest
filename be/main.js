
import OpenAI from 'openai';
import readline from 'readline';
import { readFileSync } from 'fs';


const openai = new OpenAI({
    //  apiKey: "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" // This is also the default, can be omitted
     apiKey: "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"
});



var cl = readline.createInterface( process.stdin, process.stdout );
var question = function(q) {
    return new Promise( (res, rej) => {
        cl.question( q, answer => {
            res(answer);
        })
    });
};


async function initAssistant() {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",

      messages: [
        { role: 'system', content: 'You are an assistant in a software engineering project who is really good at giving estimations for the new incoming issues.' },
        { role: 'user', content: `I will provide you a dataset of the existing Jira issues of the project.
                                  It will be in json format. I will give it to you in multiple chunks. Let's call the dataset "dataset A".`}
      ],
  });

  console.log("-------------------------------------- Init assistant done ---------------------------------------")

  return response.choices[0].message.content;
}

async function gptSendMessage(message) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    // messages: [{"role": "system", "content": "You are a helpful software engineering project assistant who is really good at giving estimations."},
    //     {"role": "user", "content": "How many tasks András has based on the dataset above?"},
    //   ],
      messages: [
        { role: 'user', content: message }
      ],
  });



  return response.choices[0].message.content;
}


async function gptSendJsonData(data) {
  const stringData = JSON.stringify(data);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
      messages: [
        { role: 'user', content: "Here is the nex portion of the dataset: " + stringData }
      ],
  });

  return response.choices[0].message.content;
}


async function startChat() {
  console.log("--------------- start chat -------------------------------");
  let consoleInput;
  while ( consoleInput != 'yes' ) {
    consoleInput = await question('User says >>>   ');
    let gptResponse = await gptSendMessage(consoleInput);
    console.log('API says >>>   ' + gptResponse);
  }

  // const response = await openai.chat.completions.create({
  //   model: "gpt-3.5-turbo",
  //   // messages: [{"role": "system", "content": "You are a helpful software engineering project assistant who is really good at giving estimations."},
  //   //     {"role": "user", "content": "How many tasks András has based on the dataset above?"},
  //   //   ],
  //     messages: [
  //     {"role": "user", "content": "ok in which format do yo want the dataset?"},
  //   ],
  // });
  
  // console.log(response.choices[0].message.content);
}

async function uploadData() {
  console.log("--------------- uploading data -------------------------------");

  const data = JSON.parse(readFileSync('resource-app-JIRA.json', 'utf8'));
  const chunkSize = 30;
  const chunkedData = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    chunkedData.push(chunk);
  }

  let response = await gptSendMessage("I start adding data now");
  console.log("API RESPONSE>>> ", response)

  response = await gptSendJsonData(chunkedData[0]);
  console.log("API RESPONSE>>> ", response)

  response = await gptSendMessage("That was the last chunk one. Dataset complete.");
  console.log("API RESPONSE>>> ", response)

}


async function main() {
  let response = await initAssistant();
  console.log("API RESPONSE>>> ", response)
  
  await uploadData();

  await startChat();
}


//main();


async function sendMessageToAssistant(message) {

  const threadId = 'thread_00PrqKJfnzSmcFRhBcpahQCf';
  await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: message,
  });

  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: 'asst_JBNdKzqlSBQOc9IsA0RmJq2h',
  });
  const runId = run.id;

  let timeElapsed = 0;
  let interval = 1000;
  let timeout = 20000;
  while (timeElapsed < timeout) {
    const run = await openai.beta.threads.runs.retrieve(threadId, runId);
    if (run.status === 'completed') {
      const messagesFromThread = await openai.beta.threads.messages.list(threadId);
      return messagesFromThread.data[0].content;
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
    timeElapsed += interval;
  }

  console.log("Timeout");
}

async function startAssistantChat() {
  console.log("--------------------- start chat -------------------------------");
  let consoleInput;
  while ( consoleInput != 'yes' ) {
    consoleInput = await question('User says >>>   ');
    let gptResponse = await sendMessageToAssistant(consoleInput);
    console.log('API says >>>   ' + JSON.stringify(gptResponse));
  }
}


startAssistantChat()







