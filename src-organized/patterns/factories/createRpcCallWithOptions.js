/**
 * Creates an RPC call with the provided options and credentials.
 *
 * @param {object} rpcClient - The client object used to create the call (must have createCall method).
 * @param {object} methodConfig - The configuration for the method to be called.
 * @param {object} callOptions - Options for the call, including deadline, host, parent, propagate_flags, and credentials.
 * @returns {object} The created call object, possibly with credentials set.
 */
function createRpcCallWithOptions(rpcClient, methodConfig, callOptions) {
  // Use the provided deadline, or default to Infinity if not set
  const deadline = callOptions.deadline !== null && callOptions.deadline !== undefined
    ? callOptions.deadline
    : Infinity;

  // Host to connect to (may be undefined)
  const host = callOptions.host;

  // Parent call, or null if not provided
  const parentCall = callOptions.parent !== null && callOptions.parent !== undefined
    ? callOptions.parent
    : null;

  // Propagation flags for the call (may be undefined)
  const propagateFlags = callOptions.propagate_flags;

  // Optional credentials for the call
  const credentials = callOptions.credentials;

  // Create the call using the rpcClient'createInteractionAccessor createCall method
  const call = rpcClient.createCall(
    methodConfig,
    deadline,
    host,
    parentCall,
    propagateFlags
  );

  // If credentials are provided, set them on the call
  if (credentials) {
    call.setCredentials(credentials);
  }

  return call;
}

module.exports = createRpcCallWithOptions;