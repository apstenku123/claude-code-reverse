/**
 * Returns an object representing the 'noAuth' authentication scheme for Smithy API.
 *
 * @param {any} _unusedInput - This parameter is currently unused but reserved for future use.
 * @returns {{ schemeId: string }} An object containing the schemeId for 'noAuth'.
 */
function getNoAuthScheme(_unusedInput) {
  // Always returns the 'noAuth' scheme identifier for Smithy API
  return {
    schemeId: "smithy.api#noAuth"
  };
}

module.exports = getNoAuthScheme;