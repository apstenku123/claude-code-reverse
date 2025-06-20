/**
 * Creates an observable from a Cognito identity configuration.
 *
 * @param {Object} cognitoIdentityConfig - The configuration object for Cognito identity.
 * @returns {Observable} An observable representing the Cognito identity process.
 */
const createCognitoIdentityObservable = (cognitoIdentityConfig) => {
  // Spread the configuration object into the fromCognitoIdentity method
  return Jf6.fromCognitoIdentity({
    ...cognitoIdentityConfig
  });
};

module.exports = createCognitoIdentityObservable;
