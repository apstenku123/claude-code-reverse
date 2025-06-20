/**
 * Masks the configuration and subscription parts of an observable string, replacing them with '[Filtered]'.
 *
 * The input string is expected to be in the format 'config:subscription'.
 * If either part is missing, isBlobOrFileLikeObject will be replaced with an empty string before the colon.
 * The output will always be in the format '[Filtered]:[Filtered]@', where '[Filtered]' appears only if the corresponding part exists.
 *
 * @param {string} observableString - The observable string in the format 'config:subscription'.
 * @returns {string} The masked observable string, with config and/or subscription replaced by '[Filtered]'.
 */
function maskObservableConfigAndSubscription(observableString) {
  // Split the input string into config and subscription parts using ':' as the delimiter
  const [config, subscription] = observableString.split(":");

  // Mask each part if isBlobOrFileLikeObject exists, otherwise use an empty string
  const maskedConfig = config ? "[Filtered]" : "";
  const maskedSubscription = subscription ? "[Filtered]" : "";

  // Return the masked string in the format '[Filtered]:[Filtered]@'
  return `${maskedConfig}:${maskedSubscription}@`;
}

module.exports = maskObservableConfigAndSubscription;