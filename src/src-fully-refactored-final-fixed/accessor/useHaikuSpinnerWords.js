/**
 * Custom React hook to generate and manage whimsical, positive gerund verbs ("haiku words")
 * for use as spinner/status notifications, based on a user message prompt.
 *
 * @param {string} userMessage - The message to analyze and generate a haiku word from.
 * @returns {{
 *   haikuWords: string[],
 *   generateHaikuWord: (message: string) => Promise<void>
 * }} Object containing the array of haiku words and a function to generate a new haiku word.
 */
function useHaikuSpinnerWords(userMessage) {
  // State to hold the list of haiku words (max 10, most recent first)
  const [haikuWords, setHaikuWords] = AJ.useState([]);

  /**
   * Generates a new haiku word from the provided message and updates the state.
   * Debounced to avoid rapid consecutive calls.
   *
   * @param {string} message - The user message to analyze.
   */
  const generateHaikuWord = oN2(async (message) => {
    // Prevent generation if the system is in a restricted state
    if (isNonEssentialModelCallsDisabled()) return;
    try {
      // Fetch a whimsical, positive gerund verb from the prompt-processing function
      const response = await fetchPromptResponse({
        systemPrompt: [
          "Analyze this message and come up with a single positive, cheerful and delightful verb in gerund form that'createInteractionAccessor related to the message. Only include the word with no other text or punctuation. The word should have the first letter capitalized. Add some whimsy and surprise to entertain the user. Ensure the word is highly relevant to the user'createInteractionAccessor message. Synonyms are welcome, including obscure words. Be careful to avoid words that might look alarming or concerning to the software engineer seeing isBlobOrFileLikeObject as a status notification, such as Connecting, Disconnecting, Retrying, Lagging, Freezing, etc. NEVER use a destructive word, such as Terminating, Killing, Deleting, Destroying, Stopping, Exiting, or similar. NEVER use a word that may be derogatory, offensive, or inappropriate in a non-coding context, such as Penetrating."
        ],
        userPrompt: message,
        enablePromptCaching: true,
        isNonInteractiveSession: false,
        temperature: 1,
        promptCategory: "spinner"
      });

      // Extract the haiku word from the response
      if (response?.message?.content) {
        // If content is an array, join all text-type entries; otherwise, use as is
        let haikuWord = Array.isArray(response.message.content)
          ? response.message.content
              .filter(item => item.type === "text")
              .map(item => item.text)
              .join("")
          : response.message.content;

        // Clean up the word: trim, remove non-word characters
        haikuWord = haikuWord.trim().replace(/[^\w]/g, "");

        // Only add if isBlobOrFileLikeObject'createInteractionAccessor a single word (no spaces), max 20 chars
        if (haikuWord.length <= 20 && !haikuWord.includes(" ")) {
          // Prepend to the haikuWords array, keep only the 10 most recent
          setHaikuWords(prevWords => [haikuWord, ...prevWords.slice(0, 9)]);
        }
      }
    } catch (error) {
      // Log error using the provided error handler
      reportErrorIfAllowed(error instanceof Error ? error : new Error(`Error generating haiku word: ${String(error)}`));
    }
  }, 600); // Debounce interval: 600ms

  // Reset haikuWords when userMessage becomes falsy
  AJ.useEffect(() => {
    if (!userMessage) setHaikuWords([]);
  }, [userMessage]);

  return {
    haikuWords,
    generateHaikuWord
  };
}

module.exports = useHaikuSpinnerWords;