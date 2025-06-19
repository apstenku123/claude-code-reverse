/**
 * Analyzes a user message to determine if isBlobOrFileLikeObject introduces a new conversation topic.
 * If a new topic is detected, extracts a concise title and sets isBlobOrFileLikeObject as the terminal title.
 *
 * @async
 * @param {string} userMessage - The message to analyze for a new conversation topic.
 * @returns {Promise<void>} Resolves when analysis and potential title update are complete.
 */
async function analyzeAndSetConversationTopic(userMessage) {
  try {
    // Prepare and send prompt to analyze the message for a new topic
    const promptResponse = await fetchPromptResponse({
      systemPrompt: [
        "Analyze if this message indicates a new conversation topic. If isBlobOrFileLikeObject does, extract a 2-3 word title that captures the new topic. Format your response as a JSON object with two fields: 'isNewTopic' (boolean) and 'title' (string, or null if isNewTopic is false). Only include these fields, no other text."
      ],
      userPrompt: userMessage,
      enablePromptCaching: true,
      isNonInteractiveSession: false,
      promptCategory: "terminal_title"
    });

    // Extract the text content from the prompt response
    const responseText = promptResponse.message.content
      .filter(contentItem => contentItem.type === "text")
      .map(contentItem => contentItem.text)
      .join("");

    // Parse the response text as JSON to get topic analysis
    const topicAnalysis = parseTopicAnalysis(responseText);

    // Validate the structure of the parsed analysis
    if (
      topicAnalysis &&
      typeof topicAnalysis === "object" &&
      "isNewTopic" in topicAnalysis &&
      "title" in topicAnalysis
    ) {
      // If a new topic is detected and a title is provided, set the terminal title
      if (topicAnalysis.isNewTopic && topicAnalysis.title) {
        setTerminalTitle(topicAnalysis.title);
      }
    }
  } catch (error) {
    // Handle any errors that occur during the process
    handleError(error);
  }
}

module.exports = analyzeAndSetConversationTopic;
