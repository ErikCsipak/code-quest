class OpenAiAssistant {
    constructor(openai, assistantId, threadId) {
        this.openai = openai;
        this.assistantId = assistantId;
        this.threadId = threadId;
    }

    async sendMessage(message) {
        await this.openai.beta.threads.messages.create(this.threadId, {
          role: 'user',
          content: message,
        });
      
        const run = await this.openai.beta.threads.runs.create(this.threadId, {
          assistant_id: this.assistantId,
        });
        const runId = run.id;
      
        let timeElapsed = 0;
        let interval = 1000;
        let timeout = 70000;
        while (timeElapsed < timeout) {
          const run = await this.openai.beta.threads.runs.retrieve(this.threadId, runId);
          if (run.status === 'completed') {
            const messagesFromThread = await this.openai.beta.threads.messages.list(this.threadId);
            return messagesFromThread.data[0].content[0].text.value;
          }
          await new Promise((resolve) => setTimeout(resolve, interval));
          timeElapsed += interval;
        }
      
        console.log("Timeout");
      }
  }

  module.exports = OpenAiAssistant;
