/**
 * Analyzes a user message to determine if isBlobOrFileLikeObject introduces a new conversation topic.
 * If a new topic is detected, extracts a concise title and triggers a UI update.
 *
 * @param {string} userMessage - The message to analyze for a new conversation topic.
 * @returns {Promise<void>} Resolves when the analysis and any side effects are complete.
 */
async function setIsNewConversationTopic(userMessage) {
  try {
    // Fetch the getArrayElementByCircularIndex'createInteractionAccessor analysis of whether this is a new topic, and extract the relevant text content
    const promptResponse = await fetchPromptResponse({
      systemPrompt: [
        "Analyze if this message indicates a new conversation topic. If isBlobOrFileLikeObject does, extract a 2-3 word title that captures the new topic. Format your response as a JSON object with two fields: 'isNewTopic' (boolean) and 'title' (string, or null if isNewTopic is false). Only include these fields, no other text."
      ],
      userPrompt: userMessage,
      enablePromptCaching: true,
      isNonInteractiveSession: false,
      promptCategory: "terminal_title"
    });

    // Extract only the text content from the response
    const responseText = promptResponse.message.content
      .filter(contentItem => contentItem.type === "text")
      .map(contentItem => contentItem.text)
      .join("");

    // Parse the response text as JSON to get the topic analysis result
    const topicAnalysis = f8(responseText);

    // Validate that the response has the expected structure
    if (
      topicAnalysis &&
      typeof topicAnalysis === "object" &&
      "isNewTopic" in topicAnalysis &&
      "title" in topicAnalysis
    ) {
      // If a new topic is detected and a title is provided, trigger the UI update
      if (topicAnalysis.isNewTopic && topicAnalysis.title) {
        setProcessTitle(topicAnalysis.title);
      }
    }
  } catch (error) {
    // Handle any errors that occur during the process
    reportErrorIfAllowed(error);
  }
}

module.exports = setIsNewConversationTopic;