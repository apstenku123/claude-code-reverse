/**
 * Handles a misplaced doctype error by invoking the error handler on the provided parser instance.
 *
 * @param {Object} parserInstance - The parser instance that encountered the misplaced doctype.
 * @returns {void}
 */
function handleMisplacedDoctypeError(parserInstance) {
  // Notify the parser instance of a misplaced doctype error
  parserInstance._err(xG.misplacedDoctype);
}

module.exports = handleMisplacedDoctypeError;