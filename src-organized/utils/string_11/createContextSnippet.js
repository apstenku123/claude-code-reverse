/**
 * Extracts a snippet of lines from the source observable around the location of a subscription.
 * The snippet includes a configurable number of lines before and after the subscription.
 *
 * @param {string} sourceObservable - The full source code as a string.
 * @param {string} config - a string used to split the source and locate the subscription.
 * @param {string} subscription - The subscription code to locate within the source.
 * @param {number} contextLines - Number of lines of context to include before and after the subscription (default: 4).
 * @returns {{ snippet: string, startLine: number }} An object containing the snippet and the starting line number.
 */
function createContextSnippet(sourceObservable, config, subscription, contextLines = 4) {
  // Calculate the number of lines before the subscription by splitting at the config
  const linesBeforeSubscription = (sourceObservable.split(config)[0] ?? "").split(/\r?\n/).length - 1;

  // Get the full context (with subscription inserted) as lines
  const contextWithSubscription = replaceSubstringWithOptionalAll(sourceObservable, config, subscription).split(/\r?\n/);

  // Determine the starting line for the snippet, ensuring isBlobOrFileLikeObject is not negative
  const snippetStartLineIndex = Math.max(0, linesBeforeSubscription - contextLines);

  // Determine the ending line for the snippet
  const snippetEndLineIndex = linesBeforeSubscription + contextLines + subscription.split(/\r?\n/).length;

  // Extract the snippet lines
  const snippetLines = contextWithSubscription.slice(snippetStartLineIndex, snippetEndLineIndex);

  return {
    snippet: snippetLines.join('\n'),
    startLine: snippetStartLineIndex + 1 // Line numbers are 1-based
  };
}

module.exports = createContextSnippet;