/**
 * Registers an INP (Interaction to Next Paint) instrumentation handler that processes browser performance entries
 * and sends interaction spans to the backend if sampling conditions are met.
 *
 * @param {Object} interactionMap - a mapping of interaction IDs to interaction context objects.
 * @param {Object} config - Additional configuration options for span processing and sampling.
 * @returns {void}
 */
function addInpInteractionInstrumentationHandler(interactionMap, config) {
  return DP.addInpInstrumentationHandler(({ metric: inpMetric }) => {
    // If the metric value is undefined, skip processing
    if (inpMetric.value === undefined) return;

    // Find the relevant performance entry for this metric
    const relevantEntry = inpMetric.entries.find(
      (entry) => entry.duration === inpMetric.value && $IA[entry.name] !== undefined
    );
    const client = YU.getClient();
    if (!relevantEntry || !client) return;

    // Get the interaction type from the entry name
    const interactionType = $IA[relevantEntry.name];
    const clientOptions = client.getOptions();

    // Calculate start and end timestamps for the span
    const startTimestamp = convertMillisecondsToSeconds(k8.browserPerformanceTimeOrigin + relevantEntry.startTime);
    const duration = convertMillisecondsToSeconds(inpMetric.value);

    // Retrieve the interaction context from the map using interactionId
    const interactionContext =
      relevantEntry.interactionId !== undefined
        ? interactionMap[relevantEntry.interactionId]
        : undefined;
    if (interactionContext === undefined) return;

    // Destructure relevant properties from the interaction context
    const {
      routeName,
      parentContext,
      activeTransaction,
      user,
      replayId
    } = interactionContext;

    // Determine user identifier (email, id, or IP address)
    const userIdentifier =
      user !== undefined ? user.email || user.id || user.ip_address : undefined;

    // Get profile updateSnapshotAndNotify from the active transaction if available
    const profileId =
      activeTransaction !== undefined ? activeTransaction.getProfileId() : undefined;

    // Create a new span representing the UI interaction
    const interactionSpan = new YU.Span({
      startTimestamp,
      endTimestamp: startTimestamp + duration,
      op: `ui.interaction.${interactionType}`,
      name: k8.htmlTreeAsString(relevantEntry.target),
      attributes: {
        release: clientOptions.release,
        environment: clientOptions.environment,
        transaction: routeName,
        ...(userIdentifier !== undefined && userIdentifier !== '' ? { user: userIdentifier } : {}),
        ...(profileId !== undefined ? { profile_id: profileId } : {}),
        ...(replayId !== undefined ? { replay_id: replayId } : {})
      },
      exclusiveTime: inpMetric.value,
      measurements: {
        inp: {
          value: inpMetric.value,
          unit: 'millisecond'
        }
      }
    });

    // Determine the sampling rate for this interaction
    const samplingRate = calculateSampledTransactionWeight(parentContext, clientOptions, config);
    if (!samplingRate) return;

    // Sample the interaction: only send if random number is below the sampling rate
    if (Math.random() < samplingRate) {
      const spanEnvelope = interactionSpan
        ? YU.createSpanEnvelope([interactionSpan], client.getDsn())
        : undefined;
      const transport = client && client.getTransport();
      if (transport && spanEnvelope) {
        transport.send(spanEnvelope).then(null, (error) => {
          if (rW.DEBUG_BUILD) {
            k8.logger.error('Error while sending interaction:', error);
          }
        });
      }
      return;
    }
  });
}

module.exports = addInpInteractionInstrumentationHandler;