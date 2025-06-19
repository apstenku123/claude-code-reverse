/**
 * Checks if any entry in the subscription'createInteractionAccessor name array matches the specified criteria.
 *
 * @param {string} serviceName - The name of the service to match against (used in certain match types).
 * @param {string} methodName - The name of the method to match against (used in certain match types).
 * @param {Object} subscription - The subscription object containing a 'name' array of route entries.
 * @param {string} matchType - The type of match to perform. Can be 'EMPTY', 'SERVICE', or 'SERVICE_AND_METHOD'.
 * @returns {boolean} Returns true if a matching entry is found based on the criteria; otherwise, false.
 */
function doesSubscriptionMatchCriteria(serviceName, methodName, subscription, matchType) {
  // Iterate over each route entry in the subscription'createInteractionAccessor name array
  for (const routeEntry of subscription.name) {
    switch (matchType) {
      case "EMPTY":
        // Match if both service and method are not defined
        if (!routeEntry.service && !routeEntry.method) {
          return true;
        }
        break;
      case "SERVICE":
        // Match if service matches and method is not defined
        if (routeEntry.service === serviceName && !routeEntry.method) {
          return true;
        }
        break;
      case "SERVICE_AND_METHOD":
        // Match if both service and method match
        if (routeEntry.service === serviceName && routeEntry.method === methodName) {
          return true;
        }
        break;
      // No default needed; only specified match types are handled
    }
  }
  // No matching entry found
  return false;
}

module.exports = doesSubscriptionMatchCriteria;