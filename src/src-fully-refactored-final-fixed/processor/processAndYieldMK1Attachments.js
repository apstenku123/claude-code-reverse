/**
 * Processes attachments using aggregateAsyncDataWithAbort, notifies via logTelemetryEventIfEnabled, and yields processed createAttachmentEntry attachments.
 *
 * @async
 * @generator
 * @function processAndYieldMK1Attachments
 * @category processor
 * @param {any} sourceObservable - The source observable or data input for processing attachments.
 * @param {any} config - Configuration object for attachment processing.
 * @param {any} subscription - Subscription or query parameter for aggregateAsyncDataWithAbort.
 * @param {any} context - Additional context or options for processing.
 * @yields {Promise<any>} The result of processing each attachment with createAttachmentEntry.
 * @returns {AsyncGenerator<any>} An async generator yielding processed attachments.
 */
async function* processAndYieldMK1Attachments(sourceObservable, config, subscription, context) {
  // Retrieve attachments using aggregateAsyncDataWithAbort with provided parameters
  const attachments = await aggregateAsyncDataWithAbort(sourceObservable, config, subscription, context);

  // If no attachments are found, exit early
  if (attachments.length < 1) return;

  // Notify the system with the types of attachments found
  logTelemetryEventIfEnabled("tengu_attachments", {
    attachment_types: attachments.map(attachment => attachment.type)
  });

  // Yield each processed attachment using createAttachmentEntry
  for (const attachment of attachments) {
    yield createAttachmentEntry(attachment);
  }
}

module.exports = processAndYieldMK1Attachments;