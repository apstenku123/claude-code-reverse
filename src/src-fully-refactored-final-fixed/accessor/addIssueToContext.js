/**
 * Adds a formatted issue object to the context'createInteractionAccessor issues array using provided data and error maps.
 *
 * @param {Object} context - The context object containing data, path, and error maps.
 * @param {Object} issueData - The issue-specific data to be included in the issue object.
 * @returns {void}
 */
function addIssueToContext(context, issueData) {
  // Retrieve the default error map (could be a function or object)
  const defaultErrorMap = f51();

  // Build the array of error maps, filtering out any falsy values
  const errorMaps = [
    context.common.contextualErrorMap,
    context.schemaErrorMap,
    defaultErrorMap,
    defaultErrorMap === formatValidationError ? undefined : formatValidationError
  ].filter(errorMap => Boolean(errorMap));

  // Create the issue object using formatIssueWithCustomErrorMessage with all relevant data
  const issue = formatIssueWithCustomErrorMessage({
    issueData: issueData,
    data: context.data,
    path: context.path,
    errorMaps: errorMaps
  });

  // Add the created issue to the context'createInteractionAccessor issues array
  context.common.issues.push(issue);
}

module.exports = addIssueToContext;