/**
 * Creates a Vue component and plugin for syntax highlighting using highlight.js.
 *
 * @param {object} highlightJsInstance - The highlight.js instance to use for highlighting code.
 * @returns {object} An object containing the Vue component and Vue plugin for highlight.js integration.
 */
function createHighlightJsVueComponent(highlightJsInstance) {
  /**
   * Vue component definition for syntax highlighting code blocks.
   */
  const highlightJsComponent = {
    props: ["language", "code", "autodetect"],
    data() {
      return {
        detectedLanguage: "", // The language detected or specified for highlighting
        unknownLanguage: false // Flag indicating if the language is unknown
      };
    },
    computed: {
      /**
       * Computes the CSS class for the code block based on the detected language.
       * Returns an empty string if the language is unknown.
       */
      className() {
        if (this.unknownLanguage) return "";
        return `hljs ${this.detectedLanguage}`;
      },

      /**
       * Returns the highlighted HTML for the code block.
       * Handles language detection and error reporting for unknown languages.
       */
      highlighted() {
        // If auto-detection is off and the specified language is not found
        if (!this.autoDetect && !highlightJsInstance.getLanguage(this.language)) {
          console.warn(`The language \"${this.language}\" you specified could not be found.`);
          this.unknownLanguage = true;
          // vf is assumed to be a fallback function for code highlighting
          return vf(this.code);
        }

        let highlightResult = {};
        if (this.autoDetect) {
          // Use highlight.js auto-detection
          highlightResult = highlightJsInstance.highlightAuto(this.code);
          this.detectedLanguage = highlightResult.language;
        } else {
          // Use highlight.js with the specified language
          highlightResult = highlightJsInstance.highlight(this.language, this.code, this.ignoreIllegals);
          this.detectedLanguage = this.language;
        }
        return highlightResult.value;
      },

      /**
       * Determines if language auto-detection should be used.
       * Returns true if no language is specified or if autodetect prop is truthy.
       */
      autoDetect() {
        // qd9 is assumed to be a utility function to check the autodetect prop
        return !this.language || qd9(this.autodetect);
      },

      /**
       * Always returns true to ignore illegal syntax errors during highlighting.
       */
      ignoreIllegals() {
        return true;
      }
    },
    /**
     * Renders the highlighted code block using Vue'createInteractionAccessor render function.
     * @param {function} createElement - Vue'createInteractionAccessor createElement function (usually 'h').
     * @returns {VNode}
     */
    render(createElement) {
      return createElement("pre", {}, [
        createElement("code", {
          class: this.className,
          domProps: {
            innerHTML: this.highlighted
          }
        })
      ]);
    }
  };

  /**
   * Vue plugin for registering the highlight.js component globally.
   */
  const highlightJsVuePlugin = {
    install(VueInstance) {
      VueInstance.component("highlightjs", highlightJsComponent);
    }
  };

  return {
    Component: highlightJsComponent,
    VuePlugin: highlightJsVuePlugin
  };
}

module.exports = createHighlightJsVueComponent;