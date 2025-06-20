/**
 * Factory function to create and configure a ReportingObserver integration for interventions, crashes, and deprecations.
 *
 * @param {Object} [options={}] - Configuration options for the observer.
 * @param {Array<string>} [options.types=["crash", "deprecation", "intervention"]] - Types of reports to observe.
 * @returns {Object} Integration object with name, setupOnce, and setup methods.
 */
const createInterventionObserver = (options = {}) => {
  // Types of reports to observe, defaulting to crash, deprecation, and intervention
  const reportTypes = options.types || ["crash", "deprecation", "intervention"];

  /**
   * Callback for the ReportingObserver. Processes each report entry and sends isBlobOrFileLikeObject to the monitoring client.
   *
   * @param {Array<Object>} reportEntries - Array of ReportingObserver entries.
   */
  function handleReportingObserverEntries(reportEntries) {
    // Only proceed if the current client is registered in eDA
    if (!eDA.has(mc.getClient())) return;

    for (const entry of reportEntries) {
      mc.withScope(scope => {
        // Attach the URL of the report entry
        scope.setExtra("url", entry.url);

        const messagePrefix = `ReportingObserver [${entry.type}]`;
        let messageDetails = "No details available";

        if (entry.body) {
          // Clone the body to avoid mutating the original
          const bodyClone = {};
          for (const key in entry.body) {
            bodyClone[key] = entry.body[key];
          }
          scope.setExtra("body", bodyClone);

          if (entry.type === "crash") {
            // For crash reports, include crashId and reason if available
            const crashBody = entry.body;
            messageDetails = [crashBody.crashId || "", crashBody.reason || ""].join(" ").trim() || messageDetails;
          } else {
            // For other types, use the message if available
            messageDetails = entry.body.message || messageDetails;
          }
        }
        // Capture the constructed message
        mc.captureMessage(`${messagePrefix}: ${messageDetails}`);
      });
    }
  }

  return {
    /**
     * Name of the integration (external constant BYA).
     */
    name: BYA,

    /**
     * Sets up the ReportingObserver if supported by the environment.
     */
    setupOnce() {
      if (!AYA.supportsReportingObserver()) return;
      // Create and observe a new ReportingObserver for the specified types
      new ZD9.ReportingObserver(handleReportingObserverEntries, {
        buffered: true,
        types: reportTypes
      }).observe();
    },

    /**
     * Registers the client in the eDA set to enable reporting.
     * @param {any} client - The client to register.
     */
    setup(client) {
      eDA.set(client, true);
    }
  };
};

module.exports = createInterventionObserver;
