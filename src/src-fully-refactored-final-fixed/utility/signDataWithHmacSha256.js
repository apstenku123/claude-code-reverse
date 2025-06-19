/**
 * Signs the provided data using HMAC SHA-256 through the given signer object.
 *
 * @async
 * @function signDataWithHmacSha256
 * @param {Object} signer - An object that exposes a signWithHmacSha256 method.
 * @param {string} dataToSign - The data string that needs to be signed.
 * @param {string} secretKey - The secret key used for HMAC SHA-256 signing.
 * @returns {Promise<string>} The resulting HMAC SHA-256 signature as a string.
 */
async function signDataWithHmacSha256(signer, dataToSign, secretKey) {
  // Delegate signing to the external signWithHmacSha256 method
  return await signer.signWithHmacSha256(dataToSign, secretKey);
}

module.exports = signDataWithHmacSha256;