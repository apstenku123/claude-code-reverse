/**
 * Extracts queued prompt commands from an array of interaction entries.
 *
 * This function filters the provided array for entries with a mode of "prompt"
 * and maps each to a standardized object representing a queued command.
 *
 * @param {Array<Object>} interactionEntries - The array of interaction entry objects to process.
 * @returns {Array<Object>} An array of objects each representing a queued prompt command.
 */
function extractQueuedPromptCommands(interactionEntries) {
  // Return an empty array if the input is null, undefined, or falsy
  if (!interactionEntries) return [];

  // Filter for entries with mode 'prompt' and map to queued command objects
  return interactionEntries
    .filter(entry => entry.mode === "prompt")
    .map(entry => ({
      type: "queued_command",
      prompt: entry.value
    }));
}

module.exports = extractQueuedPromptCommands;