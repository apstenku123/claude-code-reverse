/**
 * Copyright (c) 2025 davidgornshtein@gmail.com
 * Licensed for non-commercial use only. For commercial use, please contact davidgornshtein@gmail.com
 * File: tools/ai-service-integration.js
 * Author: davidgornshtein@gmail.com
 * Description: AI service orchestration for code analysis and function naming using multiple LLM providers
 * Purpose: Provides unified interface for multiple AI services with fallback support and retry logic
 * Patterns: Service orchestration, exponential backoff retry, strategy pattern, factory pattern
 * Updated by davidgornshtein@gmail.com
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const fetch = require('node-fetch');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { AzureOpenAI } = require('openai');

class GeminiAnalyzer {
  constructor(apiKey) {
    this.apiKey = apiKey || process.env.GEMINI_API_KEY;
    this.modelName = process.env.GEMINI_MODEL || 'gemini-2.5-pro-preview-06-05';  // Using your specified model
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: this.modelName });
  }

  async analyzeFunctionForNaming(functionData) {
    const prompt = this.buildAnalysisPrompt(functionData);
    
    try {
      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,  // Lower temperature for consistent naming
          maxOutputTokens: 32000,  // Set to 32000 as requested
        }
      });

      const response = await result.response;
      const text = response.text();
      
      // Parse the text response to extract JSON
      return this.parseGeminiTextResponse(text);
    } catch (error) {
      // Re-throw the error to be handled by retry logic
      throw error;
    }
  }

  buildAnalysisPrompt(functionData) {
    const { code, originalName, directory, startLine, endLine, patterns, dependencies, analysis } = functionData;
    
    let prompt = `Analyze this JavaScript function and suggest a meaningful name based on its purpose.

Function Code:
\`\`\`javascript
${code}
\`\`\`

Context:
- Original name: ${originalName}
- Located in: ${directory || 'unknown'}
- Line numbers: ${startLine}-${endLine}`;

    if (patterns && patterns.length > 0) {
      prompt += `\n- Detected patterns: ${JSON.stringify(patterns)}`;
    }

    if (dependencies && dependencies.length > 0) {
      prompt += `\n- Dependencies: ${dependencies.join(', ')}`;
    }

    if (analysis && analysis.features) {
      if (analysis.features.apiCalls && analysis.features.apiCalls.length > 0) {
        prompt += `\n- Key operations: ${analysis.features.apiCalls.slice(0, 5).join(', ')}`;
      }
      if (analysis.features.parameters && analysis.features.parameters.length > 0) {
        prompt += `\n- Parameters: ${analysis.features.parameters.join(', ')}`;
      }
      prompt += `\n- Returns: ${analysis.features.returnType || 'unknown'}`;
    }

    prompt += `

Requirements:
1. Name should be in camelCase
2. Name should clearly indicate the function's purpose
3. Use standard prefixes (get, set, is, handle, process, validate, etc.)
4. Maximum 40 characters
5. Avoid generic names like "processData" or "handleRequest"

Provide your response in this JSON format:
{
  "suggestedName": "functionName",
  "confidence": 0-100,
  "reasoning": "Brief explanation of why this name was chosen",
  "alternativeNames": ["alt1", "alt2"],
  "category": "getter|setter|handler|validator|utility|processor|factory|middleware|other",
  "purpose": "Brief description of what the function does"
}`;

    return prompt;
  }

  parseGeminiResponse(response) {
    // This method is now deprecated, use parseGeminiTextResponse instead
    return this.parseGeminiTextResponse(response);
  }

  parseGeminiTextResponse(text) {
    try {
      // Extract JSON from the response text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error('No JSON found in response:', text);
        return null;
      }
      
      const parsed = JSON.parse(jsonMatch[0]);
      
      // Ensure all required fields are present and validate
      if (this.validateResponse(parsed)) {
        return {
          suggestedName: parsed.suggestedName || 'unknownFunction',
          confidence: parsed.confidence || 0,
          reasoning: parsed.reasoning || 'No reasoning provided',
          alternativeNames: parsed.alternativeNames || [],
          category: parsed.category || 'unknown',
          purpose: parsed.purpose || 'Unknown purpose'
        };
      }
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
    }
    return null;
  }

  validateResponse(response) {
    return response &&
           response.suggestedName &&
           typeof response.suggestedName === 'string' &&
           response.suggestedName.length > 0 &&
           response.suggestedName.length <= 50 && // Increased from 40 to allow longer descriptive names
           /^[a-z][a-zA-Z0-9]*$/.test(response.suggestedName) && // Fixed regex to allow camelCase
           typeof response.confidence === 'number' &&
           response.confidence >= 0 &&
           response.confidence <= 100;
  }
}

class AzureOpenAIAnalyzer {
  constructor(config) {
    this.apiKey = config.apiKey || process.env.AZURE_OPENAI_KEY;
    this.deployment = config.deployment; // 'gpt-4.1' or 'o4-mini'
    this.endpoint = config.baseUrl || config.endpoint || process.env.AZURE_OPENAI_ENDPOINT;
    this.apiVersion = process.env.AZURE_API_VERSION || '2025-01-01-preview';
    
    // Initialize Azure OpenAI client using the openai package
    this.client = new AzureOpenAI({
      apiKey: this.apiKey,
      apiVersion: this.apiVersion,
      endpoint: this.endpoint,
      deployment: this.deployment
    });
  }

  async analyzeFunctionForNaming(functionData) {
    const prompt = this.buildAnalysisPrompt(functionData);
    
    try {
      // O4-Mini only supports default temperature of 1
      const temperature = this.deployment === 'o4-mini' ? 1 : 0.2;
      
      // Set max tokens to 32000 as requested
      const maxTokens = 32000;
      
      // Build the completion options
      const completionOptions = {
        model: this.deployment,
        messages: [
          {
            role: 'system',
            content: 'You are an expert JavaScript developer specializing in code analysis and naming conventions.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: temperature
      };
      
      // Use different token parameter based on deployment
      if (this.deployment === 'o4-mini') {
        completionOptions.max_completion_tokens = maxTokens;
      } else {
        completionOptions.max_tokens = maxTokens;
      }
      
      const completion = await this.client.chat.completions.create(completionOptions);

      return this.parseAzureResponse(completion);
    } catch (error) {
      // Re-throw the error to be handled by retry logic
      throw error;
    }
  }

  buildAnalysisPrompt(functionData) {
    // Use the same prompt as Gemini
    return new GeminiAnalyzer().buildAnalysisPrompt(functionData);
  }

  parseAzureResponse(response) {
    try {
      if (!response.choices || response.choices.length === 0) {
        console.error('No choices in Azure response');
        return null;
      }

      const content = response.choices[0].message.content;
      
      // Extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error('No JSON found in Azure response:', content);
        return null;
      }
      
      const parsed = JSON.parse(jsonMatch[0]);
      
      // Ensure all required fields are present and validate
      const result = {
        suggestedName: parsed.suggestedName || 'unknownFunction',
        confidence: parsed.confidence || 0,
        reasoning: parsed.reasoning || 'No reasoning provided',
        alternativeNames: parsed.alternativeNames || [],
        category: parsed.category || 'unknown',
        purpose: parsed.purpose || 'Unknown purpose'
      };
      
      // Validate using GeminiAnalyzer's validation method
      if (new GeminiAnalyzer().validateResponse(result)) {
        return result;
      }
      
      console.warn('Azure response failed validation:', JSON.stringify(result));
      // Instead of returning null, return the result anyway if it has the basic required fields
      // This allows the fallback mechanism to work properly
      if (result.suggestedName && result.confidence >= 0) {
        console.warn('Using Azure result despite validation failure');
        return result;
      }
      
      return null;
    } catch (error) {
      console.error('Failed to parse Azure OpenAI response:', error);
      return null;
    }
  }
}

class OpenAIAnalyzer {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.model = 'gpt-4';
    this.baseUrl = 'https://api.openai.com/v1';
  }

  async analyzeFunctionForNaming(functionData) {
    const prompt = this.buildAnalysisPrompt(functionData);
    
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are an expert JavaScript developer specializing in code analysis and naming conventions.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.2,
          max_tokens: 256
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return this.parseOpenAIResponse(result);
    } catch (error) {
      console.error('OpenAI API error:', error);
      return null;
    }
  }

  buildAnalysisPrompt(functionData) {
    // Similar to Gemini prompt
    return new GeminiAnalyzer().buildAnalysisPrompt(functionData);
  }

  parseOpenAIResponse(response) {
    try {
      if (!response.choices || response.choices.length === 0) {
        return null;
      }

      const content = response.choices[0].message.content;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (new GeminiAnalyzer().validateResponse(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      console.error('Failed to parse OpenAI response:', error);
    }
    return null;
  }
}

class LocalLLMAnalyzer {
  constructor(config) {
    this.endpoint = config.endpoint || 'http://localhost:11434/api/generate';
    this.model = config.model || 'codellama';
  }

  async analyzeFunctionForNaming(functionData) {
    const prompt = this.buildAnalysisPrompt(functionData);
    
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: this.model,
          prompt: prompt,
          stream: false,
          options: {
            temperature: 0.2,
            num_predict: 256
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Local LLM error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return this.parseLocalLLMResponse(result);
    } catch (error) {
      console.error('Local LLM error:', error);
      return null;
    }
  }

  buildAnalysisPrompt(functionData) {
    return new GeminiAnalyzer().buildAnalysisPrompt(functionData);
  }

  parseLocalLLMResponse(response) {
    try {
      if (!response.response) {
        return null;
      }

      const content = response.response;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (new GeminiAnalyzer().validateResponse(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      console.error('Failed to parse Local LLM response:', error);
    }
    return null;
  }
}

class AIServiceOrchestrator {
  constructor(config) {
    this.services = {};
    
    // Use provided Gemini API key
    const geminiApiKey = config.ai?.gemini?.apiKey || config.geminiApiKey || process.env.GEMINI_API_KEY;
    if (geminiApiKey) {
      this.services.gemini = new GeminiAnalyzer(geminiApiKey);
    }
    
    // Azure OpenAI services - always initialize if we have env vars
    if (config.ai?.azureOpenAI || config.azureOpenAI || process.env.AZURE_OPENAI_KEY) {
      const azureConfig = config.ai?.azureOpenAI || config.azureOpenAI || {};
      this.services['azure-gpt4.1'] = new AzureOpenAIAnalyzer({
        apiKey: azureConfig.apiKey || process.env.AZURE_OPENAI_KEY,
        deployment: process.env.AZURE_GPT4_1_DEPLOYMENT || 'gpt-4.1',
        endpoint: azureConfig.deployments?.gpt4?.endpoint || process.env.AZURE_OPENAI_ENDPOINT
      });
      
      this.services['azure-o4-mini'] = new AzureOpenAIAnalyzer({
        apiKey: azureConfig.apiKey || process.env.AZURE_OPENAI_KEY,
        deployment: process.env.AZURE_O4_MINI_DEPLOYMENT || 'o4-mini',
        endpoint: azureConfig.deployments?.o4mini?.endpoint || process.env.AZURE_OPENAI_ENDPOINT
      });
    }
    
    if (config.ai?.openai?.apiKey || config.openaiApiKey) {
      this.services.openai = new OpenAIAnalyzer(config.ai?.openai?.apiKey || config.openaiApiKey);
    }
    
    if (config.ai?.local || config.localLLM) {
      this.services.local = new LocalLLMAnalyzer(config.ai?.local || config.localLLM);
    }
    
    this.primaryService = config.ai?.primaryService || config.primaryService || 'azure-gpt4.1';
    this.fallbackOrder = config.ai?.fallbackOrder || config.fallbackOrder || ['azure-gpt4.1', 'azure-o4-mini', 'gemini'];
    this.cache = new Map();
  }

  async getAIGeneratedName(functionData) {
    // Check if this is a full refactoring request
    if (functionData.isFullRefactoring) {
      return this.getFullRefactoring(functionData);
    }
    
    // Check cache first
    const cacheKey = this.getCacheKey(functionData);
    if (this.cache.has(cacheKey)) {
      console.log(`Using cached result for ${functionData.originalName}`);
      return this.cache.get(cacheKey);
    }

    // Try primary service first
    let result = await this.tryService(this.primaryService, functionData);
    
    if (result && result.confidence > 70) {
      this.cache.set(cacheKey, result);
      return result;
    }

    // Try fallback services
    for (const service of this.fallbackOrder) {
      if (service === this.primaryService) continue;
      
      result = await this.tryService(service, functionData);
      if (result && result.confidence > 60) {
        this.cache.set(cacheKey, result);
        return result;
      }
    }

    // If all services fail, return null
    return null;
  }

  async getFullRefactoring(functionData) {
    // For full refactoring, we need a service that can handle longer responses
    // Try services in order, but with different parsing
    const services = [this.primaryService, ...this.fallbackOrder];
    
    for (const serviceName of services) {
      const service = this.services[serviceName];
      if (!service) continue;
      
      try {
        console.log(`Trying ${serviceName} for full refactoring...`);
        const result = await this.tryFullRefactoringService(serviceName, functionData);
        if (result && result.refactoredCode) {
          console.log(`${serviceName} completed full refactoring`);
          return result;
        }
      } catch (error) {
        console.error(`${serviceName} full refactoring failed:`, error.message);
      }
    }
    
    return null;
  }

  async tryFullRefactoringService(serviceName, functionData) {
    const service = this.services[serviceName];
    if (!service) return null;
    
    try {
      // For Azure services, we need to handle the full refactoring differently
      if (serviceName.startsWith('azure-')) {
        return await this.retryWithExponentialBackoff(
          () => this.handleAzureFullRefactoring(service, functionData),
          10,
          serviceName
        );
      } else if (serviceName === 'gemini') {
        return await this.retryWithExponentialBackoff(
          () => this.handleGeminiFullRefactoring(service, functionData),
          10,
          serviceName
        );
      } else {
        // Generic handling for other services
        const response = await service.analyzeFunctionForNaming(functionData);
        return this.parseFullRefactoringResponse(response);
      }
    } catch (error) {
      console.error(`Error in ${serviceName} full refactoring:`, error);
      return null;
    }
  }

  /**
   * Retry logic with exponential backoff for rate-limited requests
   * @param {Function} fn - The async function to retry
   * @param {number} maxRetries - Maximum number of retry attempts (default: 10)
   * @param {string} serviceName - Name of the service for logging
   * @returns {Promise<any>} - Result of the function or null if all retries failed
   */
  async retryWithExponentialBackoff(fn, maxRetries = 10, serviceName = 'Service') {
    let lastError = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        
        // Check if it's a rate limit error (429) or similar
        const isRateLimitError =
          error.status === 429 ||
          error.code === '429' ||
          (error.message && error.message.includes('rate limit')) ||
          (error.message && error.message.includes('quota')) ||
          (error.message && error.message.includes('RESOURCE_EXHAUSTED'));
        
        if (!isRateLimitError || attempt === maxRetries) {
          // Not a rate limit error or last attempt - throw the error
          if (attempt === maxRetries && isRateLimitError) {
            console.error(`${serviceName}: All ${maxRetries} retry attempts exhausted due to rate limiting`);
          }
          throw error;
        }
        
        // Calculate exponential backoff delay
        // Start with 1 second, double each time, with some jitter
        const baseDelay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s, 8s, 16s, 32s, 64s...
        const jitter = Math.random() * 1000; // 0-1s random jitter
        const delay = Math.min(baseDelay + jitter, 60000); // Cap at 60 seconds
        
        // Only log on first attempt and every 3rd attempt to reduce noise
        if (attempt === 1 || attempt % 3 === 0) {
          console.log(`${serviceName}: Rate limited, retry ${attempt}/${maxRetries} after ${Math.round(delay/1000)}s`);
        }
        
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // Should not reach here, but just in case
    throw lastError;
  }

  async handleAzureFullRefactoring(service, functionData) {
    const prompt = functionData.prompt;
    
    try {
      const temperature = service.deployment === 'o4-mini' ? 1 : 0.2;
      const maxTokens = 32000;
      
      const completionOptions = {
        model: service.deployment,
        messages: [
          {
            role: 'system',
            content: 'You are an expert JavaScript developer specializing in code refactoring and clean code practices. Always respond with valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: temperature
      };
      
      if (service.deployment === 'o4-mini') {
        completionOptions.max_completion_tokens = maxTokens;
      } else {
        completionOptions.max_tokens = maxTokens;
      }
      
      const completion = await service.client.chat.completions.create(completionOptions);
      const content = completion.choices[0]?.message?.content;
      
      if (!content) {
        console.error('No content in Azure full refactoring response');
        return null;
      }
      
      // Parse the JSON response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error('No JSON found in Azure full refactoring response');
        return null;
      }
      
      let jsonString = jsonMatch[0];
      
      // Try multiple parsing strategies
      const parseStrategies = [
        // Strategy 1: Parse as-is
        () => JSON.parse(jsonString),
        
        // Strategy 2: Fix common escape issues
        () => {
          // Replace literal \n with actual newlines in string values
          const fixed = jsonString.replace(/"([^"]*?)\\n([^"]*?)"/g, (match, p1, p2) => {
            return `"${p1}\n${p2}"`;
          });
          return JSON.parse(fixed);
        },
        
        // Strategy 3: More aggressive cleaning
        () => {
          // First, try to fix escaped quotes and newlines
          let cleaned = jsonString
            .replace(/\\\\/g, '\\')  // Replace \\ with \
            .replace(/\\"/g, '"')    // Replace \" with "
            .replace(/\\n/g, '\n')   // Replace \n with actual newline
            .replace(/\\r/g, '\r')   // Replace \r with actual carriage return
            .replace(/\\t/g, '\t');  // Replace \t with actual tab
          
          return JSON.parse(cleaned);
        },
        
        // Strategy 4: Extract and rebuild
        () => {
          // Try to extract key parts and rebuild
          const newNameMatch = jsonString.match(/"newName"\s*:\s*"([^"]+)"/);
          const descriptionMatch = jsonString.match(/"description"\s*:\s*"([^"]+)"/);
          const refactoredCodeMatch = jsonString.match(/"refactoredCode"\s*:\s*"([\s\S]*?)"\s*,\s*"description"/);
          
          if (newNameMatch && refactoredCodeMatch) {
            return {
              newName: newNameMatch[1],
              refactoredCode: refactoredCodeMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"'),
              description: descriptionMatch ? descriptionMatch[1] : '',
              parameters: [],
              returnType: 'any',
              returnDescription: '',
              improvements: [],
              variableMapping: {}
            };
          }
          throw new Error('Could not extract required fields');
        }
      ];
      
      // Try each strategy
      for (let i = 0; i < parseStrategies.length; i++) {
        try {
          const result = parseStrategies[i]();
          if (result && result.newName && result.refactoredCode) {
            return result;
          }
        } catch (e) {
          if (i === parseStrategies.length - 1) {
            // Last strategy failed, throw the error
            throw e;
          }
          // Try next strategy
        }
      }
      
      throw new Error('All parsing strategies failed');
    } catch (error) {
      // Re-throw the error to be handled by retry logic
      throw error;
    }
  }

  async handleGeminiFullRefactoring(service, functionData) {
    const prompt = functionData.prompt;
    
    try {
      const result = await service.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 32000,
          responseMimeType: 'application/json'
        }
      });
      
      const response = result.response;
      const text = response.text();
      
      // Parse the JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in Gemini full refactoring response');
      }
      
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      // Re-throw the error to be handled by retry logic
      throw error;
    }
  }

  parseFullRefactoringResponse(response) {
    if (!response) return null;
    
    // Ensure all required fields for full refactoring
    if (!response.refactoredCode || !response.newName) {
      return null;
    }
    
    return {
      newName: response.newName,
      refactoredCode: response.refactoredCode,
      description: response.description || '',
      parameters: response.parameters || [],
      returnType: response.returnType || 'unknown',
      returnDescription: response.returnDescription || '',
      improvements: response.improvements || [],
      variableMapping: response.variableMapping || {}
    };
  }

  async tryService(serviceName, functionData) {
    try {
      const service = this.services[serviceName];
      if (!service) {
        console.log(`Service ${serviceName} not configured`);
        return null;
      }

      console.log(`Trying ${serviceName} for function ${functionData.originalName}...`);
      const startTime = Date.now();
      
      // Use retry logic for Azure and Gemini services
      let result;
      if (serviceName.startsWith('azure-') || serviceName === 'gemini') {
        result = await this.retryWithExponentialBackoff(
          () => service.analyzeFunctionForNaming(functionData),
          10,
          serviceName
        );
      } else {
        result = await service.analyzeFunctionForNaming(functionData);
      }
      
      const duration = Date.now() - startTime;
      console.log(`${serviceName} completed in ${duration}ms`);
      
      if (result) {
        result.service = serviceName;
        result.analysisTime = duration;
        return result;
      }
    } catch (error) {
      console.error(`${serviceName} service failed:`, error);
    }
    return null;
  }

  getCacheKey(functionData) {
    return `${functionData.originalName}_${functionData.code.length}`;
  }

  clearCache() {
    this.cache.clear();
  }
}

class AIPromptBuilder {
  buildEnhancedPrompt(functionData, additionalContext) {
    const sections = [];

    // Basic function information
    sections.push(this.buildBasicSection(functionData));

    // Code analysis results
    if (functionData.analysis) {
      sections.push(this.buildAnalysisSection(functionData.analysis));
    }

    // Surrounding context
    if (additionalContext.nearbyFunctions) {
      sections.push(this.buildContextSection(additionalContext));
    }

    // Project-specific patterns
    if (additionalContext.projectPatterns) {
      sections.push(this.buildPatternSection(additionalContext.projectPatterns));
    }

    // Examples from similar functions
    if (additionalContext.examples) {
      sections.push(this.buildExampleSection(additionalContext.examples));
    }

    return sections.join('\n\n');
  }

  buildBasicSection(functionData) {
    return `Function to analyze:
\`\`\`javascript
${functionData.code}
\`\`\`

Original name: ${functionData.originalName}
Location: ${functionData.path || 'unknown'}`;
  }

  buildAnalysisSection(analysis) {
    return `Code Analysis Results:
- Function type: ${analysis.purpose || 'unknown'}
- Complexity score: ${analysis.complexity?.score || 'N/A'}
- Main operations: ${analysis.features?.apiCalls?.slice(0, 5).join(', ') || 'none'}
- Parameters: ${analysis.features?.parameters?.join(', ') || 'none'}
- Return type: ${analysis.features?.returnType || 'unknown'}
- Patterns detected: ${analysis.patterns?.join(', ') || 'none'}`;
  }

  buildContextSection(context) {
    return `Surrounding Context:
- Module purpose: ${context.modulePurpose || 'unknown'}
- Nearby functions: ${context.nearbyFunctions?.map(f => f.name).join(', ') || 'none'}
- Common patterns in module: ${context.modulePatterns?.join(', ') || 'none'}`;
  }

  buildPatternSection(patterns) {
    return `Project Patterns:
${patterns.map(p => `- ${p.pattern}: ${p.example}`).join('\n')}`;
  }

  buildExampleSection(examples) {
    return `Similar Functions Already Renamed:
${examples.map(ex => `- ${ex.original} → ${ex.renamed} (${ex.reason})`).join('\n')}`;
  }
}

class AIBatchProcessor {
  constructor(orchestrator, options = {}) {
    this.orchestrator = orchestrator;
    this.batchSize = options.batchSize || 10;
    this.rateLimitDelay = options.rateLimitDelay || 1000;
    this.maxConcurrent = options.maxConcurrent || 3;
  }

  async processFunctionBatch(functions) {
    const results = [];
    const batches = this.createBatches(functions, this.batchSize);

    console.log(`Processing ${functions.length} functions in ${batches.length} batches`);

    for (let i = 0; i < batches.length; i++) {
      console.log(`Processing batch ${i + 1}/${batches.length}`);
      
      const batchResults = await this.processBatchConcurrently(batches[i]);
      results.push(...batchResults);
      
      // Rate limiting between batches
      if (i < batches.length - 1) {
        await this.delay(this.rateLimitDelay);
      }
    }

    return results;
  }

  async processBatchConcurrently(batch) {
    const promises = batch.map(func => 
      this.processWithRetry(func)
        .catch(error => ({
          originalName: func.originalName,
          error: error.message,
          fallbackName: this.generateFallbackName(func),
          status: 'error'
        }))
    );

    return Promise.all(promises);
  }

  async processWithRetry(functionData, retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        const result = await this.orchestrator.getAIGeneratedName(functionData);
        if (result) {
          return {
            ...result,
            originalName: functionData.originalName,
            status: 'success'
          };
        }
      } catch (error) {
        console.error(`Attempt ${i + 1} failed for ${functionData.originalName}:`, error.message);
        if (i === retries - 1) throw error;
        await this.delay(1000 * (i + 1)); // Exponential backoff
      }
    }
    
    // If all retries failed, return with fallback
    return {
      originalName: functionData.originalName,
      suggestedName: this.generateFallbackName(functionData),
      confidence: 0,
      status: 'fallback',
      reason: 'All AI services failed'
    };
  }

  createBatches(items, batchSize) {
    const batches = [];
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize));
    }
    return batches;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  generateFallbackName(func) {
    const cleanName = func.originalName.replace(/^renamed_+/, '');
    return `process${this.capitalize(cleanName)}`;
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

module.exports = {
  GeminiAnalyzer,
  AzureOpenAIAnalyzer,
  OpenAIAnalyzer,
  LocalLLMAnalyzer,
  AIServiceOrchestrator,
  AIPromptBuilder,
  AIBatchProcessor
};