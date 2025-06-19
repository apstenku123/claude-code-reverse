/**
 * Registers a performance instrumentation handler for browser click events.
 * When a click event is detected, this function creates a child span/transaction
 * with detailed metadata about the click, including timing and component information.
 *
 * @returns {void} This function does not return a value.
 */
function addClickEventPerformanceInstrumentation() {
  DP.addPerformanceInstrumentationHandler("event", ({ entries: performanceEntries }) => {
    for (const performanceEntry of performanceEntries) {
      // Retrieve the currently active transaction (if any)
      const activeTransaction = YU.getActiveTransaction();
      if (!activeTransaction) return;

      // Only handle click events
      if (performanceEntry.name === "click") {
        // Calculate the start timestamp using the browser'createInteractionAccessor performance time origin
        const startTimestamp = convertMillisecondsToSeconds(k8.browserPerformanceTimeOrigin + performanceEntry.startTime);
        // Calculate the event duration
        const duration = convertMillisecondsToSeconds(performanceEntry.duration);
        // Build the span/child transaction metadata
        const childSpanData = {
          description: k8.htmlTreeAsString(performanceEntry.target),
          op: `ui.interaction.${performanceEntry.name}`,
          origin: "auto.ui.browser.metrics",
          startTimestamp: startTimestamp,
          endTimestamp: startTimestamp + duration
        };
        // Optionally add the component name if available
        const componentName = k8.getComponentName(performanceEntry.target);
        if (componentName) {
          childSpanData.attributes = {
            "ui.component_name": componentName
          };
        }
        // Start the child span/transaction
        activeTransaction.startChild(childSpanData);
      }
    }
  });
}

module.exports = addClickEventPerformanceInstrumentation;