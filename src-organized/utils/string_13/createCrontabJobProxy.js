/**
 * Creates a Proxy around a crontab job class to enforce single scheduling and inject monitoring logic.
 *
 * @param {Function} CrontabJobClass - The class constructor for the crontab job.
 * @param {string} jobName - The unique name for the scheduled job.
 * @returns {Proxy} Proxy that wraps the crontab job class with scheduling and monitoring logic.
 */
function createCrontabJobProxy(CrontabJobClass, jobName) {
  let hasBeenScheduled = false;

  return new Proxy(CrontabJobClass, {
    /**
     * Intercepts the construction of a new crontab job instance.
     * Ensures only one job with the given name is scheduled and injects monitoring logic.
     */
    construct(TargetClass, constructorArgs) {
      // Destructure expected constructor arguments
      const [cronExpression, onTick, arg3, arg4, timeZone, ...restArgs] = constructorArgs;

      // Validate cron expression
      if (typeof cronExpression !== "string") {
        throw new Error(nYA); // nYA: Presumably an error message for invalid cron
      }

      // Prevent scheduling multiple jobs with the same name
      if (hasBeenScheduled) {
        throw new Error(`a job named '${jobName}' has already been scheduled`);
      }
      hasBeenScheduled = true;

      // Replace named cron expressions with actual cron strings
      const parsedCronExpression = iYA.replaceCronNames(cronExpression);

      /**
       * Wrapper for the onTick callback that injects monitoring logic.
       *
       * @param {...any} callbackArgs - Arguments passed to the onTick callback.
       * @returns {any} Result of the onTick callback.
       */
      function monitoredOnTick(...callbackArgs) {
        return lYA.withMonitor(
          jobName,
          () => onTick(...callbackArgs),
          {
            schedule: {
              type: "crontab",
              value: parsedCronExpression
            },
            timezone: timeZone || undefined
          }
        );
      }

      // Construct the crontab job instance with the monitored onTick
      return new TargetClass(
        cronExpression,
        monitoredOnTick,
        arg3,
        arg4,
        timeZone,
        ...restArgs
      );
    },

    /**
     * Intercepts property access on the class, specifically handling the 'from' static method.
     * Ensures single scheduling and injects monitoring logic into the onTick property.
     */
    get(TargetClass, property) {
      if (property === "from") {
        /**
         * Proxy for the static 'from' method to inject monitoring logic.
         *
         * @param {Object} jobConfig - Configuration object for the crontab job.
         * @param {string} jobConfig.cronTime - The cron expression string.
         * @param {Function} jobConfig.onTick - The callback to execute on schedule.
         * @param {string} [jobConfig.timeZone] - Optional timezone.
         * @returns {any} Result of TargetClass.from with monitored onTick.
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

          // Prevent scheduling multiple jobs with the same name
          if (hasBeenScheduled) {
            throw new Error(`a job named '${jobName}' has already been scheduled`);
          }
          hasBeenScheduled = true;

          // Replace named cron expressions with actual cron strings
          const parsedCronTime = iYA.replaceCronNames(cronTime);

          // Wrap the onTick callback with monitoring logic
          jobConfig.onTick = (...callbackArgs) => {
            return lYA.withMonitor(
              jobName,
              () => onTick(...callbackArgs),
              {
                schedule: {
                  type: "crontab",
                  value: parsedCronTime
                },
                timezone: timeZone || undefined
              }
            );
          };

          // Call the original static 'from' method with the modified config
          return TargetClass.from(jobConfig);
        };
      } else {
        // For all other properties, return as-is
        return TargetClass[property];
      }
    }
  });
}

module.exports = createCrontabJobProxy;