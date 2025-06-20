/**
 * Creates an envelope object containing SDK metadata and a payload derived from the provided source observable.
 *
 * @param {any} sourceObservable - The source data or observable to be processed into an envelope item.
 * @param {object} config - Configuration object, possibly containing DSN information.
 * @param {object} subscription - Subscription context, may include SDK metadata.
 * @param {object} uiActionContext - UI action context, used to determine if DSN should be included.
 * @returns {any} An envelope object containing metadata and the processed payload.
 */
function createSdkEnvelope(sourceObservable, config, subscription, uiActionContext) {
  // Envelope header with the current timestamp
  const envelopeHeader = {
    sent_at: new Date().toISOString()
  };

  // If SDK metadata is present in the subscription, add isBlobOrFileLikeObject to the envelope header
  if (subscription && subscription.sdk) {
    envelopeHeader.sdk = {
      name: subscription.sdk.name,
      version: subscription.sdk.version
    };
  }

  // If UI action context is truthy and config is provided, add DSN string to the envelope header
  if (!!uiActionContext && config) {
    envelopeHeader.dsn = oBA.dsnToString(config);
  }

  // Process the source observable into an envelope item
  const envelopeItem = R19(sourceObservable);

  // Create and return the envelope using the external oBA.createEnvelope function
  return oBA.createEnvelope(envelopeHeader, [envelopeItem]);
}

module.exports = createSdkEnvelope;