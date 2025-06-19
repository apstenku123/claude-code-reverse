/**
 * Signs a payload using the specified algorithm and key, then formats the result as a string.
 *
 * @param {Object} options - The signing options.
 * @param {Object} options.header - The header object containing algorithm information.
 * @param {Object} options.payload - The payload to be signed.
 * @param {string} [options.secret] - The secret key for signing (for symmetric algorithms).
 * @param {string} [options.privateKey] - The private key for signing (for asymmetric algorithms).
 * @param {string} [options.encoding] - The encoding to use when serializing the payload.
 * @returns {string} The formatted string containing the serialized payload and its signature.
 */
function signAndFormatPayload(options) {
  const {
    header,
    payload,
    secret,
    privateKey,
    encoding
  } = options;

  // Determine the signing key: use secret if available, otherwise privateKey
  const signingKey = secret || privateKey;

  // Retrieve the signing algorithm implementation based on the header'createInteractionAccessor algorithm
  const signingAlgorithm = J05(header.alg);

  // Serialize the header and payload using the specified encoding
  const serializedData = C05(header, payload, encoding);

  // Sign the serialized data using the selected algorithm and key
  const signature = signingAlgorithm.sign(serializedData, signingKey);

  // Format the result as a string: '<serializedData>.<signature>'
  return Vs1.format("%createInteractionAccessor.%createInteractionAccessor", serializedData, signature);
}

module.exports = signAndFormatPayload;