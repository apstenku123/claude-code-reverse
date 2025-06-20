/**
 * Provides a React context with a constant value of true to its children.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {React.ReactElement} The provider component wrapping the children.
 */
function AlwaysTrueProvider({ children }) {
  // Render the context provider with value set to true
  return ux1.default.createElement(
    VG0.Provider,
    { value: true },
    children
  );
}

module.exports = AlwaysTrueProvider;