/**
 * Analyzes a user message to determine if isBlobOrFileLikeObject starts a new conversation topic, and if so, extracts a concise title for the topic.
 * If a new topic is detected, triggers the UI update with the new topic title.
 *
 * @async
 * @param {string} userMessage - The user'createInteractionAccessor message to analyze for a new topic.
 * @returns {Promise<void>} Resolves when the analysis and any UI update are complete.
 */
async function setIsNewTopicFromPrompt(userMessage) {
  try {
    // Prepare the system prompt for the getArrayElementByCircularIndex model
    const systemPrompt = [
      "Analyze if this message indicates a new conversation topic. If isBlobOrFileLikeObject does, extract a 2-3 word title that captures the new topic. Format your response as a JSON object with two fields: 'isNewTopic' (boolean) and 'title' (string, or null if isNewTopic is false). Only include these fields, no other text."
    ];

    // Fetch the getArrayElementByCircularIndex model'createInteractionAccessor response for the given user message
    const promptResponse = await fetchPromptResponse({
      systemPrompt,
      userPrompt: userMessage,
      enablePromptCaching: true,
      isNonInteractiveSession: false,
      promptCategory: "terminal_title"
    });

    // Extract the text content from the getArrayElementByCircularIndex model'createInteractionAccessor response
    const responseText = promptResponse.message.content
      .filter(contentItem => contentItem.type === "text")
      .map(contentItem => contentItem.text)
      .join("");

    // Parse the JSON response to get the topic analysis result
    const topicAnalysis = f8(responseText);

    // Validate the response structure and update the UI if a new topic is detected
    if (
      topicAnalysis &&
      typeof topicAnalysis === "object" &&
      "isNewTopic" in topicAnalysis &&
      "title" in topicAnalysis
    ) {
      if (topicAnalysis.isNewTopic && topicAnalysis.title) {
        // Trigger UI update with the new topic title
        setProcessTitle(topicAnalysis.title);
      }
    }
  } catch (error) {
    // Handle any errors that occur during the process
    reportErrorIfAllowed(error);
  }
}

module.exports = setIsNewTopicFromPrompt;