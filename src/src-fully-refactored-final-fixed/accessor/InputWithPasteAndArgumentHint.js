/**
 * Renders an input component with advanced paste handling, placeholder logic, and optional argument hint display.
 *
 * @param {Object} props - The properties for the input component.
 * @param {Object} props.inputState - State object containing input handlers and rendered value.
 * @param {React.ReactNode} props.children - Child elements to render within the input.
 * @param {boolean} props.terminalFocus - Whether the terminal is focused.
 * @param {Function} [props.onPaste] - Handler for paste events.
 * @param {Function} [props.onImagePaste] - Handler for image paste events.
 * @param {Function} [props.onIsPastingChange] - Callback when paste state changes.
 * @param {string} [props.placeholder] - Placeholder text.
 * @param {string} [props.value] - Current input value.
 * @param {boolean} [props.showCursor] - Whether to show the cursor.
 * @param {boolean} [props.focus] - Whether the input is focused.
 * @param {string} [props.argumentHint] - Optional argument hint to display.
 * @returns {React.ReactElement} The rendered input component.
 */
function InputWithPasteAndArgumentHint({
  inputState,
  children,
  terminalFocus,
  ...otherProps
}) {
  // Destructure input state
  const {
    onInput: handleInput,
    renderedValue
  } = inputState;

  // Get theme styles
  const themeStyles = getThemeStylesheet();

  // Create paste and input event handlers
  const {
    wrappedOnInput,
    isPasting
  } = createPasteInputHandler({
    onPaste: otherProps.onPaste,
    onInput: (inputValue, event) => {
      // Prevent input handler if currently pasting and event signals to return
      if (isPasting && event.return) return;
      handleInput(inputValue, event);
    },
    onImagePaste: otherProps.onImagePaste
  });

  // Notify parent when paste state changes
  const {
    onIsPastingChange
  } = otherProps;
  Qo.default.useEffect(() => {
    if (onIsPastingChange) onIsPastingChange(isPasting);
  }, [isPasting, onIsPastingChange]);

  // Determine placeholder display logic
  const {
    showPlaceholder,
    renderedPlaceholder
  } = renderPlaceholderWithCursor({
    placeholder: otherProps.placeholder,
    value: otherProps.value,
    showCursor: otherProps.showCursor,
    focus: otherProps.focus,
    terminalFocus
  });

  // Register input handler for focus state
  D0(wrappedOnInput, {
    isActive: otherProps.focus
  });

  // Determine if argument hint should be shown
  // Show if value is a single word or ends with a space, and starts with '/'
  const valueIsSingleWordOrEndsWithSpace = (
    otherProps.value && otherProps.value.trim().indexOf(' ') === -1
  ) || (
    otherProps.value && otherProps.value.endsWith(' ')
  );
  const showArgumentHint = Boolean(
    otherProps.argumentHint &&
    otherProps.value &&
    valueIsSingleWordOrEndsWithSpace &&
    otherProps.value.startsWith('/')
  );

  // Render input with placeholder, value, and argument hint if applicable
  return Qo.default.createElement(
    g,
    null,
    Qo.default.createElement(
      _,
      { wrap: 'truncate-end' },
      showPlaceholder ? renderedPlaceholder : renderedValue,
      showArgumentHint && Qo.default.createElement(
        _,
        { color: themeStyles.secondaryText },
        otherProps.value?.endsWith(' ') ? '' : ' ',
        otherProps.argumentHint
      ),
      children
    )
  );
}

module.exports = InputWithPasteAndArgumentHint;