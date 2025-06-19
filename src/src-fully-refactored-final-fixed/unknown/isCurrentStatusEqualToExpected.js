/**
 * Checks if the current status matches the expected status.
 *
 * @returns {boolean} True if the current status equals the expected status, otherwise false.
 */
const isCurrentStatusEqualToExpected = () => {
  // Compare the current status to the expected status
  return currentStatus === expectedStatus;
};

module.exports = isCurrentStatusEqualToExpected;