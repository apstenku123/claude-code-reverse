/**
 * Initializes a signature verification stream using the provided configuration.
 * Sets up internal state and event listeners to trigger verification when streams close.
 *
 * @param {Object} options - Configuration object for the verification stream.
 * @param {string|Buffer} [options.secret] - The secret key for verification (optional).
 * @param {string|Buffer} [options.publicKey] - The public key for verification (optional).
 * @param {string|Buffer} [options.key] - The key for verification (optional).
 * @param {string} [options.algorithm] - The algorithm to use for verification (optional).
 * @param {string} [options.encoding] - The encoding format (optional).
 * @param {string|Buffer} [options.signature] - The signature to verify (optional).
 * @returns {void}
 */
function initializeSignatureVerificationStream(options = {}) {
  // Determine the key to use for verification
  const verificationKey = options.secret || options.publicKey || options.key;

  // Initialize the key and signature streams
  const keyStream = new QJ2(verificationKey);
  const signatureStream = new QJ2(options.signature);

  // Set up instance properties
  this.readable = true;
  this.algorithm = options.algorithm;
  this.encoding = options.encoding;
  this.secret = keyStream;
  this.publicKey = keyStream;
  this.key = keyStream;
  this.signature = signatureStream;

  // When the key stream closes, verify if signature stream is not writable and still readable
  this.secret.once("close", function () {
    if (!this.signature.writable && this.readable) {
      this.verify();
    }
  }.bind(this));

  // When the signature stream closes, verify if key stream is not writable and still readable
  this.signature.once("close", function () {
    if (!this.secret.writable && this.readable) {
      this.verify();
    }
  }.bind(this));
}

module.exports = initializeSignatureVerificationStream;