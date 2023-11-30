const OpenAIAPI = require('openai');
const readline = require('readline');
const fs = require('fs')
const { keys } = require('./keys');
const OpenAiAssistant = require('./openai-assistant');

module.exports = { sendMessageToAssistant, predictIssue };

const openai = new OpenAIAPI({
     apiKey: keys.openAiApiKey
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

  const data = JSON.parse(fs.readFileSync('resource-app-JIRA.json', 'utf8'));
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

// Open ai assistant and thread is set up on the open ai platform.
async function sendMessageToAssistant(message) {
  const assistantId = 'asst_fwqox77MkrHbq8TTqvYXx3dF';
  const threadId = 'thread_YM7wWW9nUAwaJIdkzTnv8kEU';
  const ai = new OpenAiAssistant(openai, assistantId, threadId);
  let response = await ai.sendMessage(message);
  return response;
}


// Open ai assistant and thread is set up on the open ai platform.
// Instructions are in task-explanation.txt.
async function predictIssue(futureIssue) {
  const assistantId = 'asst_fwqox77MkrHbq8TTqvYXx3dF';
  const threadId = 'thread_YM7wWW9nUAwaJIdkzTnv8kEU';
  const ai = new OpenAiAssistant(openai, assistantId, threadId);

  const preInstruction = "Perform the prediction task on this: ";
  const postInstruction = " Give back only a pure json string without formatting."
  let response = await ai.sendMessage(preInstruction + JSON.stringify(futureIssue) + postInstruction);

  console.log("first answer: " , response);

  return JSON.parse(response);
}

async function startConsoleAssistantChat() {
  console.log("--------------------- start chat -------------------------------");
  let consoleInput;
  while ( consoleInput != 'yes' ) {
    consoleInput = await question('User says >>>   ');
    let gptResponse = await sendMessageToAssistant(consoleInput);
    console.log('API says >>>   ' + JSON.stringify(gptResponse));
  }
}
