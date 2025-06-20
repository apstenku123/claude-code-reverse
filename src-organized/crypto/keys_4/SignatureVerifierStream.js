/**
 * @class SignatureVerifierStream
 * @description
 *   a stream-like object that manages a secret/public key and a signature for cryptographic verification.
 *   It listens for the 'close' event on both the key and signature objects, and triggers verification
 *   when both are closed and the stream is still readable.
 *
 * @param {Object} options - Configuration options for the verifier stream.
 * @param {string|Buffer} [options.secret] - The secret key for verification (optional).
 * @param {string|Buffer} [options.publicKey] - The public key for verification (optional).
 * @param {string|Buffer} [options.key] - The key for verification (optional).
 * @param {string} [options.algorithm] - The cryptographic algorithm to use (optional).
 * @param {string} [options.encoding] - The encoding format (optional).
 * @param {string|Buffer} [options.signature] - The signature to verify (optional).
 * @returns {void}
 */
function SignatureVerifierStream(options = {}) {
  // Determine the key to use for verification
  const keyInput = options.secret || options.publicKey || options.key;
  // Create a QJ2 instance for the key
  const keyInstance = new QJ2(keyInput);

  // Set up instance properties
  this.readable = true;
  this.algorithm = options.algorithm;
  this.encoding = options.encoding;
  this.secret = keyInstance;
  this.publicKey = keyInstance;
  this.key = keyInstance;
  this.signature = new QJ2(options.signature);

  // Listen for the 'close' event on the key instance
  this.secret.once("close", function () {
    // If the signature is not writable and the stream is still readable, verify
    if (!this.signature.writable && this.readable) {
      this.verify();
    }
  }.bind(this));

  // Listen for the 'close' event on the signature instance
  this.signature.once("close", function () {
    // If the key is not writable and the stream is still readable, verify
    if (!this.secret.writable && this.readable) {
      this.verify();
    }
  }.bind(this));
}

module.exports = SignatureVerifierStream;