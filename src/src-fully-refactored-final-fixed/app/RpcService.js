/**
 * @class RpcService
 * @classdesc Represents an RPC (Remote Procedure Call) service handler that wraps an implementation function and manages request/response delimited flags.
 * @param {Function} rpcImpl - The RPC implementation function. Must be a function.
 * @param {boolean} [requestDelimited=false] - Indicates if requests are length-delimited.
 * @param {boolean} [responseDelimited=false] - Indicates if responses are length-delimited.
 * @throws {TypeError} Throws if rpcImpl is not a function.
 */
function RpcService(rpcImpl, requestDelimited, responseDelimited) {
  // Validate that the RPC implementation is a function
  if (typeof rpcImpl !== "function") {
    throw new TypeError("rpcImpl must be a function");
  }

  // Call the parent EventEmitter constructor
  Nb1.EventEmitter.call(this);

  /**
   * The RPC implementation function.
   * @type {Function}
   */
  this.rpcImpl = rpcImpl;

  /**
   * Whether requests are length-delimited.
   * @type {boolean}
   */
  this.requestDelimited = Boolean(requestDelimited);

  /**
   * Whether responses are length-delimited.
   * @type {boolean}
   */
  this.responseDelimited = Boolean(responseDelimited);
}

module.exports = RpcService;
