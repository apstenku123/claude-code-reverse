/**
 * Factory function to create an integration for capturing browser interventions, deprecations, and crashes
 * using the ReportingObserver API. Integrates with the error reporting client to record relevant events.
 *
 * @param {Object} [options={}] - Configuration options for the integration.
 * @param {string[]} [options.types=["crash", "deprecation", "intervention"]] - Types of reports to observe.
 * @returns {Object} Integration object with name, setupOnce, and setup methods.
 */
const createReportingObserverIntegration = (options = {}) => {
  // Types of reports to observe (default: crash, deprecation, intervention)
  const reportTypes = options.types || ["crash", "deprecation", "intervention"];

  /**
   * Callback to handle an array of ReportingObserver entries.
   *
   * @param {Array} reports - Array of ReportingObserverEntry objects.
   */
  function handleReports(reports) {
    // Only proceed if the current client is registered in the enabled clients set
    if (!eDA.has(mc.getClient())) return;

    for (const report of reports) {
      mc.withScope(scope => {
        // Attach the URL of the report as extra context
        scope.setExtra("url", report.url);

        // Prepare the message title and details
        const messageTitle = `ReportingObserver [${report.type}]`;
        let messageDetails = "No details available";

        if (report.body) {
          // Clone the body object to avoid mutation
          const bodyClone = {};
          for (const key in report.body) {
            bodyClone[key] = report.body[key];
          }
          scope.setExtra("body", bodyClone);

          if (report.type === "crash") {
            // For crash reports, include crashId and reason if available
            const crashBody = report.body;
            messageDetails = [crashBody.crashId || "", crashBody.reason || ""].join(" ").trim() || messageDetails;
          } else {
            // For other types, use the message field if available
            messageDetails = report.body.message || messageDetails;
          }
        }

        // Capture the constructed message with the error reporting client
        mc.captureMessage(`${messageTitle}: ${messageDetails}`);
      });
    }
  }

  return {
    /**
     * Name of the integration (external constant BYA)
     */
    name: BYA,

    /**
     * Sets up the ReportingObserver if supported by the environment.
     * Observes the specified report types and forwards them to the handler.
     */
    setupOnce() {
      // Only proceed if ReportingObserver is supported
      if (!AYA.supportsReportingObserver()) return;
      // Create and observe the ReportingObserver
      new ZD9.ReportingObserver(handleReports, {
        buffered: true,
        types: reportTypes
      }).observe();
    },

    /**
     * Registers the provided client as enabled for reporting.
     *
     * @param {any} client - The error reporting client instance.
     */
    setup(client) {
      eDA.set(client, true);
    }
  };
};

module.exports = createReportingObserverIntegration;