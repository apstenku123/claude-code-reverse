/**
 * Marks the specified lane as pending, resets suspension and pinged state if necessary,
 * and records the event time for the lane.
 *
 * @param {Object} fiberRoot - The root object representing the fiber tree. Must have 'pendingLanes', 'suspendedLanes', 'pingedLanes', and 'eventTimes' properties.
 * @param {number} lane - The bitmask representing the lane to mark as pending.
 * @param {number} eventTime - The timestamp to associate with the lane.
 * @returns {void}
 */
function markLaneAsPendingAndSetEventTime(fiberRoot, lane, eventTime) {
  // Mark the lane as pending using bitwise OR
  fiberRoot.pendingLanes |= lane;

  // If the lane is not the IdleLane (536870912), reset suspended and pinged lanes
  if (lane !== 536870912) {
    fiberRoot.suspendedLanes = 0;
    fiberRoot.pingedLanes = 0;
  }

  // Calculate the index for the eventTimes array based on the lane
  // initializeStorageWithConfig is assumed to return the index of the highest set bit in the lane bitmask
  const eventTimesIndex = 31 - initializeStorageWithConfig(lane);

  // Set the event time for the lane
  fiberRoot.eventTimes[eventTimesIndex] = eventTime;
}

module.exports = markLaneAsPendingAndSetEventTime;