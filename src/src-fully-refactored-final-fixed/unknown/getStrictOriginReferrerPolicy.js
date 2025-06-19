/**
 * Returns an object specifying a strict referrer policy for cross-origin requests.
 *
 * @returns {{ referrerPolicy: string }} An object containing the recommended referrer policy.
 */
function getStrictOriginReferrerPolicy() {
  // The 'strict-origin-when-cross-origin' policy provides strong privacy protection
  // while retaining referrer information for same-origin requests.
  return {
    referrerPolicy: "strict-origin-when-cross-origin"
  };
}

module.exports = getStrictOriginReferrerPolicy;