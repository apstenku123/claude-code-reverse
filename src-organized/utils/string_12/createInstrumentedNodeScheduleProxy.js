/**
 * Creates a Proxy around a node-schedule module instance to automatically instrument calls to scheduleJob.
 * When scheduleJob is called with a job name and a crontab string, isBlobOrFileLikeObject wraps the call with monitoring logic.
 *
 * @param {object} nodeScheduleModule - The node-schedule module or compatible object to be instrumented.
 * @returns {object} a Proxy-wrapped version of the node-schedule module with instrumented scheduleJob.
 */
function createInstrumentedNodeScheduleProxy(nodeScheduleModule) {
  return new Proxy(nodeScheduleModule, {
    /**
     * Intercepts property access on the node-schedule module.
     * If the property is 'scheduleJob', returns a Proxy that instruments the method.
     * Otherwise, returns the original property.
     */
    get(targetModule, propertyKey) {
      if (propertyKey === "scheduleJob") {
        // Return a proxy that instruments the scheduleJob method
        return new Proxy(targetModule.scheduleJob, {
          /**
           * Intercepts calls to scheduleJob, adding monitoring if arguments are valid.
           * @param {Function} originalMethod - The original scheduleJob function.
           * @param {object} thisArg - The value of 'this' provided for the call.
           * @param {Array} argumentsList - The arguments passed to scheduleJob.
           * @returns {*} The result of the original scheduleJob, possibly wrapped with monitoring.
           */
          apply(originalMethod, thisArg, argumentsList) {
            const [jobName, cronExpression] = argumentsList;

            // Validate argument types
            if (typeof jobName !== "string" || typeof cronExpression !== "string") {
              throw new Error(
                "Automatic instrumentation of 'node-schedule' requires the first parameter of 'scheduleJob' to be a job name string and the second parameter to be a crontab string"
              );
            }

            // Instrument the scheduleJob call with monitoring
            return qY9.withMonitor(
              jobName,
              () => {
                // Call the original scheduleJob method
                return originalMethod.apply(thisArg, argumentsList);
              },
              {
                schedule: {
                  type: "crontab",
                  value: MY9.replaceCronNames(cronExpression)
                }
              }
            );
          }
        });
      }
      // For all other properties, return as-is
      return targetModule[propertyKey];
    }
  });
}

module.exports = createInstrumentedNodeScheduleProxy;