// gemini_anthropic_sdk_wrapper.js
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

class GeminiAnthropicSDKWrapper {
    constructor(geminiApiKey, targetModelName = "gemini-2.5-pro-preview-05-06") {
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        this.geminiModel = genAI.getGenerativeModel({ 
            model: targetModelName,
            safetySettings: [ // Example safety settings
                { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
                { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
                { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
                { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
            ]
        });
        this.currentToolCalls = new Map(); 
        this.debug = process.env.DEBUG_GEMINI_WRAPPER === 'true'; // Enable debug logging if DEBUG_GEMINI_WRAPPER is set
    }

    beta = { // Structure to mimic Anthropic SDK if it uses client.beta.messages.stream
        messages: {
            stream: async (claudeRequestPayload, claudeRequestOptions) => {
                if (this.debug) {
                    console.log("[GeminiWrapper] Claude Request Payload:", JSON.stringify(claudeRequestPayload, null, 2));
                    console.log("[GeminiWrapper] Claude Request Options:", JSON.stringify(claudeRequestOptions, null, 2));
                }
                const geminiRequest = this._transformClaudeRequestToGemini(claudeRequestPayload);
                const signal = claudeRequestOptions?.signal;

                if (this.debug) {
                    console.log("[GeminiWrapper] Gemini Request (transformed):", JSON.stringify(geminiRequest, null, 2));
                }

                const streamResult = await this.geminiModel.generateContentStream(geminiRequest, { signal });
                
                // The stream object returned by _adaptGeminiStreamToClaudeStream needs finalMessage and request_id
                return this._adaptGeminiStreamToClaudeStream(streamResult, claudeRequestPayload, geminiRequest);
            },

           // Changed to arrow function to correctly bind `this`
           countTokens: async (claudeRequestPayload) => { 
               if (this.debug) {
                   console.log("[GeminiWrapper] countTokens - Claude Request Payload:", JSON.stringify(claudeRequestPayload, null, 2));
               }

               const geminiContents = [];
               // Simplified message transformation, focusing on text content for token counting
               // This part is adapted from _transformClaudeRequestToGemini
               if (claudeRequestPayload.messages) {
                   claudeRequestPayload.messages.forEach(claudeMessage => {
                       let geminiRole;
                       if (claudeMessage.role === "user") {
                           geminiRole = "user";
                       } else if (claudeMessage.role === "assistant") {
                           geminiRole = "model";
                       } else {
                           geminiRole = claudeMessage.role; // Pass through
                       }
                       
                       const geminiContent = { role: geminiRole, parts: [] };
           
                       if (typeof claudeMessage.content === 'string') {
                           geminiContent.parts.push({ text: claudeMessage.content });
                       } else if (Array.isArray(claudeMessage.content)) {
                           claudeMessage.content.forEach(contentBlock => {
                               if (contentBlock.type === "text") {
                                   geminiContent.parts.push({ text: contentBlock.text });
                               } else if (contentBlock.type === "tool_use") {
                                   // For token counting, the name and stringified input are relevant
                                   geminiContent.parts.push({
                                       functionCall: {
                                           name: contentBlock.name,
                                           args: contentBlock.input,
                                       }
                                   });
                               } else if (contentBlock.type === "tool_result") {
                                   // For token counting, the name and stringified output are relevant
                                   const toolCallId = contentBlock.tool_use_id;
                                   // Attempt to find original tool name, crucial for Gemini's FunctionResponse
                                   const originalToolCall = this.currentToolCalls ? this.currentToolCalls.get(toolCallId) : null;
                                   let toolName = originalToolCall ? originalToolCall.name : (contentBlock.name || "unknown_tool_for_result");

                                   let responseData = {};
                                   if (contentBlock.is_error) {
                                       responseData = { error: String(contentBlock.content) || "Tool execution failed." };
                                   } else if (typeof contentBlock.content === 'string') {
                                       responseData = { result: contentBlock.content };
                                   } else if (typeof contentBlock.content === 'object' && contentBlock.content !== null) {
                                       responseData = { result: contentBlock.content };
                                   } else if (contentBlock.content !== undefined) {
                                       responseData = { result: String(contentBlock.content) };
                                   } else {
                                       responseData = { result: null };
                                   }
                                   geminiContent.parts.push({
                                       functionResponse: {
                                           name: toolName,
                                           response: responseData
                                       }
                                   });
                               }
                               // Other types like image are not handled here for simplicity in token counting
                           });
                       }
                       geminiContents.push(geminiContent);
                   });
               }

               try {
                   const { totalTokens } = await this.geminiModel.countTokens({ contents: geminiContents });
                   if (this.debug) {
                       console.log("[GeminiWrapper] countTokens - Gemini Response:", { totalTokens });
                   }
                   // Anthropic's countTokens likely returns an object like { count: number }
                   // Based on cli.js: `await I.beta.messages.countTokens(...)` seems to expect a direct number or an object from which a number is extracted.
                   // Let's assume it expects an object { count: number } for now.
                   // The cli.js code `I.beta.messages.countTokens(...).then((A) => A.count)` would imply it returns {count: X}
                   // However, the direct usage in lW1 `await I.beta.messages.countTokens(...)` suggests it might return the number directly or an object that can be awaited.
                   // The most common SDK pattern is an object. If cli.js expects a number directly, this might need adjustment.
                   // For now, matching the common pattern of returning an object:
                   return { count: totalTokens };
               } catch (error) {
                   console.error("[GeminiWrapper] Error in countTokens:", error);
                   // Mimic Anthropic error structure if known, otherwise rethrow or return an error object
                   // For now, let's rethrow to make it evident, or return a specific error structure if cli.js expects it.
                   // Given it's used in `lW1` which has a try/catch, rethrowing is acceptable.
                   // Or, to be safer and provide a consistent return type for destructuring:
                   return { count: 0, error: { type: "api_error", message: error.message } };
               }
           }
        }
    };

    _transformClaudeRequestToGemini(claudeRequest) {
        const geminiRequest = {
            contents: [],
            tools: [],
            systemInstruction: null,
            generationConfig: {},
        };

        // 1. System Prompt
        if (claudeRequest.system) {
            geminiRequest.systemInstruction = {
                role: "system", // Gemini uses 'system' role for system instructions, but it's part of the model params, not contents
                parts: [{ text: claudeRequest.system }],
            };
        }

        // 2. Messages
        let lastRole = null;
        claudeRequest.messages.forEach(claudeMessage => {
            let geminiRole;
            if (claudeMessage.role === "user") {
                geminiRole = "user";
            } else if (claudeMessage.role === "assistant") {
                geminiRole = "model"; // Gemini uses "model" for assistant messages
            } else {
                console.warn(`[GeminiWrapper] Unknown Claude role: ${claudeMessage.role}`);
                geminiRole = claudeMessage.role; // Pass through for now
            }

            // Gemini requires alternating user/model roles.
            // If the current role is the same as the last, we might need to merge or handle carefully.
            // For now, we assume Claude's messages are already in a valid alternating sequence or that Gemini handles minor deviations.
            // A more robust solution might involve merging consecutive messages of the same role if needed.
            
            const geminiContent = { role: geminiRole, parts: [] };

            if (typeof claudeMessage.content === 'string') {
                geminiContent.parts.push({ text: claudeMessage.content });
            } else if (Array.isArray(claudeMessage.content)) {
                claudeMessage.content.forEach(contentBlock => {
                    if (contentBlock.type === "text") {
                        geminiContent.parts.push({ text: contentBlock.text });
                    } else if (contentBlock.type === "tool_use") {
                        geminiContent.parts.push({
                            functionCall: {
                                name: contentBlock.name,
                                args: contentBlock.input, // Assuming Claude's 'input' maps to Gemini's 'args'
                            }
                        });
                        // Store tool call details for potential later use if needed for constructing FunctionResponse
                        this.currentToolCalls.set(contentBlock.id, { name: contentBlock.name, input: contentBlock.input });
                    } else if (contentBlock.type === "tool_result") {
                         // This is a response from a tool *to* the model
                        // The erroneous preliminary push for tool_result was here and has been removed.
                        // If the tool_result content is a string, Gemini might expect it as { "content": "string_result" }
                        // If it's already an object, it might be passed directly.
                        // This needs careful checking against Gemini's requirements for functionResponse.
                        // The `name` in functionResponse should be the actual tool name.
                        // The `response` object should contain the output of the tool.
                        const toolCallId = contentBlock.tool_use_id;
                        const originalToolCall = this.currentToolCalls.get(toolCallId);
                        let toolName;

                        if (originalToolCall) {
                            toolName = originalToolCall.name;
                        } else if (contentBlock.name) { // Fallback if Claude provides name directly on tool_result
                            toolName = contentBlock.name;
                            // This warning is important enough to be unconditional
                            console.warn(`[GeminiWrapper] tool_result: Using name directly from tool_result block for ID ${toolCallId} as original call was not found in currentToolCalls. This might be less reliable.`);
                        } else {
                            toolName = "unknown_tool_for_result";
                            console.error(`[GeminiWrapper] tool_result: Could not determine original tool name for tool_use_id: ${toolCallId}. This will likely cause issues.`);
                        }
                        
                        let responseData = {};
                        if (contentBlock.is_error) {
                            if (this.debug) console.warn(`[GeminiWrapper] tool_result for ${toolName} (ID: ${toolCallId}) had is_error=${contentBlock.is_error}. Structuring response as error.`);
                            // Structuring error response. Gemini doesn't have a standard error field in FunctionResponse,
                            // so the tool's declared output schema should ideally handle error structures.
                            // As a generic approach, we can pass a structured error.
                            responseData = { error: String(contentBlock.content) || "Tool execution failed." };
                        } else if (typeof contentBlock.content === 'string') {
                            responseData = { result: contentBlock.content };
                        } else if (typeof contentBlock.content === 'object' && contentBlock.content !== null) {
                            responseData = { result: contentBlock.content }; // Assuming the object is the result or part of it
                        } else if (contentBlock.content !== undefined) {
                             responseData = { result: String(contentBlock.content) }; // Convert other types to string
                        } else {
                             responseData = { result: null }; // Explicitly null if content is undefined
                        }

                        geminiContent.parts.push({
                            functionResponse: {
                                name: toolName,
                                response: responseData
                            }
                        });

                    } else {
                        console.warn(`[GeminiWrapper] Unknown content block type: ${contentBlock.type}`);
                    }
                });
            }
            geminiRequest.contents.push(geminiContent);
            lastRole = geminiRole;
        });

        // 3. Tools (Function Declarations)
        if (claudeRequest.tools && claudeRequest.tools.length > 0) {
            geminiRequest.tools = [{
                functionDeclarations: claudeRequest.tools.map(tool => ({
                    name: tool.name,
                    description: tool.description,
                    parameters: tool.input_schema, // Assuming Claude's input_schema is compatible with Gemini's parameters schema
                }))
            }];
        }

        // 4. Generation Config (max_tokens, temperature, etc.)
        if (claudeRequest.max_tokens) {
            // Claude uses max_tokens, Gemini uses maxOutputTokens
            geminiRequest.generationConfig.maxOutputTokens = claudeRequest.max_tokens;
        }
        if (claudeRequest.temperature !== undefined) {
            geminiRequest.generationConfig.temperature = claudeRequest.temperature;
        }
        if (claudeRequest.top_p !== undefined) {
            geminiRequest.generationConfig.topP = claudeRequest.top_p;
        }
        if (claudeRequest.top_k !== undefined) {
            geminiRequest.generationConfig.topK = claudeRequest.top_k;
        }
        if (claudeRequest.stop_sequences && claudeRequest.stop_sequences.length > 0) {
            geminiRequest.generationConfig.stopSequences = claudeRequest.stop_sequences;
        }
        
        // Tool choice (Claude: tool_choice; Gemini: tool_config)
        if (claudeRequest.tool_choice) {
            if (!geminiRequest.tools || geminiRequest.tools.length === 0 || !geminiRequest.tools[0].functionDeclarations) {
                 console.warn("[GeminiWrapper] 'tool_choice' was provided, but no tools were defined. Ignoring 'tool_choice'.");
            } else {
                if (claudeRequest.tool_choice.type === "auto") {
                    geminiRequest.toolConfig = {
                        functionCallingConfig: {
                            mode: "AUTO"
                        }
                    };
                } else if (claudeRequest.tool_choice.type === "any") {
                    geminiRequest.toolConfig = {
                        functionCallingConfig: {
                            mode: "ANY" 
                        }
                    };
                } else if (claudeRequest.tool_choice.type === "tool") {
                    const chosenToolName = claudeRequest.tool_choice.name;
                    const toolExists = geminiRequest.tools[0].functionDeclarations.some(fd => fd.name === chosenToolName);
                    if (toolExists) {
                        geminiRequest.toolConfig = {
                            functionCallingConfig: {
                                mode: "ANY", // Forcing this specific tool
                                allowedFunctionNames: [chosenToolName]
                            }
                        };
                    } else {
                        console.warn(`[GeminiWrapper] Chosen tool '${chosenToolName}' not found in tool declarations. Defaulting to AUTO mode for toolConfig.`);
                        geminiRequest.toolConfig = {
                            functionCallingConfig: {
                                mode: "AUTO"
                            }
                        };
                    }
                }
            }
        }


        return geminiRequest;
    }

    _adaptGeminiStreamToClaudeStream(geminiStreamResult, claudeRequestPayload, geminiRequest) {
        const self = this; // Capture 'this' for use in inner functions/closures if needed for this.debug
        
        const fullClaudeResponse = {
            id: `msg_gemini_${Date.now()}`,
            type: "message",
            role: "assistant",
            model: claudeRequestPayload.model,
            content: [],
            stop_reason: null,
            stop_sequence: null,
            usage: { input_tokens: 0, output_tokens: 0 },
            error: null
        };

        // This is the core async generator logic
        async function* generateEvents() {
            yield {
                type: "message_start",
                message: {
                    id: fullClaudeResponse.id,
                    type: fullClaudeResponse.type,
                    role: fullClaudeResponse.role,
                    model: fullClaudeResponse.model,
                    content: [],
                    stop_reason: null,
                    stop_sequence: null,
                    usage: { input_tokens: 0, output_tokens: 0 }
                }
            };
            
            let currentTextContent = "";
            let currentContentBlockIndex = -1;
            let currentToolCallId = null;
            let currentToolName = null;
            let currentToolInputStr = "";
            let streamIterationError = null; // Use a different name to avoid confusion if streamError is used in outer scope

            try {
                for await (const geminiChunk of geminiStreamResult.stream) {
                    if (self.debug) { // Use captured 'self'
                        console.log("[GeminiWrapper] Raw Gemini Chunk:", JSON.stringify(geminiChunk, null, 2));
                    }

                    const chunkDelta = { type: "content_block_delta", index: -1, delta: {} };
                    let candidate = null;

                    if (geminiChunk.candidates && geminiChunk.candidates.length > 0) {
                        candidate = geminiChunk.candidates[0];
                        if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
                            for (const part of candidate.content.parts) {
                                if (part.text) {
                                    if (currentToolCallId) {
                                        yield { type: "content_block_stop", index: currentContentBlockIndex };
                                        currentToolCallId = null; currentToolName = null; currentToolInputStr = "";
                                    }
                                    if (currentContentBlockIndex === -1 || fullClaudeResponse.content[currentContentBlockIndex]?.type !== "text") {
                                        currentContentBlockIndex++;
                                        fullClaudeResponse.content.push({ type: "text", text: "" });
                                        yield { type: "content_block_start", index: currentContentBlockIndex, content_block: { type: "text", text: "" } };
                                    }
                                    chunkDelta.index = currentContentBlockIndex;
                                    chunkDelta.delta = { type: "text_delta", text: part.text };
                                    fullClaudeResponse.content[currentContentBlockIndex].text += part.text;
                                    currentTextContent += part.text;
                                    yield chunkDelta;
                                } else if (part.functionCall) {
                                    currentTextContent = "";
                                    currentContentBlockIndex++;
                                    currentToolCallId = `toolu_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
                                    currentToolName = part.functionCall.name;
                                    currentToolInputStr = JSON.stringify(part.functionCall.args);
                                    fullClaudeResponse.content.push({ type: "tool_use", id: currentToolCallId, name: currentToolName, input: {} });
                                    yield { type: "content_block_start", index: currentContentBlockIndex, content_block: { type: "tool_use", id: currentToolCallId, name: currentToolName, input: {} } };
                                    chunkDelta.index = currentContentBlockIndex;
                                    chunkDelta.delta = { type: "input_json_delta", partial_json: currentToolInputStr };
                                    try { fullClaudeResponse.content[currentContentBlockIndex].input = JSON.parse(currentToolInputStr); } catch (e) { console.error("[GeminiWrapper] Error parsing tool input JSON for delta:", e); fullClaudeResponse.content[currentContentBlockIndex].input = currentToolInputStr; }
                                    yield chunkDelta;
                                }
                            }
                        }

                        if (candidate.finishReason) {
                            let reason = candidate.finishReason;
                            if (reason === "STOP") fullClaudeResponse.stop_reason = "end_turn";
                            else if (reason === "MAX_TOKENS") fullClaudeResponse.stop_reason = "max_tokens";
                            else if (reason === "SAFETY") fullClaudeResponse.stop_reason = "error";
                            else if (reason === "TOOL_CALLS" || reason === "TOOL_CODE" || reason === "FUNCTION_CALL") {
                                fullClaudeResponse.stop_reason = "tool_use";
                                if (fullClaudeResponse.content[currentContentBlockIndex]?.type === "tool_use" && currentToolCallId) {
                                    yield { type: "content_block_stop", index: currentContentBlockIndex };
                                    currentToolCallId = null;
                                }
                            } else fullClaudeResponse.stop_reason = reason;
                        }
                    }

                    if (fullClaudeResponse.stop_reason) {
                        let deltaPayload = { stop_reason: fullClaudeResponse.stop_reason, stop_sequence: fullClaudeResponse.stop_sequence };
                        if (fullClaudeResponse.stop_reason === "error") {
                            // Ensure error object is populated if not already by an iteration error or previous chunk
                            if (!fullClaudeResponse.error && candidate && candidate.finishReason === "SAFETY") {
                                fullClaudeResponse.error = { type: "safety_error", message: "Content blocked due to safety reasons." };
                            }
                            // Use existing error if available, otherwise provide a generic one for the delta
                            deltaPayload.error = fullClaudeResponse.error || { type: "unknown_error", message: "An unspecified error occurred indicating a stop."};
                        }
                        yield {
                            type: "message_delta",
                            delta: deltaPayload,
                            usage: { output_tokens: candidate?.tokenCount || 0 } // Note: per-chunk token count
                        };
                    }
                } // End for-await
            } catch (error) {
                console.error("[GeminiWrapper] Error during Gemini stream iteration:", error);
                streamIterationError = error;
                fullClaudeResponse.stop_reason = "error";
                fullClaudeResponse.error = { type: "api_error", message: error.message };
                fullClaudeResponse.usage = { input_tokens: 0, output_tokens: 0 };
                yield {
                    type: "message_delta",
                    delta: { stop_reason: "error", error: fullClaudeResponse.error },
                    usage: fullClaudeResponse.usage
                };
            }

            // Handle aggregated response (after stream iteration or if stream errored)
            try {
                const aggregatedResponse = await geminiStreamResult.response;
                if (self.debug) { // Use captured 'self'
                    console.log("[GeminiWrapper] Aggregated Gemini Response:", JSON.stringify(aggregatedResponse, null, 2));
                }
                if (aggregatedResponse.usageMetadata) { // Populate usage if not already errored out
                    if (!streamIterationError) { // Only update if stream was successful
                        fullClaudeResponse.usage.input_tokens = aggregatedResponse.usageMetadata.promptTokenCount || 0;
                        fullClaudeResponse.usage.output_tokens = aggregatedResponse.usageMetadata.candidatesTokenCount || 0;
                    }
                }
                if (!fullClaudeResponse.stop_reason && aggregatedResponse.candidates && aggregatedResponse.candidates.length > 0) { // If stop_reason not set by chunk or stream error
                    const finalCandidate = aggregatedResponse.candidates[0];
                    if (finalCandidate.finishReason) {
                        let reason = finalCandidate.finishReason;
                        if (reason === "STOP") fullClaudeResponse.stop_reason = "end_turn";
                        else if (reason === "MAX_TOKENS") fullClaudeResponse.stop_reason = "max_tokens";
                        else if (reason === "SAFETY") fullClaudeResponse.stop_reason = "error";
                        else if (reason === "TOOL_CALLS" || reason === "TOOL_CODE" || reason === "FUNCTION_CALL") fullClaudeResponse.stop_reason = "tool_use";
                        else fullClaudeResponse.stop_reason = reason;
                    }
                }
            } catch (error) {
                console.error("[GeminiWrapper] Error getting aggregated Gemini response:", error);
                if (!streamIterationError) { // If stream didn't already error
                    fullClaudeResponse.stop_reason = "error";
                    fullClaudeResponse.error = { type: "api_error", message: `Aggregated response error: ${error.message}` };
                    fullClaudeResponse.usage = { input_tokens: fullClaudeResponse.usage.input_tokens || 0, output_tokens: 0 };
                    yield { // Yield an error delta if not already sent
                        type: "message_delta",
                        delta: { stop_reason: "error", error: fullClaudeResponse.error },
                        usage: fullClaudeResponse.usage
                    };
                } else { // Stream already errored, ensure error object is consistent
                    if (!fullClaudeResponse.error) fullClaudeResponse.error = { type: "api_error", message: streamIterationError.message };
                }
            }
            
            if (fullClaudeResponse.content[currentContentBlockIndex]?.type === "tool_use" && currentToolCallId) {
                 yield { type: "content_block_stop", index: currentContentBlockIndex };
            }

            // Final message_delta if stop_reason is set from aggregated response and not an error already handled
            if (fullClaudeResponse.stop_reason && fullClaudeResponse.stop_reason !== "error" && !streamIterationError && !( /* was already yielded from chunk */ false) ) {
                // This condition needs to be smarter to avoid duplicate message_delta for stop_reason
                // For now, finalMessage will be the source of truth for the final stop_reason if not an error.
            }
            yield { type: "message_stop" };
        } // End of generateEvents

        const streamObject = {
            async* [Symbol.asyncIterator]() {
                yield* generateEvents();
            },
            finalMessage: async () => {
                // Ensure aggregated response is processed if not already by stream end or error.
                // This logic primarily ensures `fullClaudeResponse` is complete.
                if (fullClaudeResponse.stop_reason !== "error") {
                    try {
                        const aggregatedResponse = await geminiStreamResult.response;
                        if (aggregatedResponse.usageMetadata) {
                             // Prioritize usage from aggregated if stream didn't error
                            if (!fullClaudeResponse.error) {
                                fullClaudeResponse.usage.input_tokens = aggregatedResponse.usageMetadata.promptTokenCount || 0;
                                fullClaudeResponse.usage.output_tokens = aggregatedResponse.usageMetadata.candidatesTokenCount || 0;
                            }
                        }
                        if (!fullClaudeResponse.stop_reason && aggregatedResponse.candidates && aggregatedResponse.candidates.length > 0) {
                            const finalCandidate = aggregatedResponse.candidates[0];
                            if (finalCandidate.finishReason) {
                                let reason = finalCandidate.finishReason;
                                if (reason === "STOP") fullClaudeResponse.stop_reason = "end_turn";
                                else if (reason === "MAX_TOKENS") fullClaudeResponse.stop_reason = "max_tokens";
                                else if (reason === "SAFETY") { fullClaudeResponse.stop_reason = "error"; if(!fullClaudeResponse.error) fullClaudeResponse.error = {type: "safety_error", message: "Content blocked due to safety reasons."};}
                                else if (reason === "TOOL_CALLS" || reason === "TOOL_CODE" || reason === "FUNCTION_CALL") fullClaudeResponse.stop_reason = "tool_use";
                                else fullClaudeResponse.stop_reason = reason;
                            }
                        }
                    } catch (error) {
                        console.error("[GeminiWrapper] Error in finalMessage awaiting aggregated Gemini response:", error);
                        fullClaudeResponse.stop_reason = "error";
                        fullClaudeResponse.error = { type: "api_error", message: error.message };
                        fullClaudeResponse.usage = { input_tokens: fullClaudeResponse.usage.input_tokens || 0, output_tokens: 0 };
                    }
                }
                // If streamIterationError occurred, it should already be in fullClaudeResponse.error
                
                if (self.debug) { // Use captured 'self'
                     console.log("[GeminiWrapper] Final Claude-like Message:", JSON.stringify(fullClaudeResponse, null, 2));
                }
                return fullClaudeResponse;
            },
            request_id: fullClaudeResponse.id
        };
        
        return streamObject;
    }
}

module.exports = GeminiAnthropicSDKWrapper;
