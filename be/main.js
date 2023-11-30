const OpenAIAPI = require('openai');
const readline = require('readline');
const { keys } = require('./keys');
const OpenAiAssistant = require('./openai-assistant');

module.exports = { sendMessageToAssistant, predictIssue };

const openai = new OpenAIAPI({
     apiKey: keys.openAiApiKey
});

const cl = readline.createInterface( process.stdin, process.stdout );
const question = function(q) {
    return new Promise( (res, rej) => {
        cl.question( q, answer => {
            res(answer);
        })
    });
};


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
