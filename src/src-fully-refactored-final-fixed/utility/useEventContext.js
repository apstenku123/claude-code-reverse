/**
 * Retrieves the current value from the EventContext using React'createInteractionAccessor useContext hook.
 *
 * @returns {any} The current context value provided by EventContext.
 */
const React = require('react');
const { EventContext } = require('./EventContext'); // Replace with actual path to your context

const useEventContext = () => {
  // Access the current value from EventContext using React'createInteractionAccessor useContext
  return React.useContext(EventContext);
};

module.exports = useEventContext;