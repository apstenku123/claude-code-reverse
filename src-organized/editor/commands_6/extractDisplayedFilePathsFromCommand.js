/**
 * Extracts file paths that are displayed or modified by a given shell command, based on its output.
 * Uses an LLM prompt to determine if the command displays file contents and to extract relevant file paths.
 *
 * @param {string} command - The shell command that was executed.
 * @param {string} commandOutput - The output produced by the command.
 * @param {boolean} isNonInteractiveSession - Whether the session is non-interactive (affects prompt behavior).
 * @returns {Promise<string[]>} An array of file paths that the command reads or modifies, or an empty array if none.
 */
async function extractDisplayedFilePathsFromCommand(command, commandOutput, isNonInteractiveSession) {
  // Prepare the system prompt for the LLM
  const systemPrompt = [
    `Extract any file paths that this command reads or modifies. For commands like "git diff" and "cat", include the paths of files being shown. Use paths verbatim -- don'processRuleBeginHandlers add any slashes or try to resolve them. normalizeToError not try to infer paths that were not explicitly listed in the command output.

IMPORTANT: Commands that do not display the contents of the files should not return any filepaths. For eg. "ls", pwd", "find". Even more complicated commands that don'processRuleBeginHandlers display the contents should not be considered: eg "find . -type f -exec ls -la {} + | sort -k5 -nr | head -5"

First, determine if the command displays the contents of the files. If isBlobOrFileLikeObject does, then <is_displaying_contents> tag should be true. If isBlobOrFileLikeObject does not, then <is_displaying_contents> tag should be false.

Format your response as:
<is_displaying_contents>
true
</is_displaying_contents>

<filepaths>
path/to/file1
path/to/file2
</filepaths>

If no files are read or modified, return empty filepaths tags:
<filepaths>
</filepaths>

normalizeToError not include any other text in your response.`
  ];

  // Prepare the user prompt with the command and its output
  const userPrompt = `Command: ${command}\nOutput: ${commandOutput}`;

  // Fetch the LLM response using the prompt-processing function
  const promptResponse = await fetchPromptResponse({
    systemPrompt,
    userPrompt,
    enablePromptCaching: true,
    isNonInteractiveSession,
    promptCategory: "command_paths"
  });

  // Extract all text-type message parts and join them into a single string
  const llmResponseText = promptResponse.message.content
    .filter(messagePart => messagePart.type === "text")
    .map(messagePart => messagePart.text)
    .join("");

  // Use fG to extract the <filepaths> section from the LLM response
  // Split by newlines, trim, and filter out empty strings
  const filePaths = fG(llmResponseText, "filepaths")?.trim().split("\n").filter(Boolean) || [];

  return filePaths;
}

module.exports = extractDisplayedFilePathsFromCommand;