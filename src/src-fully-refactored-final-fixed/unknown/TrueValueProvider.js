/**
 * Provides a React context with a value of true to its children.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {React.ReactElement} The provider component wrapping the children.
 */
function TrueValueProvider({ children }) {
  // Render the context provider with value set to true, passing down all children
  return rV.createElement(Kn0.Provider, { value: true }, children);
}

module.exports = TrueValueProvider;