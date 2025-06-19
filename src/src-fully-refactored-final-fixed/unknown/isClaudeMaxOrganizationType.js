/**
 * Checks if the organization type of the given source is 'claude_max'.
 *
 * @async
 * @function isClaudeMaxOrganizationType
 * @param {any} sourceObject - The input object to check for organization type.
 * @returns {Promise<boolean>} Returns true if the organization type is 'claude_max', otherwise false.
 */
async function isClaudeMaxOrganizationType(sourceObject) {
  // Await the result of IfA, which is expected to return an object with an organization property
  const result = await IfA(sourceObject);

  // Safely access organization and its organization_type property
  // Return true only if organization_type is exactly 'claude_max'
  return result?.organization?.organization_type === "claude_max";
}

module.exports = isClaudeMaxOrganizationType;