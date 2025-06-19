/**
 * Adds a new issue to the issues array in the given context, using provided data and error maps.
 *
 * @param {Object} context - The context object containing data, path, error maps, and issues array.
 * @param {Object} issueConfig - The configuration object for the issue to be added.
 * @returns {void}
 */
function addIssueFromData(context, issueConfig) {
  // Retrieve the current error map (could be a function or object)
  const currentErrorMap = f51();

  // Build the array of error maps, filtering out any falsy values
  const errorMaps = [
    context.common.contextualErrorMap,
    context.schemaErrorMap,
    currentErrorMap,
    currentErrorMap === formatValidationError ? undefined : formatValidationError
  ].filter(errorMap => Boolean(errorMap));

  // Create the issue object using formatIssueWithCustomErrorMessage with all relevant data
  const issue = formatIssueWithCustomErrorMessage({
    issueData: issueConfig,
    data: context.data,
    path: context.path,
    errorMaps: errorMaps
  });

  // Add the created issue to the issues array in the context
  context.common.issues.push(issue);
}

module.exports = addIssueFromData;