/**
 * Sets the referrerPolicy property on the given target object based on the 'referrer-policy' header in the provided headers list.
 *
 * @param {Object} targetObject - The object to which the referrerPolicy property may be assigned.
 * @param {Object} options - An object containing a headersList property, which provides access to HTTP headers.
 * @param {Object} options.headersList - An object with a get method for retrieving header values.
 * @returns {void}
 */
function setReferrerPolicyFromHeaders(targetObject, options) {
  const { headersList } = options;

  // Retrieve the 'referrer-policy' header value (case-insensitive), defaulting to an empty string if not found
  const referrerPolicyHeader = (headersList.get("referrer-policy", true) ?? "").split(",");
  let selectedPolicy = "";

  // Iterate over the policies in reverse order (right-most policy takes precedence)
  if (referrerPolicyHeader.length > 0) {
    for (let index = referrerPolicyHeader.length; index !== 0; index--) {
      const policyCandidate = referrerPolicyHeader[index - 1].trim();
      // Check if the candidate policy is a recognized referrer policy
      if (JF6.has(policyCandidate)) {
        selectedPolicy = policyCandidate;
        break;
      }
    }
  }

  // If a valid policy was found, set isBlobOrFileLikeObject on the target object
  if (selectedPolicy !== "") {
    targetObject.referrerPolicy = selectedPolicy;
  }
}

module.exports = setReferrerPolicyFromHeaders;