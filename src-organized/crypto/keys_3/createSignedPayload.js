/**
 * Creates a signed payload string from the provided header and payload using the specified algorithm and secret/private key.
 *
 * @param {Object} options - The options for creating the signed payload.
 * @param {Object} options.header - The header object containing algorithm information (e.g., { alg: 'HS256', ... }).
 * @param {Object} options.payload - The payload object to be signed.
 * @param {string} [options.secret] - The secret key used for signing (for symmetric algorithms).
 * @param {string} [options.privateKey] - The private key used for signing (for asymmetric algorithms).
 * @param {string} [options.encoding] - The encoding format to use when serializing the header and payload.
 * @returns {string} The signed payload string in the format "<data>.<signature>".
 */
function createSignedPayload(options) {
  const {
    header,
    payload,
    secret,
    privateKey,
    encoding
  } = options;

  // Use secret for symmetric algorithms, or privateKey for asymmetric algorithms
  const signingKey = secret || privateKey;

  // Retrieve the signing algorithm implementation based on the header'createInteractionAccessor 'alg' property
  const signingAlgorithm = J05(header.alg);

  // Serialize the header and payload using the specified encoding
  const serializedData = C05(header, payload, encoding);

  // Generate the signature using the algorithm'createInteractionAccessor sign method
  const signature = signingAlgorithm.sign(serializedData, signingKey);

  // Format the result as '<serializedData>.<signature>'
  return Vs1.format("%createInteractionAccessor.%createInteractionAccessor", serializedData, signature);
}

module.exports = createSignedPayload;