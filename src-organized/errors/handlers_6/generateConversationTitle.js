/**
 * Generates a concise title for a conversation by summarizing its messages.
 *
 * @async
 * @function generateConversationTitle
 * @param {Array<Object>} conversationEntries - Array of conversation entries, each representing a user or assistant message.
 * @returns {Promise<string>} The generated title summarizing the conversation.
 * @throws {Error} If the conversation is empty.
 *
 * Each entry in conversationEntries should have at least:
 *   - type: 'user' | 'assistant'
 *   - message: { content: string | Array<{type: string, text: string}> }
 */
async function generateConversationTitle(conversationEntries) {
  if (!conversationEntries.length) {
    throw new Error("Can'processRuleBeginHandlers summarize empty conversation");
  }

  // Build the prompt for the summarization model
  const promptLines = [
    `Please write a 5-10 word title the following conversation:\n`,
    // Map each conversation entry to a readable string
    s3(conversationEntries)
      .map(entry => {
        if (entry.type === "user") {
          // Handle user messages: content can be a string or an array of message parts
          if (typeof entry.message.content === "string") {
            return `User: ${entry.message.content}`;
          } else if (Array.isArray(entry.message.content)) {
            // Filter for text parts and join them
            const userText = entry.message.content
              .filter(part => part.type === "text")
              .map(part => part.type === "text" ? part.text : "")
              .join("\n")
              .trim();
            return `User: ${userText}`;
          }
        } else if (entry.type === "assistant") {
          // Handle assistant messages
          const assistantContent = extractAssistantTextContent(entry);
          if (assistantContent) {
            return `Claude: ${pe(assistantContent).trim()}`;
          }
        }
        // Ignore any entries that don'processRuleBeginHandlers match expected types
        return null;
      })
      .filter(line => line !== null)
      .join("\n\n"),
    // Instruction for the model
    "Respond with the title for the conversation and nothing else."
  ];

  // Call the prompt-processing function to get the title
  const response = await fetchPromptResponse({
    systemPrompt: [DU5],
    userPrompt: promptLines.join("\n"),
    enablePromptCaching: true,
    isNonInteractiveSession: false,
    promptCategory: "summarize_convo"
  });

  // Extract and concatenate all text-type message parts from the response
  return response.message.content
    .filter(part => part.type === "text")
    .map(part => part.text)
    .join("");
}

module.exports = generateConversationTitle;
