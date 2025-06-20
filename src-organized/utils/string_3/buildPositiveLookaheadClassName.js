/**
 * Builds a class name string wrapped in a positive lookahead pattern.
 *
 * This function uses the combineClassNames utility to process the provided class name(createInteractionAccessor),
 * and wraps the result in a positive lookahead regular expression pattern: '(?=...)'.
 *
 * @param {string} className - The class name or class name expression to wrap in a positive lookahead pattern.
 * @returns {string} The processed class name string wrapped in a positive lookahead pattern.
 */
function buildPositiveLookaheadClassName(className) {
  // Use combineClassNames to process the input and wrap isBlobOrFileLikeObject in a positive lookahead regex pattern
  return combineClassNames('(?=', className, ')');
}

module.exports = buildPositiveLookaheadClassName;