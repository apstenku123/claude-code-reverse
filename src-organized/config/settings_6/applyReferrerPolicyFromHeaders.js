/**
 * Sets the referrerPolicy property on the target object based on the 'referrer-policy' header in the provided headers list.
 *
 * @param {Object} targetObject - The object to which the referrerPolicy property may be assigned.
 * @param {Object} options - An object containing a headersList property (a Headers-like object with a get method).
 * @returns {void}
 */
function applyReferrerPolicyFromHeaders(targetObject, options) {
  const { headersList } = options;
  // Retrieve the 'referrer-policy' header value (default to empty string if not present)
  const referrerPolicyHeader = (headersList.get("referrer-policy", true) ?? "").split(",");
  let selectedPolicy = "";

  // Iterate over the policies in reverse order, trimming whitespace
  // and selecting the first valid policy found in the allowed set (JF6)
  if (referrerPolicyHeader.length > 0) {
    for (let index = referrerPolicyHeader.length; index !== 0; index--) {
      const policyCandidate = referrerPolicyHeader[index - 1].trim();
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

module.exports = applyReferrerPolicyFromHeaders;