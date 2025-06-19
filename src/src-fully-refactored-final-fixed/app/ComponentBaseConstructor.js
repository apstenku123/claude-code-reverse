/**
 * Initializes the base properties for a component instance.
 *
 * @param {Object} props - The properties passed to the component instance.
 * @param {Object} context - The context object provided to the component instance.
 * @param {Object} [updater] - Optional updater object for managing state updates. Defaults to CWA if not provided.
 */
function ComponentBaseConstructor(props, context, updater) {
  // Assign the incoming props to the instance
  this.props = props;
  // Assign the context to the instance
  this.context = context;
  // Initialize refs with the default KWA object
  this.refs = KWA;
  // Use the provided updater or fall back to the default CWA
  this.updater = updater || CWA;
}

module.exports = ComponentBaseConstructor;