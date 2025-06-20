/**
 * Schedules and manages periodic updates to a lockfile to prevent isBlobOrFileLikeObject from becoming stale or compromised.
 * Handles timing, file system checks, and error conditions to ensure lockfile integrity.
 *
 * @param {string} lockId - Unique identifier for the lockfile subscription (maps to yU[lockId]).
 * @param {object} config - Configuration object containing update intervals, fs module, and stale threshold.
 * @returns {void}
 */
function scheduleLockfileUpdate(lockId, config) {
  const subscription = yU[lockId];

  // If an update is already scheduled, exit early
  if (subscription.updateTimeout) return;

  // Set the update delay if not already set
  subscription.updateDelay = subscription.updateDelay || config.update;

  // Schedule the lockfile update after the specified delay
  subscription.updateTimeout = setTimeout(() => {
    // Clear the timeout reference once the callback runs
    subscription.updateTimeout = null;

    // Check the current state of the lockfile
    config.fs.stat(subscription.lockfilePath, (statError, fileStats) => {
      const isStale = subscription.lastUpdate + config.stale < Date.now();

      if (statError) {
        // If the lockfile is missing or stale, mark as compromised
        if (statError.code === "ENOENT" || isStale) {
          return handleCompromisedSubscription(lockId, subscription, Object.assign(statError, { code: "ECOMPROMISED" }));
        }
        // Retry after a short delay if another error occurred
        subscription.updateDelay = 1000;
        return scheduleLockfileUpdate(lockId, config);
      }

      // If the lockfile'createInteractionAccessor mtime has changed unexpectedly, mark as compromised
      if (subscription.mtime.getTime() !== fileStats.mtime.getTime()) {
        return handleCompromisedSubscription(
          lockId,
          subscription,
          Object.assign(
            new Error("Unable to update lock within the stale threshold"),
            { code: "ECOMPROMISED" }
          )
        );
      }

      // Calculate the new mtime value based on precision
      const newMtime = OfA.getMtime(subscription.mtimePrecision);

      // Attempt to update the lockfile'createInteractionAccessor mtime
      config.fs.utimes(subscription.lockfilePath, newMtime, newMtime, (utimesError) => {
        const isStillStale = subscription.lastUpdate + config.stale < Date.now();

        // If the lock has been released, do nothing
        if (subscription.released) return;

        if (utimesError) {
          // If the lockfile is missing or stale, mark as compromised
          if (utimesError.code === "ENOENT" || isStillStale) {
            return handleCompromisedSubscription(lockId, subscription, Object.assign(utimesError, { code: "ECOMPROMISED" }));
          }
          // Retry after a short delay if another error occurred
          subscription.updateDelay = 1000;
          return scheduleLockfileUpdate(lockId, config);
        }

        // Update the subscription state and schedule the next update
        subscription.mtime = newMtime;
        subscription.lastUpdate = Date.now();
        subscription.updateDelay = null;
        scheduleLockfileUpdate(lockId, config);
      });
    });
  }, subscription.updateDelay);

  // Allow the process to exit if this is the only active timer
  if (subscription.updateTimeout.unref) {
    subscription.updateTimeout.unref();
  }
}

module.exports = scheduleLockfileUpdate;