/**
 * Factory function that creates a handler for managing permanent tool permission requests.
 * The returned callback evaluates tool permissions, handles user prompts, logs analytics, and manages abort scenarios.
 *
 * @param {Function} processInteractionEntries - Function to process and update the list of interaction entries.
 * @returns {Function} useCallback handler for tool permission requests.
 */
function createPermanentToolPermissionHandler(processInteractionEntries) {
  return US2.useCallback(
    /**
     * Handles a tool permission request, evaluating config, prompting user if needed, and logging analytics.
     *
     * @param {Object} toolConfig - The tool configuration object (must have .name and .description).
     * @param {any} toolInput - The input provided to the tool.
     * @param {Object} toolUseContext - Context for the tool use (includes abortController, options, etc).
     * @param {Object} assistantMessageContext - Context for the assistant message (includes .message.id).
     * @returns {Promise<Object>} Resolves with the permission result object.
     */
    async (
      toolConfig,
      toolInput,
      toolUseContext,
      assistantMessageContext
    ) => {
      return new Promise(resolve => {
        /**
         * Logs a tool use cancellation event.
         */
        function logToolUseCancelled() {
          logTelemetryEventIfEnabled("tengu_tool_use_cancelled", {
            messageID: assistantMessageContext.message.id,
            toolName: toolConfig.name
          });
        }

        /**
         * Resolves with an 'ask' behavior and aborts the current tool use.
         */
        function resolveAsAskAndAbort() {
          resolve({
            behavior: "ask",
            message: ce // ce is assumed to be defined in the outer scope
          });
          toolUseContext.abortController.abort();
        }

        // If the tool use was already aborted, log and resolve as 'ask'
        if (toolUseContext.abortController.signal.aborted) {
          logToolUseCancelled();
          resolveAsAskAndAbort();
          return;
        }

        // Evaluate tool permission based on config and context
        return evaluateToolPermission(
          toolConfig,
          toolInput,
          toolUseContext,
          assistantMessageContext
        )
          .then(async permissionResult => {
            if (permissionResult.behavior === "allow") {
              // Log granted event
              logTelemetryEventIfEnabled("tengu_tool_use_granted_in_config", {
                messageID: assistantMessageContext.message.id,
                toolName: toolConfig.name
              });
              // If analytics enabled, record acceptance
              if (HA1(toolConfig.name)) {
                Fy()?.add(1, {
                  decision: "accept",
                  source: "config",
                  tool_name: toolConfig.name
                });
              }
              // Update analytics
              zA1(toolConfig.name, "accept", "config");
              // Resolve with the permission result
              resolve({
                ...permissionResult,
                updatedInput: toolInput,
                userModified: false
              });
              return;
            }

            // Get tool description for prompt
            const toolDescription = await toolConfig.description(toolInput, {
              isNonInteractiveSession: toolUseContext.options.isNonInteractiveSession,
              getToolPermissionContext: toolUseContext.getToolPermissionContext,
              tools: toolUseContext.options.tools
            });

            // If aborted after description, log and resolve as 'ask'
            if (toolUseContext.abortController.signal.aborted) {
              logToolUseCancelled();
              resolveAsAskAndAbort();
              return;
            }

            switch (permissionResult.behavior) {
              case "deny": {
                // Log denied event
                logTelemetryEventIfEnabled("tengu_tool_use_denied_in_config", {
                  messageID: assistantMessageContext.message.id,
                  toolName: toolConfig.name
                });
                // If analytics enabled, record rejection
                if (HA1(toolConfig.name)) {
                  Fy()?.add(1, {
                    decision: "reject",
                    source: "config",
                    tool_name: toolConfig.name
                  });
                }
                // Update analytics
                zA1(toolConfig.name, "reject", "config");
                // Resolve with the permission result
                resolve(permissionResult);
                return;
              }
              case "ask": {
                // Add a new interaction entry for user prompt
                processInteractionEntries(previousEntries => [
                  ...previousEntries,
                  {
                    assistantMessage: assistantMessageContext,
                    tool: toolConfig,
                    description: toolDescription,
                    input: toolInput,
                    toolUseContext,
                    permissionResult,
                    /**
                     * Handler for aborting the tool use from the prompt.
                     */
                    onAbort() {
                      logToolUseCancelled();
                      logTelemetryEventIfEnabled("tengu_tool_use_rejected_in_prompt", {
                        messageID: assistantMessageContext.message.id,
                        toolName: toolConfig.name
                      });
                      if (HA1(toolConfig.name)) {
                        Fy()?.add(1, {
                          decision: "reject",
                          source: "user_abort",
                          tool_name: toolConfig.name
                        });
                      }
                      zA1(toolConfig.name, "reject", "user_abort");
                      resolveAsAskAndAbort();
                    },
                    /**
                     * Handler for allowing the tool use from the prompt.
                     * @param {string} permissionType - 'permanent' or 'temporary'.
                     * @param {any} updatedInput - The possibly updated tool input.
                     */
                    onAllow(permissionType, updatedInput) {
                      if (permissionType === "permanent") {
                        logTelemetryEventIfEnabled("tengu_tool_use_granted_in_prompt_permanent", {
                          messageID: assistantMessageContext.message.id,
                          toolName: toolConfig.name
                        });
                      } else {
                        logTelemetryEventIfEnabled("tengu_tool_use_granted_in_prompt_temporary", {
                          messageID: assistantMessageContext.message.id,
                          toolName: toolConfig.name
                        });
                      }
                      if (HA1(toolConfig.name)) {
                        Fy()?.add(1, {
                          decision: "accept",
                          source:
                            permissionType === "permanent"
                              ? "user_permanent"
                              : "user_temporary",
                          tool_name: toolConfig.name
                        });
                      }
                      const analyticsSource =
                        permissionType === "permanent"
                          ? "user_permanent"
                          : "user_temporary";
                      zA1(toolConfig.name, "accept", analyticsSource);
                      // Determine if the input was modified by the user
                      const userModified = toolConfig.inputsEquivalent
                        ? !toolConfig.inputsEquivalent(toolInput, updatedInput)
                        : false;
                      resolve({
                        behavior: "allow",
                        updatedInput,
                        userModified
                      });
                    },
                    /**
                     * Handler for rejecting the tool use from the prompt.
                     */
                    onReject() {
                      logTelemetryEventIfEnabled("tengu_tool_use_rejected_in_prompt", {
                        messageID: assistantMessageContext.message.id,
                        toolName: toolConfig.name
                      });
                      if (HA1(toolConfig.name)) {
                        Fy()?.add(1, {
                          decision: "reject",
                          source: "user_reject",
                          tool_name: toolConfig.name
                        });
                      }
                      zA1(toolConfig.name, "reject", "user_reject");
                      resolveAsAskAndAbort();
                    }
                  }
                ]);
                return;
              }
              // No default
            }
          })
          .catch(error => {
            // If error is an abort, log and resolve as 'ask', else log error
            if (error instanceof KG) {
              logToolUseCancelled();
              resolveAsAskAndAbort();
            } else {
              reportErrorIfAllowed(error);
            }
          });
      });
    },
    [processInteractionEntries]
  );
}

module.exports = createPermanentToolPermissionHandler;