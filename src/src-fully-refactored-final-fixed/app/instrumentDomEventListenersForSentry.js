/**
 * Instruments DOM event listeners (click and keypress) to enable Sentry event tracking and handler management.
 *
 * This function monkey-patches addEventListener and removeEventListener on EventTarget and Node prototypes
 * to ensure Sentry can attach/detach its own event handlers for click and keypress events, maintaining reference counts
 * and cleaning up as needed. It also attaches global listeners to the document for these events.
 *
 * @returns {void} Does not return a value.
 */
function instrumentDomEventListenersForSentry() {
  // Ensure 'by.document' exists before proceeding
  if (!by.document) return;

  // Create a handler function for Sentry'createInteractionAccessor DOM event tracking
  const sentryDomHandler = jE1.triggerHandlers.bind(null, "dom");

  // Wrap the handler for use as a global event listener
  const globalDomEventListener = createSentryEventHandler(sentryDomHandler, true);

  // Attach global listeners for 'click' and 'keypress' events
  by.document.addEventListener("click", globalDomEventListener, false);
  by.document.addEventListener("keypress", globalDomEventListener, false);

  // List of prototypes to patch
  ["EventTarget", "Node"].forEach((prototypeName) => {
    const prototype = by[prototypeName] && by[prototypeName].prototype;
    if (!prototype || !prototype.hasOwnProperty || !prototype.hasOwnProperty("addEventListener")) {
      return;
    }

    // Patch addEventListener to manage Sentry instrumentation handlers
    z21.fill(prototype, "addEventListener", function (originalAddEventListener) {
      return function (eventType, listener, options) {
        // Only instrument 'click' and 'keypress' events
        if (eventType === "click" || eventType === "keypress") {
          try {
            const target = this;
            // Ensure the handler store exists on the target
            const handlerStore = target.__sentry_instrumentation_handlers__ = target.__sentry_instrumentation_handlers__ || {};
            // Get or create the handler info for this event type
            const handlerInfo = handlerStore[eventType] = handlerStore[eventType] || { refCount: 0 };
            if (!handlerInfo.handler) {
              // Create a new handler for this event type
              const sentryHandler = createSentryEventHandler(sentryDomHandler);
              handlerInfo.handler = sentryHandler;
              // Attach Sentry'createInteractionAccessor handler
              originalAddEventListener.call(this, eventType, sentryHandler, options);
            }
            handlerInfo.refCount++;
          } catch (error) {
            // Silently ignore errors
          }
        }
        // Always call the original addEventListener
        return originalAddEventListener.call(this, eventType, listener, options);
      };
    });

    // Patch removeEventListener to manage Sentry instrumentation handlers
    z21.fill(prototype, "removeEventListener", function (originalRemoveEventListener) {
      return function (eventType, listener, options) {
        // Only instrument 'click' and 'keypress' events
        if (eventType === "click" || eventType === "keypress") {
          try {
            const target = this;
            const handlerStore = target.__sentry_instrumentation_handlers__ || {};
            const handlerInfo = handlerStore[eventType];
            if (handlerInfo) {
              handlerInfo.refCount--;
              // If no more references, remove Sentry'createInteractionAccessor handler
              if (handlerInfo.refCount <= 0) {
                originalRemoveEventListener.call(this, eventType, handlerInfo.handler, options);
                handlerInfo.handler = undefined;
                delete handlerStore[eventType];
              }
              // Clean up the handler store if empty
              if (Object.keys(handlerStore).length === 0) {
                delete target.__sentry_instrumentation_handlers__;
              }
            }
          } catch (error) {
            // Silently ignore errors
          }
        }
        // Always call the original removeEventListener
        return originalRemoveEventListener.call(this, eventType, listener, options);
      };
    });
  });
}

module.exports = instrumentDomEventListenersForSentry;