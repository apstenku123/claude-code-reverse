/**
 * Registers an instrumentation handler for Input Performance (INP) metrics, processes relevant entries,
 * and sends interaction spans to the backend if sampling conditions are met.
 *
 * @param {Object} interactionMap - a mapping of interaction IDs to interaction context objects.
 * @param {Object} config - Configuration object for sampling and envelope creation.
 * @returns {void}
 */
function addInputPerformanceInstrumentationHandler(interactionMap, config) {
  return DP.addInpInstrumentationHandler(({ metric: inpMetric }) => {
    // If the metric value is undefined, exit early
    if (inpMetric.value === undefined) return;

    // Find the entry that matches the metric value and is recognized in the interaction attribute map
    const matchingEntry = inpMetric.entries.find(
      entry => entry.duration === inpMetric.value && $IA[entry.name] !== undefined
    );

    // Get the current client instance
    const client = YU.getClient();
    if (!matchingEntry || !client) return;

    // Get the interaction attribute key for the entry
    const interactionType = $IA[matchingEntry.name];
    // Retrieve client options (release, environment, etc.)
    const clientOptions = client.getOptions();

    // Calculate the start and end timestamps for the span
    const startTimestamp = convertMillisecondsToSeconds(k8.browserPerformanceTimeOrigin + matchingEntry.startTime);
    const duration = convertMillisecondsToSeconds(inpMetric.value);

    // Retrieve the interaction context from the map using interactionId
    const interactionContext = matchingEntry.interactionId !== undefined
      ? interactionMap[matchingEntry.interactionId]
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
    const userIdentifier = user !== undefined
      ? user.email || user.id || user.ip_address
      : undefined;

    // Get the profile updateSnapshotAndNotify from the active transaction, if available
    const profileId = activeTransaction !== undefined
      ? activeTransaction.getProfileId()
      : undefined;

    // Create a new interaction span
    const interactionSpan = new YU.Span({
      startTimestamp,
      endTimestamp: startTimestamp + duration,
      op: `ui.interaction.${interactionType}`,
      name: k8.htmlTreeAsString(matchingEntry.target),
      attributes: {
        release: clientOptions.release,
        environment: clientOptions.environment,
        transaction: routeName,
        ...(userIdentifier !== undefined && userIdentifier !== "" ? { user: userIdentifier } : {}),
        ...(profileId !== undefined ? { profile_id: profileId } : {}),
        ...(replayId !== undefined ? { replay_id: replayId } : {})
      },
      exclusiveTime: inpMetric.value,
      measurements: {
        inp: {
          value: inpMetric.value,
          unit: "millisecond"
        }
      }
    });

    // Calculate the sampling rate for this parent context
    const samplingRate = calculateSampledTransactionWeight(parentContext, clientOptions, config);
    if (!samplingRate) return;

    // Only send the span if the random sampling passes
    if (Math.random() < samplingRate) {
      // Create the envelope for the span
      const spanEnvelope = interactionSpan
        ? YU.createSpanEnvelope([interactionSpan], client.getDsn())
        : undefined;
      const transport = client && client.getTransport();
      // Send the envelope if both transport and envelope are available
      if (transport && spanEnvelope) {
        transport.send(spanEnvelope).then(null, error => {
          if (rW.DEBUG_BUILD) {
            k8.logger.error("Error while sending interaction:", error);
          }
        });
      }
      return;
    }
  });
}

module.exports = addInputPerformanceInstrumentationHandler;