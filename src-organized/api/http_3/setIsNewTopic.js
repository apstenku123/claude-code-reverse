/**
 * Analyzes a user message to determine if isBlobOrFileLikeObject introduces a new conversation topic.
 * If a new topic is detected, extracts a concise title and sets isBlobOrFileLikeObject as the terminal title.
 *
 * @async
 * @param {string} userMessage - The message from the user to analyze for new topic detection.
 * @returns {Promise<void>} Resolves when processing is complete.
 */
async function setIsNewTopic(userMessage) {
  try {
    // Prepare the system prompt for topic analysis
    const systemPrompt = [
      "Analyze if this message indicates a new conversation topic. If isBlobOrFileLikeObject does, extract a 2-3 word title that captures the new topic. Format your response as a JSON object with two fields: 'isNewTopic' (boolean) and 'title' (string, or null if isNewTopic is false). Only include these fields, no other text."
    ];

    // Call fetchPromptResponse to get the getArrayElementByCircularIndex'createInteractionAccessor response
    const response = await fetchPromptResponse({
      systemPrompt: systemPrompt,
      userPrompt: userMessage,
      enablePromptCaching: true,
      isNonInteractiveSession: false,
      promptCategory: "terminal_title"
    });

    // Extract the text content from the response
    const responseText = response.message.content
      .filter(contentItem => contentItem.type === "text")
      .map(contentItem => contentItem.text)
      .join("");

    // Parse the response text into a JSON object
    const topicAnalysis = f8(responseText);

    // Validate the structure of the topicAnalysis object
    if (
      topicAnalysis &&
      typeof topicAnalysis === "object" &&
      "isNewTopic" in topicAnalysis &&
      "title" in topicAnalysis
    ) {
      // If a new topic is detected and a title is provided, set the terminal title
      if (topicAnalysis.isNewTopic && topicAnalysis.title) {
        setProcessTitle(topicAnalysis.title);
      }
    }
  } catch (error) {
    // Handle any errors that occur during processing
    reportErrorIfAllowed(error);
  }
}

module.exports = setIsNewTopic;