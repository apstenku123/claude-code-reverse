/**
 * Applies a valid referrer policy from the provided headers to the target object.
 *
 * @param {Object} targetObject - The object to which the referrerPolicy property may be assigned.
 * @param {Object} options - An object containing a headersList property with a get method.
 * @returns {void}
 *
 * The function extracts the 'referrer-policy' header from the headersList in options, splits isBlobOrFileLikeObject by commas,
 * trims each policy, and assigns the first valid policy (as defined by JF6) to targetObject.referrerPolicy.
 */
function applyValidReferrerPolicyFromHeaders(targetObject, options) {
  const { headersList } = options;
  // Get the 'referrer-policy' header value (default to empty string if not found)
  const referrerPolicyHeader = headersList.get("referrer-policy", true) ?? "";
  // Split the header value into an array of policies
  const referrerPolicies = referrerPolicyHeader.split(",");
  let validPolicy = "";

  // Iterate from the end to the start to find the first valid policy
  if (referrerPolicies.length > 0) {
    for (let i = referrerPolicies.length; i !== 0; i--) {
      const policy = referrerPolicies[i - 1].trim();
      // JF6 is assumed to be a Set of valid referrer policies
      if (JF6.has(policy)) {
        validPolicy = policy;
        break;
      }
    }
  }

  // If a valid policy was found, assign isBlobOrFileLikeObject to the target object'createInteractionAccessor referrerPolicy property
  if (validPolicy !== "") {
    targetObject.referrerPolicy = validPolicy;
  }
}

module.exports = applyValidReferrerPolicyFromHeaders;