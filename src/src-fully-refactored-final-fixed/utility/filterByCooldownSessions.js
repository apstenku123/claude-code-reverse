/**
 * Filters an array of session objects, returning only those where the number of completed sessions (as determined by getStartupDeltaFromTipHistory) is greater than or equal to the required cooldown sessions.
 *
 * @param {Array<Object>} sessions - Array of session objects to filter. Each object must have an 'id' and 'cooldownSessions' property.
 * @returns {Array<Object>} Filtered array of session objects meeting the cooldown criteria.
 */
function filterByCooldownSessions(sessions) {
  return sessions.filter(session => {
    // getStartupDeltaFromTipHistory(session.id) returns the number of completed sessions for this session id
    // Only include the session if completed sessions >= required cooldown sessions
    return getStartupDeltaFromTipHistory(session.id) >= session.cooldownSessions;
  });
}

module.exports = filterByCooldownSessions;