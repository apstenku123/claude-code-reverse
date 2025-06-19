/**
 * Initializes and manages an ANR (Application Not Responding) worker process for monitoring app responsiveness.
 * Sets up a worker with relevant context, handles session updates, and ensures cleanup on exit or error.
 *
 * @param {object} client - The Sentry client instance providing DSN, options, and metadata.
 * @param {object} workerConfig - Configuration options for the ANR worker (appRootPath, pollInterval, etc).
 * @returns {Function} Cleanup function to terminate the worker and clear the polling interval.
 */
async function initializeAnrWorker(client, workerConfig) {
  // Retrieve the DSN (Data Source Name) from the client
  const dsn = client.getDsn();
  if (!dsn) {
    // If no DSN is configured, return a no-op cleanup function
    return () => {};
  }

  // Gather context information for the worker
  const contexts = await processEventWithProcessors(client);

  // Remove sensitive or unnecessary properties from contexts
  oZA([
    contexts, "access", ctx => ctx.app, "optionalAccess", ctx => delete ctx.app_memory
  ]);
  oZA([
    contexts, "access", ctx => ctx.device, "optionalAccess", ctx => delete ctx.free_memory
  ]);

  // Retrieve client options and SDK metadata
  const options = client.getOptions();
  const sdkMetadata = client.getSdkMetadata() || {};

  // If SDK info exists, attach the list of integration names
  if (sdkMetadata.sdk) {
    sdkMetadata.sdk.integrations = options.integrations.map(integration => integration.name);
  }

  // Prepare the worker'createInteractionAccessor configuration data
  const workerData = {
    debug: I41.logger.isEnabled(),
    dsn: dsn,
    environment: options.environment || "production",
    release: options.release,
    dist: options.dist,
    sdkMetadata: sdkMetadata,
    appRootPath: workerConfig.appRootPath,
    pollInterval: workerConfig.pollInterval || DG9,
    anrThreshold: workerConfig.anrThreshold || YG9,
    captureStackTrace: !!workerConfig.captureStackTrace,
    staticTags: workerConfig.staticTags || {},
    contexts: contexts
  };

  // Optionally open the inspector if stack trace capturing is enabled
  if (workerData.captureStackTrace) {
    const inspector = G1("inspector");
    if (!inspector.url()) {
      inspector.open(0);
    }
  }

  // Create the ANR worker using Node.js Worker Threads
  const { Worker } = JG9();
  const anrWorker = new Worker(
    new GG9.URL(`data:application/javascript;base64,${ZG9.base64WorkerScript}`),
    { workerData }
  );

  // Ensure the worker is terminated when the process exits
  process.on("exit", () => {
    anrWorker.terminate();
  });

  // Periodically send session data to the worker
  const pollIntervalId = setInterval(() => {
    try {
      const session = CU.getCurrentScope().getSession();
      // Remove the toJSON method if present to avoid serialization issues
      const sessionData = session ? { ...session, toJSON: undefined } : undefined;
      anrWorker.postMessage({ session: sessionData });
    } catch (err) {
      // Ignore errors during session polling
    }
  }, workerData.pollInterval);

  // Allow the interval to not keep the event loop alive
  pollIntervalId.unref();

  // Handle messages from the worker
  anrWorker.on("message", message => {
    if (message === "session-ended") {
      createObjectTracker$1("ANR event sent from ANR worker. Clearing session in this thread.");
      CU.getCurrentScope().setSession(undefined);
    }
  });

  // Handle worker errors
  anrWorker.once("error", error => {
    clearInterval(pollIntervalId);
    createObjectTracker$1("ANR worker error", error);
  });

  // Handle worker exit
  anrWorker.once("exit", code => {
    clearInterval(pollIntervalId);
    createObjectTracker$1("ANR worker exit", code);
  });

  // Allow the worker to not keep the event loop alive
  anrWorker.unref();

  // Return a cleanup function to terminate the worker and clear the interval
  return () => {
    anrWorker.terminate();
    clearInterval(pollIntervalId);
  };
}

module.exports = initializeAnrWorker;