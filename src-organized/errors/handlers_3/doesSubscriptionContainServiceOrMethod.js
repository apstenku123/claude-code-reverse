/**
 * Checks if a subscription contains a matching service or method based on the provided criteria.
 *
 * @param {string} targetService - The service name to match against.
 * @param {string} targetMethod - The method name to match against.
 * @param {Object} subscription - The subscription object containing a 'name' array.
 * @param {string} matchType - The type of match to perform: 'EMPTY', 'SERVICE', or 'SERVICE_AND_METHOD'.
 * @returns {boolean} True if a matching entry is found in the subscription; otherwise, false.
 */
function doesSubscriptionContainServiceOrMethod(targetService, targetMethod, subscription, matchType) {
  // Iterate over each entry in the subscription'createInteractionAccessor name array
  for (const entry of subscription.name) {
    switch (matchType) {
      case "EMPTY":
        // Return true if both service and method are not defined
        if (!entry.service && !entry.method) {
          return true;
        }
        break;
      case "SERVICE":
        // Return true if service matches and method is not defined
        if (entry.service === targetService && !entry.method) {
          return true;
        }
        break;
      case "SERVICE_AND_METHOD":
        // Return true if both service and method match
        if (entry.service === targetService && entry.method === targetMethod) {
          return true;
        }
        break;
      // No default needed; only specified match types are handled
    }
  }
  // No matching entry found
  return false;
}

module.exports = doesSubscriptionContainServiceOrMethod;