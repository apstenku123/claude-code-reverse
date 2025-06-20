/**
 * Creates a Proxy that wraps a job constructor or scheduler, enforcing single scheduling per job name and
 * integrating monitoring and cron expression normalization. Supports both direct construction and static 'from' method.
 *
 * @param {Function} JobConstructor - The constructor function or class for the job to be scheduled.
 * @param {string} jobName - The unique name of the job being scheduled.
 * @returns {Proxy} Proxy that enforces single scheduling and wraps job logic with monitoring and cron normalization.
 */
function getCrontabProxy(JobConstructor, jobName) {
  let hasScheduled = false;

  return new Proxy(JobConstructor, {
    /**
     * Intercepts 'new' operator for job construction.
     * @param {Function} TargetConstructor - The original constructor function.
     * @param {Array} args - Arguments passed to the constructor.
     * @returns {Object} Instance of the job, with monitoring and cron normalization applied.
     */
    construct(TargetConstructor, args) {
      // Destructure expected constructor arguments
      const [cronExpression, onTick, arg3, arg4, timeZone, ...restArgs] = args;

      // Validate cron expression
      if (typeof cronExpression !== "string") {
        throw new Error(nYA);
      }

      // Prevent scheduling the same job more than once
      if (hasScheduled) {
        throw new Error(`a job named '${jobName}' has already been scheduled`);
      }
      hasScheduled = true;

      // Normalize cron expression
      const normalizedCron = iYA.replaceCronNames(cronExpression);

      /**
       * Wrapped onTick handler with monitoring and schedule metadata.
       * @param {...any} onTickArgs - Arguments passed to the onTick handler.
       * @returns {any} Result of the original onTick handler, wrapped with monitoring.
       */
      function monitoredOnTick(...onTickArgs) {
        return lYA.withMonitor(jobName, () => {
          return onTick(...onTickArgs);
        }, {
          schedule: {
            type: "crontab",
            value: normalizedCron
          },
          timezone: timeZone || undefined
        });
      }

      // Construct the job instance with the wrapped onTick handler
      return new TargetConstructor(
        cronExpression,
        monitoredOnTick,
        arg3,
        arg4,
        timeZone,
        ...restArgs
      );
    },

    /**
     * Intercepts property access, specifically handling the static 'from' method.
     * @param {Function} TargetConstructor - The original constructor function.
     * @param {string|symbol} property - The property being accessed.
     * @returns {any} The property value or a wrapped 'from' method.
     */
    get(TargetConstructor, property) {
      if (property === "from") {
        /**
         * Wrapped static 'from' method that enforces single scheduling and wraps onTick with monitoring.
         * @param {Object} jobConfig - Configuration object for the job.
         * @returns {Object} Result of the original 'from' method, with monitoring applied.
         */
        return jobConfig => {
          const {
            cronTime,
            onTick,
            timeZone
          } = jobConfig;

          // Validate cron expression
          if (typeof cronTime !== "string") {
            throw new Error(nYA);
          }

          // Prevent scheduling the same job more than once
          if (hasScheduled) {
            throw new Error(`a job named '${jobName}' has already been scheduled`);
          }
          hasScheduled = true;

          // Normalize cron expression
          const normalizedCron = iYA.replaceCronNames(cronTime);

          // Wrap the onTick handler with monitoring and schedule metadata
          jobConfig.onTick = (...onTickArgs) => {
            return lYA.withMonitor(jobName, () => {
              return onTick(...onTickArgs);
            }, {
              schedule: {
                type: "crontab",
                value: normalizedCron
              },
              timezone: timeZone || undefined
            });
          };

          // Call the original static 'from' method
          return TargetConstructor.from(jobConfig);
        };
      } else {
        // Forward all other property accesses
        return TargetConstructor[property];
      }
    }
  });
}

module.exports = getCrontabProxy;