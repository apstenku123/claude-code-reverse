/**
 * Initializes core properties for a component instance.
 *
 * @param {object} props - The properties (props) passed to the component.
 * @param {object} context - The context object for the component.
 * @param {object} [updater] - Optional updater object; if not provided, defaults to CWA.
 */
function initializeComponentProperties(props, context, updater) {
  // Assign the incoming props to the component instance
  this.props = props;
  // Assign the context to the component instance
  this.context = context;
  // Assign a default reference object to the component instance
  this.refs = KWA;
  // Assign the updater, defaulting to CWA if not provided
  this.updater = updater || CWA;
}

module.exports = initializeComponentProperties;