/**
 * Marks a lane as pending, resets suspended and pinged lanes if necessary,
 * and records the event time for a specific lane.
 *
 * @param {object} fiberRoot - The root object representing the fiber tree state.
 *   Expected to have properties: pendingLanes (number), suspendedLanes (number),
 *   pingedLanes (number), and eventTimes (array or object).
 * @param {number} lane - The lane bitmask to mark as pending and to update event time for.
 * @param {number} eventTime - The timestamp or value to record for the lane.
 * @returns {void}
 */
function markLanePendingAndSetEventTime(fiberRoot, lane, eventTime) {
  // Mark the specified lane as pending using bitwise OR
  fiberRoot.pendingLanes |= lane;

  // If the lane is not the IdleLane (536870912), reset suspended and pinged lanes
  const IDLE_LANE = 536870912;
  if (lane !== IDLE_LANE) {
    fiberRoot.suspendedLanes = 0;
    fiberRoot.pingedLanes = 0;
  }

  // Calculate the index for the eventTimes array/object
  // initializeStorageWithConfig is assumed to return the index of the highest set bit in the lane bitmask
  const eventTimeIndex = 31 - initializeStorageWithConfig(lane);

  // Set the event time for the specified lane
  fiberRoot.eventTimes[eventTimeIndex] = eventTime;
}

module.exports = markLanePendingAndSetEventTime;