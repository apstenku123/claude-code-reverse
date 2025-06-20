/**
 * Registers a performance instrumentation handler for browser 'click' events.
 * When a click event is detected, this function starts a child transaction
 * with relevant metadata such as the component name, HTML tree, and timing information.
 *
 * @returns {void} This function does not return a value.
 */
function registerClickPerformanceInstrumentation() {
  DP.addPerformanceInstrumentationHandler("event", ({ entries: performanceEntries }) => {
    for (const performanceEntry of performanceEntries) {
      // Get the currently active transaction (if any)
      const activeTransaction = YU.getActiveTransaction();
      if (!activeTransaction) return;

      // Only process 'click' events
      if (performanceEntry.name === "click") {
        // Calculate the start timestamp using the browser'createInteractionAccessor performance time origin
        const startTimestamp = convertMillisecondsToSeconds(k8.browserPerformanceTimeOrigin + performanceEntry.startTime);
        // Calculate the duration of the event
        const duration = convertMillisecondsToSeconds(performanceEntry.duration);
        // Build the child transaction metadata
        const childTransactionData = {
          description: k8.htmlTreeAsString(performanceEntry.target),
          op: `ui.interaction.${performanceEntry.name}`,
          origin: "auto.ui.browser.metrics",
          startTimestamp: startTimestamp,
          endTimestamp: startTimestamp + duration
        };
        // Optionally add the UI component name as an attribute if available
        const componentName = k8.getComponentName(performanceEntry.target);
        if (componentName) {
          childTransactionData.attributes = {
            "ui.component_name": componentName
          };
        }
        // Start the child transaction
        activeTransaction.startChild(childTransactionData);
      }
    }
  });
}

module.exports = registerClickPerformanceInstrumentation;