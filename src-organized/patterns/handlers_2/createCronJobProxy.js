/**
 * Creates a Proxy around a job class to enforce single scheduling and to wrap job execution with monitoring and cron name replacement.
 *
 * @param {Function} JobClass - The class constructor for the job to be scheduled.
 * @param {string} jobName - The unique name for the job being scheduled (used for monitoring and error messages).
 * @returns {Proxy} Proxy-wrapped job class with enhanced construct and 'from' static method.
 */
function createCronJobProxy(JobClass, jobName) {
  let jobScheduled = false;

  return new Proxy(JobClass, {
    /**
     * Intercepts 'new' operator for the JobClass.
     * Ensures only one job is scheduled and wraps the job'createInteractionAccessor execution with monitoring and cron name replacement.
     */
    construct(TargetClass, args) {
      // Destructure expected constructor arguments
      const [cronExpression, jobHandler, onTick, onComplete, timeZone, ...restArgs] = args;

      // Validate cron expression
      if (typeof cronExpression !== "string") {
        throw new Error(nYA); // nYA: Presumably an error message for invalid cron
      }
      // Prevent scheduling the same job multiple times
      if (jobScheduled) {
        throw new Error(`a job named '${jobName}' has already been scheduled`);
      }
      jobScheduled = true;

      // Replace cron names (e.g., aliases like '@daily')
      const replacedCronExpression = iYA.replaceCronNames(cronExpression);

      /**
       * Wraps the job handler with monitoring and cron metadata.
       *
       * @param {...any} handlerArgs - Arguments passed to the job handler.
       * @returns {any} Result of the job handler, monitored.
       */
      function monitoredJobHandler(...handlerArgs) {
        return lYA.withMonitor(jobName, () => {
          return jobHandler(...handlerArgs);
        }, {
          schedule: {
            type: "crontab",
            value: replacedCronExpression
          },
          timezone: timeZone || undefined
        });
      }

      // Construct the job instance, injecting the monitored handler
      return new TargetClass(
        cronExpression,
        monitoredJobHandler,
        onTick,
        onComplete,
        timeZone,
        ...restArgs
      );
    },

    /**
     * Intercepts static property access on the JobClass, specifically the 'from' method.
     * Wraps the onTick handler with monitoring and cron name replacement.
     */
    get(TargetClass, property) {
      if (property === "from") {
        // Return a wrapped 'from' static method
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
          // Prevent scheduling the same job multiple times
          if (jobScheduled) {
            throw new Error(`a job named '${jobName}' has already been scheduled`);
          }
          jobScheduled = true;

          // Replace cron names
          const replacedCronTime = iYA.replaceCronNames(cronTime);

          // Wrap the onTick handler with monitoring
          jobConfig.onTick = (...handlerArgs) => {
            return lYA.withMonitor(jobName, () => {
              return onTick(...handlerArgs);
            }, {
              schedule: {
                type: "crontab",
                value: replacedCronTime
              },
              timezone: timeZone || undefined
            });
          };

          // Call the original static 'from' method
          return TargetClass.from(jobConfig);
        };
      } else {
        // Default: forward property access
        return TargetClass[property];
      }
    }
  });
}

module.exports = createCronJobProxy;