/**
 * RpcClient constructor for managing RPC implementation and message delimitation settings.
 * Extends Nb1.EventEmitter to provide event-driven capabilities.
 *
 * @class
 * @param {Function} rpcImplementation - The function handling the RPC logic (must be a function).
 * @param {boolean} [isRequestDelimited=false] - Indicates if requests should be length-delimited.
 * @param {boolean} [isResponseDelimited=false] - Indicates if responses should be length-delimited.
 * @throws {TypeError} Throws if rpcImplementation is not a function.
 */
function RpcClient(rpcImplementation, isRequestDelimited, isResponseDelimited) {
  // Validate that the rpcImplementation parameter is a function
  if (typeof rpcImplementation !== "function") {
    throw new TypeError("rpcImpl must be a function");
  }

  // Call the parent EventEmitter constructor
  Nb1.EventEmitter.call(this);

  /**
   * The RPC implementation function.
   * @type {Function}
   */
  this.rpcImpl = rpcImplementation;

  /**
   * Whether requests are length-delimited.
   * @type {boolean}
   */
  this.requestDelimited = Boolean(isRequestDelimited);

  /**
   * Whether responses are length-delimited.
   * @type {boolean}
   */
  this.responseDelimited = Boolean(isResponseDelimited);
}

module.exports = RpcClient;