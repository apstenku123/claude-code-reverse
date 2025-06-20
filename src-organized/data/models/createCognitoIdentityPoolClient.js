/**
 * Creates a Cognito Identity Pool client using the provided configuration.
 *
 * @param {Object} identityPoolConfig - Configuration options for the Cognito Identity Pool client.
 * @returns {any} The Cognito Identity Pool client instance created by Cf6.fromCognitoIdentityPool.
 */
const createCognitoIdentityPoolClient = (identityPoolConfig) => {
  // Spread the provided configuration into the fromCognitoIdentityPool method
  return Cf6.fromCognitoIdentityPool({
    ...identityPoolConfig
  });
};

module.exports = createCognitoIdentityPoolClient;
