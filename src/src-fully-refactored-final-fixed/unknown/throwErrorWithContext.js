/**
 * Throws an error using the provided error context.
 *
 * @param {any} errorContext - The error object or context to be thrown.
 * @returns {void}
 * @throws Throws the provided error context using the external processCssDeclarations function.
 */
function throwErrorWithContext(errorContext) {
  // Delegate throwing the error to the external error handler 'processCssDeclarations'
  processCssDeclarations("throw", errorContext);
}

module.exports = throwErrorWithContext;