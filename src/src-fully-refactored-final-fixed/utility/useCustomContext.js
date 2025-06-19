/**
 * Retrieves the current value from the CustomContext using React'createInteractionAccessor useContext hook.
 *
 * @returns {*} The current context value provided by CustomContext.Provider.
 */
const React = require('react');
const { CustomContext } = require('./CustomContext');

const useCustomContext = () => {
  // Access the current value of CustomContext
  return React.useContext(CustomContext);
};

module.exports = useCustomContext;