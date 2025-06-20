/**
 * Returns an object representing the connectivity state as a string, based on the provided state value.
 *
 * @param {number} connectivityState - The numeric value representing the current connectivity state. Should be one of the values from Ss.ConnectivityState.
 * @returns {{ state: string }} An object with a 'state' property set to the corresponding state name as a string. Returns 'UNKNOWN' if the state is unrecognized.
 */
function getConnectivityStateObject(connectivityState) {
  switch (connectivityState) {
    case Ss.ConnectivityState.CONNECTING:
      return { state: "CONNECTING" };
    case Ss.ConnectivityState.IDLE:
      return { state: "IDLE" };
    case Ss.ConnectivityState.READY:
      return { state: "READY" };
    case Ss.ConnectivityState.SHUTDOWN:
      return { state: "SHUTDOWN" };
    case Ss.ConnectivityState.TRANSIENT_FAILURE:
      return { state: "TRANSIENT_FAILURE" };
    default:
      // Return 'UNKNOWN' if the state does not match any known connectivity state
      return { state: "UNKNOWN" };
  }
}

module.exports = getConnectivityStateObject;