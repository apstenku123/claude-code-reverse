/**
 * Initializes a signing stream with provided cryptographic key and payload.
 * Sets up event listeners to trigger signing when both streams are closed.
 *
 * @param {Object} options - Configuration object for the signing stream.
 * @param {string|Buffer} [options.secret] - The secret key used for signing.
 * @param {string|Buffer} [options.privateKey] - The private key used for signing.
 * @param {string|Buffer} [options.key] - The generic key used for signing.
 * @param {Object} [options.header] - Optional header information for the stream.
 * @param {string} [options.encoding] - Optional encoding for the stream.
 * @param {string|Buffer|Object} [options.payload] - The payload to be signed.
 * @returns {void}
 */
function initializeSigningStream(options) {
  // Determine the cryptographic key to use (secret, privateKey, or key)
  const signingKey = options.secret || options.privateKey || options.key;
  // Create a new signing stream for the key
  const signingStream = new rF2(signingKey);

  // Set up instance properties
  this.readable = true;
  this.header = options.header;
  this.encoding = options.encoding;
  // Assign the signing stream to all key-related properties for compatibility
  this.secret = this.privateKey = this.key = signingStream;
  // Create a new stream for the payload
  this.payload = new rF2(options.payload);

  // When the signing stream closes, check if payload is unwritable and trigger signing if appropriate
  this.secret.once("close", function () {
    if (!this.payload.writable && this.readable) {
      this.sign();
    }
  }.bind(this));

  // When the payload stream closes, check if signing stream is unwritable and trigger signing if appropriate
  this.payload.once("close", function () {
    if (!this.secret.writable && this.readable) {
      this.sign();
    }
  }.bind(this));
}

module.exports = initializeSigningStream;