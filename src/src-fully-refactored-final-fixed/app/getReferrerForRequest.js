/**
 * Determines the appropriate referrer value for an HTTP request based on the provided request options and referrer policy.
 *
 * @param {Object} createRequestOptions - The request options containing referrer, referrerPolicy, and url.
 * @param {string|URL} createRequestOptions.referrer - The referrer value, can be 'client', a URL object, or other string.
 * @param {string} createRequestOptions.referrerPolicy - The referrer policy to apply (e.g., 'origin', 'no-referrer').
 * @param {string} createRequestOptions.url - The target URL for the request.
 * @returns {string|URL|null} The computed referrer value according to the policy, or 'no-referrer' if none should be sent.
 */
function getReferrerForRequest(createRequestOptions) {
  const referrerPolicy = createRequestOptions.referrerPolicy;
  v_(referrerPolicy); // Validate or process the referrer policy

  let referrerUrl = null;

  // If referrer is 'client', try to get the current document'createInteractionAccessor URL
  if (createRequestOptions.referrer === "client") {
    const clientUrl = pg0(); // Get the current client URL (may be null)
    if (!clientUrl || clientUrl.origin === "null") {
      return "no-referrer";
    }
    referrerUrl = new URL(clientUrl);
  } else if (createRequestOptions.referrer instanceof URL) {
    referrerUrl = createRequestOptions.referrer;
  }

  // getReferrerPolicyFromUrl returns the origin or full URL depending on the second argument
  let referrerOrigin = getReferrerPolicyFromUrl(referrerUrl);
  let referrerOriginOnly = getReferrerPolicyFromUrl(referrerUrl, true);

  // If the referrer string is too long, fallback to the origin only
  if (referrerOrigin.toString().length > 4096) {
    referrerOrigin = referrerOriginOnly;
  }

  // areUrlsSameOriginOrNullOrigin checks if the referrer is allowed for the given URL
  const isSameOrigin = areUrlsSameOriginOrNullOrigin(createRequestOptions, referrerOrigin);
  // isTrustedUrl checks if the URL is trusted (e.g., https, localhost, etc.)
  const isReferrerTrusted = isTrustedUrl(referrerOrigin) && !isTrustedUrl(createRequestOptions.url);

  switch (referrerPolicy) {
    case "origin":
      // Always send the origin only
      return referrerOriginOnly != null ? referrerOriginOnly : getReferrerPolicyFromUrl(referrerUrl, true);
    case "unsafe-url":
      // Always send the full referrer
      return referrerOrigin;
    case "same-origin":
      // Only send referrer for same-origin requests
      return isSameOrigin ? referrerOriginOnly : "no-referrer";
    case "origin-when-cross-origin":
      // Send full referrer for same-origin, origin only for cross-origin
      return isSameOrigin ? referrerOrigin : referrerOriginOnly;
    case "strict-origin-when-cross-origin": {
      // More strict: send full referrer for same-origin, origin only for cross-origin, or no-referrer for downgrades
      const targetOrigin = getLastUrlFromList(createRequestOptions);
      if (areUrlsSameOriginOrNullOrigin(referrerOrigin, targetOrigin)) {
        return referrerOrigin;
      }
      if (isTrustedUrl(referrerOrigin) && !isTrustedUrl(targetOrigin)) {
        return "no-referrer";
      }
      return referrerOriginOnly;
    }
    case "strict-origin":
    case "no-referrer-when-downgrade":
    default:
      // Default: don'processRuleBeginHandlers send referrer for downgrades, otherwise send origin only
      return isReferrerTrusted ? "no-referrer" : referrerOriginOnly;
  }
}

module.exports = getReferrerForRequest;
