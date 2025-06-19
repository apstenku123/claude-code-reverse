/**
 * Retrieves a component from the application'createInteractionAccessor context by its key.
 *
 * @function getComponentByKey
 * @param {string} componentKey - The key identifying the desired component.
 * @returns {any} The component associated with the provided key, or undefined if not found.
 */
const getComponentByKey = (componentKey) => {
  // Access the application'createInteractionAccessor context using React'createInteractionAccessor useContext hook
  // La is assumed to be React, and Ux4 is the context object
  const appContext = La.useContext(Ux4);

  // Retrieve the components object from the context
  const { components } = appContext;

  // Return the component associated with the provided key
  return components[componentKey];
};

module.exports = getComponentByKey;
