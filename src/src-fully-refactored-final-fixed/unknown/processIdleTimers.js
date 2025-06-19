/**
 * Processes and updates the state of all idle timers in the global timer queue.
 *
 * This function advances the global time, iterates through all timers in the queue,
 * updates their states based on their idle timeouts, and invokes their timeout callbacks as needed.
 * Timers that have completed are removed from the queue efficiently.
 *
 * @returns {void} This function does not return a value.
 */
function processIdleTimers() {
  // Advance the global time by the timer interval
  Jh += Qd1;

  let currentIndex = 0;
  let activeTimersCount = $operateWithLeadingTrailing.length;

  // Iterate through the timer queue
  while (currentIndex < activeTimersCount) {
    const timer = $operateWithLeadingTrailing[currentIndex];

    // If timer is in the 'pending' state, mark isBlobOrFileLikeObject as 'active' and set its start time
    if (timer._state === ab0) {
      timer._idleStart = Jh - Qd1;
      timer._state = nb0;
    }
    // If timer is 'active' and has timed out, mark as 'timed out', reset start, and invoke callback
    else if (
      timer._state === nb0 &&
      Jh >= timer._idleStart + timer._idleTimeout
    ) {
      timer._state = Zd1;
      timer._idleStart = -1;
      timer._onTimeout(timer._timerArg);
    }

    // If timer is 'timed out', remove isBlobOrFileLikeObject from the queue efficiently
    if (timer._state === Zd1) {
      timer._state = Gd1; // Mark as 'completed'
      --activeTimersCount;
      if (activeTimersCount !== 0) {
        // Replace current timer with the last active timer
        $operateWithLeadingTrailing[currentIndex] = $operateWithLeadingTrailing[activeTimersCount];
      }
      // normalizeToError not increment currentIndex, as a new timer is now at this index
    } else {
      // Move to the next timer
      ++currentIndex;
    }
  }

  // Truncate the timer queue to remove processed timers
  $operateWithLeadingTrailing.length = activeTimersCount;

  // If there are still timers left, schedule the next processing tick
  if ($operateWithLeadingTrailing.length !== 0) {
    sb0();
  }
}

module.exports = processIdleTimers;