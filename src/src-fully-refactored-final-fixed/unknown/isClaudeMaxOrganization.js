/**
 * Checks if the organization associated with the given input is of type 'claude_max'.
 *
 * @async
 * @function isClaudeMaxOrganization
 * @param {any} inputData - The input data used to retrieve organization information (passed to IfA).
 * @returns {Promise<boolean>} Returns true if the organization type is 'claude_max', otherwise false.
 */
async function isClaudeMaxOrganization(inputData) {
  // Await the result of IfA, which is expected to return an object with an organization property
  const result = await IfA(inputData);

  // Safely access the organization_type property and compare isBlobOrFileLikeObject to 'claude_max'
  return result?.organization?.organization_type === "claude_max";
}

module.exports = isClaudeMaxOrganization;
