class ConfidenceScorer {
  constructor() {
    this.weights = {
      // Positive indicators
      clearPattern: 30,
      descriptiveIdentifiers: 15,
      contextMatch: 20,
      simpleStructure: 10,
      consistentNaming: 10,
      
      // Negative indicators
      multiPurpose: -20,
      highComplexity: -15,
      ambiguousIdentifiers: -10,
      noContext: -15,
      obfuscated: -30
    };
  }

  scoreFunction(analysis) {
    let score = 0;
    const details = {
      positive: [],
      negative: [],
      factors: {}
    };

    // Check for clear patterns
    if (analysis.patterns && analysis.patterns.length > 0) {
      score += this.weights.clearPattern;
      details.positive.push(`Clear pattern detected: ${analysis.patterns[0]}`);
      details.factors.clearPattern = true;
    }

    // Check identifier quality
    const identifierScore = this.scoreIdentifiers(analysis.features.identifiers);
    score += identifierScore;
    details.factors.identifierQuality = identifierScore;
    
    if (identifierScore > 0) {
      details.positive.push('Descriptive identifiers found');
    } else if (identifierScore < 0) {
      details.negative.push('Ambiguous or obfuscated identifiers');
    }

    // Check context match
    const contextScore = this.scoreContext(analysis);
    score += contextScore;
    details.factors.contextMatch = contextScore > 0;
    
    if (contextScore > 0) {
      details.positive.push(`Strong context indicators for: ${analysis.purpose}`);
    }

    // Check complexity
    const complexityPenalty = this.scoreComplexity(analysis.complexity);
    score += complexityPenalty;
    details.factors.complexity = analysis.complexity.score;
    
    if (complexityPenalty < 0) {
      details.negative.push(`High complexity: ${analysis.complexity.score}`);
    }

    // Check for multi-purpose indicators
    if (this.isMultiPurpose(analysis)) {
      score += this.weights.multiPurpose;
      details.negative.push('Function appears to have multiple purposes');
      details.factors.multiPurpose = true;
    }

    // Check for obfuscation
    if (this.isObfuscated(analysis)) {
      score += this.weights.obfuscated;
      details.negative.push('Code appears to be obfuscated or minified');
      details.factors.obfuscated = true;
    }

    // Normalize score to 0-100
    const normalizedScore = Math.max(0, Math.min(100, score));

    return {
      score: normalizedScore,
      confidence: this.getConfidenceLevel(normalizedScore),
      details,
      recommendation: this.getRecommendation(normalizedScore, analysis)
    };
  }

  scoreIdentifiers(identifiers) {
    if (!identifiers || identifiers.length === 0) return 0;

    let score = 0;
    const meaningfulIdentifiers = identifiers.filter(id => {
      // Filter out single letters and common JS keywords
      return id.length > 1 && 
             !['var', 'let', 'const', 'function', 'return', 'if', 'else', 'for', 'while'].includes(id) &&
             !id.match(/^[A-Z]$/);
    });

    // Check for descriptive names
    const descriptiveCount = meaningfulIdentifiers.filter(id => {
      return id.length > 3 && 
             (id.match(/[a-z][A-Z]/) || id.includes('_')) && // camelCase or snake_case
             !id.match(/^[a-z0-9]{1,3}$/i); // Not just short random strings
    }).length;

    if (descriptiveCount > meaningfulIdentifiers.length * 0.5) {
      score += this.weights.descriptiveIdentifiers;
    } else if (descriptiveCount < meaningfulIdentifiers.length * 0.2) {
      score += this.weights.ambiguousIdentifiers;
    }

    // Check for obfuscated patterns
    const obfuscatedCount = identifiers.filter(id => {
      return id.match(/^[a-zA-Z_$][0-9]+$/) || // Like a1, B2, etc.
             id.match(/^[a-zA-Z]{1,2}[0-9]{1,2}$/); // Like ab12, X5
    }).length;

    if (obfuscatedCount > identifiers.length * 0.5) {
      score += this.weights.obfuscated / 2;
    }

    return score;
  }

  scoreContext(analysis) {
    const { features, purpose } = analysis;
    
    // Check if detected purpose matches the code content
    const allText = [
      ...features.identifiers,
      ...features.stringLiterals,
      ...features.apiCalls
    ].join(' ').toLowerCase();

    const contextMatches = {
      http: ['fetch', 'request', 'response', 'url', 'api'],
      database: ['query', 'insert', 'update', 'delete', 'find'],
      auth: ['auth', 'token', 'login', 'user', 'permission'],
      cache: ['cache', 'store', 'expire', 'ttl'],
      logging: ['log', 'debug', 'info', 'error', 'warn'],
      validation: ['validate', 'check', 'verify', 'ensure'],
      error: ['error', 'exception', 'throw', 'catch']
    };

    if (contextMatches[purpose]) {
      const matchCount = contextMatches[purpose].filter(keyword => 
        allText.includes(keyword)
      ).length;
      
      if (matchCount >= 2) {
        return this.weights.contextMatch;
      } else if (matchCount === 1) {
        return this.weights.contextMatch / 2;
      }
    }

    // No clear context
    if (purpose === 'unknown' || purpose === 'utility') {
      return this.weights.noContext;
    }

    return 0;
  }

  scoreComplexity(complexity) {
    if (complexity.cyclomatic > 10 || complexity.cognitive > 15) {
      return this.weights.highComplexity;
    } else if (complexity.cyclomatic > 7 || complexity.cognitive > 10) {
      return this.weights.highComplexity / 2;
    } else if (complexity.cyclomatic <= 3 && complexity.cognitive <= 5) {
      return this.weights.simpleStructure;
    }
    return 0;
  }

  isMultiPurpose(analysis) {
    const { features, patterns } = analysis;
    
    // Multiple different patterns suggest multi-purpose
    if (patterns.length > 2 && 
        patterns.includes('getter') && 
        (patterns.includes('setter') || patterns.includes('processor'))) {
      return true;
    }

    // Complex control flow with multiple operations
    if (features.controlFlow.hasConditionals && 
        features.controlFlow.hasLoops &&
        features.operations.length > 5) {
      return true;
    }

    // Multiple different types of API calls
    const apiCategories = new Set();
    features.apiCalls.forEach(call => {
      if (call.includes('fetch') || call.includes('request')) apiCategories.add('http');
      if (call.includes('query') || call.includes('find')) apiCategories.add('db');
      if (call.includes('log') || call.includes('console')) apiCategories.add('logging');
      if (call.includes('fs') || call.includes('file')) apiCategories.add('file');
    });

    return apiCategories.size > 2;
  }

  isObfuscated(analysis) {
    const { features, originalName } = analysis;
    
    // Check original name pattern
    if (originalName.match(/^[a-zA-Z]{1,2}[0-9]+$/) || 
        originalName.match(/^[a-zA-Z_$]+[0-9]+$/)) {
      return true;
    }

    // Check for obfuscated identifiers
    const obfuscatedRatio = features.identifiers.filter(id => 
      id.match(/^[a-zA-Z]{1,2}[0-9]+$/)
    ).length / (features.identifiers.length || 1);

    return obfuscatedRatio > 0.5;
  }

  getConfidenceLevel(score) {
    if (score >= 80) return 'high';
    if (score >= 50) return 'medium';
    return 'low';
  }

  getRecommendation(score, analysis) {
    const level = this.getConfidenceLevel(score);
    
    switch (level) {
      case 'high':
        return {
          method: 'local',
          action: 'Use local analyzer suggestion',
          reason: 'Clear patterns and context detected'
        };
      
      case 'medium':
        return {
          method: 'hybrid',
          action: 'Use local analyzer with AI validation',
          reason: 'Some ambiguity detected, AI can help confirm'
        };
      
      case 'low':
        return {
          method: 'ai',
          action: 'Use AI service for analysis',
          reason: 'Complex or ambiguous function requiring deeper analysis'
        };
    }
  }

  generateReport(analysis, scoringResult) {
    const { score, confidence, details, recommendation } = scoringResult;
    
    return {
      functionName: analysis.originalName,
      confidence: {
        score,
        level: confidence,
        percentage: `${score}%`
      },
      analysis: {
        purpose: analysis.purpose,
        patterns: analysis.patterns,
        complexity: analysis.complexity,
        suggestedNames: analysis.suggestedNames
      },
      scoring: {
        positiveFactors: details.positive,
        negativeFactors: details.negative,
        breakdown: details.factors
      },
      recommendation,
      metadata: {
        timestamp: new Date().toISOString(),
        analyzerVersion: '1.0.0'
      }
    };
  }
}

module.exports = ConfidenceScorer;