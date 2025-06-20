/**
 * Decodes the payload section of a JWT (JSON Web Token) from base64 to a string using the specified encoding.
 *
 * @param {string} jwtToken - The JWT string in the format 'header.payload.signature'.
 * @param {string} [encoding='utf8'] - The encoding to use for the output string (default is 'utf8').
 * @returns {string} The decoded payload as a string in the specified encoding.
 */
function decodeBase64PayloadFromJwt(jwtToken, encoding = 'utf8') {
  // Split the JWT and extract the payload (second part)
  const payloadBase64 = jwtToken.split('.')[1];
  // Decode the base64 payload to a string using the specified encoding
  return IJ2.from(payloadBase64, 'base64').toString(encoding);
}

module.exports = decodeBase64PayloadFromJwt;