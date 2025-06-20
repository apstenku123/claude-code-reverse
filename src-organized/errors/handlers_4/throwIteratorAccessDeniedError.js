/**
 * Throws a RangeError indicating that iterator access is denied.
 *
 * @throws {RangeError} Always throws to prevent iterator access.
 */
function throwIteratorAccessDeniedError() {
  // Prevents access to the iterator by always throwing a RangeError
  throw new RangeError("Iterator access denied!");
}

module.exports = throwIteratorAccessDeniedError;