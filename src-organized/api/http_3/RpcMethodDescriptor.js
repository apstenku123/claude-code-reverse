/**
 * Represents the metadata and configuration for an RPC method, including types and streaming options.
 *
 * @class
 * @extends Sg1
 * @param {string} methodName - The name of the RPC method.
 * @param {string} [methodType] - The type of the method (e.g., 'rpc'). Must be a string if provided.
 * @param {string} requestTypeName - The name of the request type. Must be a string.
 * @param {string} responseTypeName - The name of the response type. Must be a string.
 * @param {boolean|object} [requestStreamOrOptions] - If boolean, indicates if the request is a stream. If object, treated as options.
 * @param {boolean|object} [responseStreamOrOptions] - If boolean, indicates if the response is a stream. If object, treated as options.
 * @param {object} [options] - Additional options for the method.
 * @param {string} [comment] - Optional comment or description for the method.
 * @param {object} [parsedOptions] - Parsed options for the method.
 * @throws {TypeError} If methodType, requestTypeName, or responseTypeName are not strings as required.
 */
function RpcMethodDescriptor(
  methodName,
  methodType,
  requestTypeName,
  responseTypeName,
  requestStreamOrOptions,
  responseStreamOrOptions,
  options,
  comment,
  parsedOptions
) {
  // Handle overloaded parameters: if requestStreamOrOptions or responseStreamOrOptions are objects, treat them as options
  if (vg.isObject(requestStreamOrOptions)) {
    options = requestStreamOrOptions;
    requestStreamOrOptions = responseStreamOrOptions = undefined;
  } else if (vg.isObject(responseStreamOrOptions)) {
    options = responseStreamOrOptions;
    responseStreamOrOptions = undefined;
  }

  // Validate methodType if provided
  if (!(methodType === undefined || vg.isString(methodType))) {
    throw TypeError("type must be a string");
  }

  // Validate required string parameters
  if (!vg.isString(requestTypeName)) {
    throw TypeError("requestType must be a string");
  }
  if (!vg.isString(responseTypeName)) {
    throw TypeError("responseType must be a string");
  }

  // Call parent constructor with methodName and options
  Sg1.call(this, methodName, options);

  // Set method type, defaulting to 'rpc' if not provided
  this.type = methodType || "rpc";
  this.requestType = requestTypeName;
  // If requestStreamOrOptions is truthy, set requestStream to true, otherwise undefined
  this.requestStream = requestStreamOrOptions ? true : undefined;
  this.responseType = responseTypeName;
  // If responseStreamOrOptions is truthy, set responseStream to true, otherwise undefined
  this.responseStream = responseStreamOrOptions ? true : undefined;
  this.resolvedRequestType = null;
  this.resolvedResponseType = null;
  this.comment = comment;
  this.parsedOptions = parsedOptions;
}

module.exports = RpcMethodDescriptor;