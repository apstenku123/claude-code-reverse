/**
 * Reports a snippet of the first element from the provided array to the system prompt block.
 *
 * This function extracts the first non-empty string from the input array (using splitFirstLineAndRest),
 * then sends an object containing a snippet (first 20 characters), its length, and a SHA-256 hash
 * to the external logTelemetryEventIfEnabled function for logging or further processing.
 *
 * @param {string[]} inputStrings - An array of strings to process. The first non-empty string is used.
 * @returns {void}
 */
function reportSyspromptBlockSnippet(inputStrings) {
  // Extract the first non-empty string from the input array
  const [firstNonEmptyString] = splitFirstLineAndRest(inputStrings);

  // Prepare the snippet (first 20 characters), length, and hash (SHA-256)
  const snippet = firstNonEmptyString?.slice(0, 20);
  const length = firstNonEmptyString?.length ?? 0;
  const hash = firstNonEmptyString
    ? XZ5("sha256").update(firstNonEmptyString).digest("hex")
    : "";

  // Report the extracted information to the system prompt block
  logTelemetryEventIfEnabled("tengu_sysprompt_block", {
    snippet,
    length,
    hash
  });
}

module.exports = reportSyspromptBlockSnippet;