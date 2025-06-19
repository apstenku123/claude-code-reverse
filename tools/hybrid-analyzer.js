const FunctionAnalyzer = require('./function-analyzer');
const ConfidenceScorer = require('./confidence-scorer');
const { AIServiceOrchestrator } = require('./ai-service-integration');
const fs = require('fs').promises;
const path = require('path');

class HybridFunctionAnalyzer {
  constructor(config = {}) {
    this.localAnalyzer = new FunctionAnalyzer();
    this.confidenceScorer = new ConfidenceScorer();
    this.aiOrchestrator = config.aiConfig ? new AIServiceOrchestrator(config.aiConfig) : null;
    this.confidenceThreshold = config.confidenceThreshold || 75;
    this.useAI = config.useAI !== false && this.aiOrchestrator !== null;
    this.cache = new Map();
    this.analysisLog = [];
  }

  async analyzeFunction(functionData) {
    const startTime = Date.now();
    const { code, originalName, metadata = {} } = functionData;

    // Check cache
    const cacheKey = `${originalName}_${code.length}`;
    if (this.cache.has(cacheKey)) {
      console.log(`Using cached analysis for ${originalName}`);
      return this.cache.get(cacheKey);
    }

    try {
      // Step 1: Local analysis
      console.log(`Analyzing function: ${originalName}`);
      const localAnalysis = this.localAnalyzer.analyzeFunctionCode(code, originalName, metadata);
      
      // Step 2: Score confidence
      const scoringResult = this.confidenceScorer.scoreFunction(localAnalysis);
      const confidenceReport = this.confidenceScorer.generateReport(localAnalysis, scoringResult);
      
      console.log(`Local analysis confidence: ${scoringResult.score}% (${scoringResult.confidence})`);

      // Step 3: Decide if AI is needed
      let finalResult;
      
      if (!this.useAI || scoringResult.score >= this.confidenceThreshold) {
        // Use local result
        finalResult = this.createFinalResult(localAnalysis, scoringResult, 'local');
      } else {
        // Use AI for complex cases
        console.log(`Low confidence (${scoringResult.score}%), using AI analysis...`);
        
        const enhancedData = {
          ...functionData,
          analysis: localAnalysis,
          localSuggestions: localAnalysis.suggestedNames,
          patterns: localAnalysis.patterns,
          dependencies: localAnalysis.features.dependencies
        };

        const aiResult = await this.getAIAnalysis(enhancedData);
        finalResult = this.combineResults(localAnalysis, scoringResult, aiResult);
      }

      // Add analysis metadata
      finalResult.analysisTime = Date.now() - startTime;
      finalResult.timestamp = new Date().toISOString();

      // Cache the result
      this.cache.set(cacheKey, finalResult);

      // Log the analysis
      this.logAnalysis(finalResult);

      return finalResult;

    } catch (error) {
      console.error(`Error analyzing function ${originalName}:`, error);
      
      // Return fallback result
      return {
        originalName,
        suggestedName: this.generateFallbackName(originalName),
        confidence: 0,
        method: 'error',
        error: error.message,
        analysisTime: Date.now() - startTime,
        timestamp: new Date().toISOString(),
        code: functionData.code  // Preserve the code in error cases
      };
    }
  }

  async getAIAnalysis(functionData) {
    if (!this.aiOrchestrator) {
      return null;
    }

    try {
      // Gather additional context
      const context = await this.gatherAdditionalContext(functionData);
      const enhancedData = { ...functionData, context };

      // Get AI suggestion
      const aiResult = await this.aiOrchestrator.getAIGeneratedName(enhancedData);
      
      if (aiResult) {
        console.log(`AI suggested: ${aiResult.suggestedName} (confidence: ${aiResult.confidence}%)`);
      }
      
      return aiResult;
    } catch (error) {
      console.error('AI analysis failed:', error);
      return null;
    }
  }

  createFinalResult(localAnalysis, scoringResult, method) {
    const primarySuggestion = localAnalysis.suggestedNames[0] ||
                             this.generateFallbackName(localAnalysis.originalName);

    return {
      originalName: localAnalysis.originalName,
      suggestedName: primarySuggestion,
      alternativeNames: localAnalysis.suggestedNames.slice(1),
      confidence: scoringResult.score,
      confidenceLevel: scoringResult.confidence,
      method,
      purpose: localAnalysis.purpose,
      category: this.determineCategory(localAnalysis),
      patterns: localAnalysis.patterns,
      complexity: localAnalysis.complexity,
      features: {
        parameters: localAnalysis.features.parameters,
        returnType: localAnalysis.features.returnType,
        isAsync: localAnalysis.features.isAsync,
        dependencies: localAnalysis.features.dependencies
      },
      scoring: scoringResult.details,
      metadata: localAnalysis.metadata,
      code: localAnalysis.code  // Add the code property
    };
  }

  combineResults(localAnalysis, scoringResult, aiResult) {
    if (!aiResult) {
      // AI failed, use local result
      return this.createFinalResult(localAnalysis, scoringResult, 'local-fallback');
    }

    // Compare confidence levels
    const useAI = aiResult.confidence > scoringResult.score + 20;
    
    if (useAI) {
      // Use AI result as primary
      return {
        originalName: localAnalysis.originalName,
        suggestedName: aiResult.suggestedName,
        alternativeNames: [
          ...(aiResult.alternativeNames || []),
          ...localAnalysis.suggestedNames
        ].filter((name, index, self) => self.indexOf(name) === index), // Remove duplicates
        confidence: aiResult.confidence,
        confidenceLevel: this.getConfidenceLevel(aiResult.confidence),
        method: 'ai',
        aiService: aiResult.service,
        purpose: aiResult.purpose || localAnalysis.purpose,
        category: aiResult.category || this.determineCategory(localAnalysis),
        patterns: localAnalysis.patterns,
        complexity: localAnalysis.complexity,
        features: {
          parameters: localAnalysis.features.parameters,
          returnType: localAnalysis.features.returnType,
          isAsync: localAnalysis.features.isAsync,
          dependencies: localAnalysis.features.dependencies
        },
        scoring: {
          local: scoringResult.details,
          ai: {
            confidence: aiResult.confidence,
            reasoning: aiResult.reasoning
          }
        },
        localSuggestion: localAnalysis.suggestedNames[0],
        metadata: localAnalysis.metadata,
        code: localAnalysis.code  // Add the code property
      };
    } else {
      // Use local result but include AI alternatives
      const result = this.createFinalResult(localAnalysis, scoringResult, 'hybrid');
      result.aiAlternatives = aiResult.alternativeNames || [];
      result.aiConfidence = aiResult.confidence;
      result.aiSuggestion = aiResult.suggestedName;
      return result;
    }
  }

  async gatherAdditionalContext(functionData) {
    const context = {
      nearbyFunctions: [],
      modulePatterns: [],
      usageExamples: []
    };

    // This would be enhanced to actually gather context from the codebase
    // For now, returning empty context
    return context;
  }

  determineCategory(analysis) {
    const { patterns, purpose } = analysis;
    
    // Map patterns to categories
    const patternCategoryMap = {
      getter: 'accessor',
      setter: 'accessor',
      checker: 'validator',
      validator: 'validator',
      factory: 'factory',
      eventHandler: 'handler',
      middleware: 'middleware',
      transformer: 'processor',
      reactHook: 'hook'
    };

    // Check patterns first
    for (const pattern of patterns) {
      if (patternCategoryMap[pattern]) {
        return patternCategoryMap[pattern];
      }
    }

    // Map purpose to category
    const purposeCategoryMap = {
      getter: 'accessor',
      setter: 'accessor',
      validator: 'validator',
      factory: 'factory',
      handler: 'handler',
      processor: 'processor',
      http: 'network',
      database: 'data',
      cache: 'storage',
      auth: 'security',
      logging: 'utility',
      error: 'error-handling'
    };

    return purposeCategoryMap[purpose] || 'utility';
  }

  getConfidenceLevel(score) {
    if (score >= 80) return 'high';
    if (score >= 50) return 'medium';
    return 'low';
  }

  generateFallbackName(originalName) {
    // Clean up the original name
    const cleaned = originalName
      .replace(/^renamed_+/, '')
      .replace(/[^a-zA-Z0-9]/g, '');
    
    if (cleaned.length > 2) {
      return `process${this.capitalize(cleaned)}`;
    }
    
    return `function_${originalName}`;
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  logAnalysis(result) {
    this.analysisLog.push({
      timestamp: result.timestamp,
      originalName: result.originalName,
      suggestedName: result.suggestedName,
      confidence: result.confidence,
      method: result.method,
      analysisTime: result.analysisTime
    });
  }

  async saveAnalysisLog(filepath) {
    const logData = {
      totalAnalyzed: this.analysisLog.length,
      averageConfidence: this.analysisLog.reduce((sum, log) => sum + log.confidence, 0) / this.analysisLog.length,
      methodBreakdown: this.getMethodBreakdown(),
      analyses: this.analysisLog
    };

    await fs.writeFile(filepath, JSON.stringify(logData, null, 2));
    console.log(`Analysis log saved to ${filepath}`);
  }

  getMethodBreakdown() {
    const breakdown = {};
    this.analysisLog.forEach(log => {
      breakdown[log.method] = (breakdown[log.method] || 0) + 1;
    });
    return breakdown;
  }

  clearCache() {
    this.cache.clear();
    console.log('Analysis cache cleared');
  }

  getAnalysisStats() {
    const stats = {
      totalAnalyzed: this.analysisLog.length,
      cacheSize: this.cache.size,
      methodBreakdown: this.getMethodBreakdown(),
      averageAnalysisTime: this.analysisLog.reduce((sum, log) => sum + log.analysisTime, 0) / this.analysisLog.length,
      confidenceDistribution: {
        high: this.analysisLog.filter(log => log.confidence >= 80).length,
        medium: this.analysisLog.filter(log => log.confidence >= 50 && log.confidence < 80).length,
        low: this.analysisLog.filter(log => log.confidence < 50).length
      }
    };

    return stats;
  }
}

// Batch processing wrapper
class HybridBatchAnalyzer {
  constructor(config = {}) {
    this.analyzer = new HybridFunctionAnalyzer(config);
    this.batchSize = config.batchSize || 10;
    this.concurrentLimit = config.concurrentLimit || 3;
  }

  async analyzeBatch(functions, options = {}) {
    const results = [];
    const errors = [];
    const startTime = Date.now();

    console.log(`Starting batch analysis of ${functions.length} functions`);

    // Process in batches
    for (let i = 0; i < functions.length; i += this.batchSize) {
      const batch = functions.slice(i, i + this.batchSize);
      console.log(`Processing batch ${Math.floor(i / this.batchSize) + 1}/${Math.ceil(functions.length / this.batchSize)}`);

      // Process batch concurrently with limit
      const batchPromises = batch.map((func, index) => 
        this.analyzeWithTimeout(func, options.timeout || 30000)
          .then(result => {
            results.push(result);
            if (options.onProgress) {
              options.onProgress(i + index + 1, functions.length, result);
            }
          })
          .catch(error => {
            const errorResult = {
              originalName: func.originalName,
              error: error.message,
              suggestedName: this.analyzer.generateFallbackName(func.originalName),
              confidence: 0,
              method: 'error',
              code: func.code  // Preserve the code even in error cases
            };
            errors.push(errorResult);
            results.push(errorResult);
          })
      );

      // Wait for batch to complete
      await Promise.all(batchPromises);

      // Add delay between batches if specified
      if (options.batchDelay && i + this.batchSize < functions.length) {
        await this.delay(options.batchDelay);
      }
    }

    const totalTime = Date.now() - startTime;
    
    // Generate summary
    const summary = {
      total: functions.length,
      successful: results.filter(r => r.method !== 'error').length,
      errors: errors.length,
      totalTime,
      averageTime: totalTime / functions.length,
      confidenceBreakdown: this.getConfidenceBreakdown(results),
      methodBreakdown: this.getMethodBreakdown(results)
    };

    return {
      results,
      errors,
      summary
    };
  }

  async analyzeWithTimeout(functionData, timeout) {
    return Promise.race([
      this.analyzer.analyzeFunction(functionData),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Analysis timeout')), timeout)
      )
    ]);
  }

  getConfidenceBreakdown(results) {
    return {
      high: results.filter(r => r.confidence >= 80).length,
      medium: results.filter(r => r.confidence >= 50 && r.confidence < 80).length,
      low: results.filter(r => r.confidence < 50).length
    };
  }

  getMethodBreakdown(results) {
    const breakdown = {};
    results.forEach(result => {
      breakdown[result.method] = (breakdown[result.method] || 0) + 1;
    });
    return breakdown;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async saveResults(results, outputPath) {
    const output = {
      timestamp: new Date().toISOString(),
      summary: results.summary,
      results: results.results.map(r => ({
        originalName: r.originalName,
        suggestedName: r.suggestedName,
        confidence: r.confidence,
        method: r.method,
        category: r.category,
        purpose: r.purpose
      }))
    };

    await fs.writeFile(outputPath, JSON.stringify(output, null, 2));
    console.log(`Results saved to ${outputPath}`);
  }
}

module.exports = {
  HybridFunctionAnalyzer,
  HybridBatchAnalyzer
};