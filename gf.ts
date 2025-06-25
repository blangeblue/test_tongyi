/**
 * 工蜂 Copilot 使用示例
 * 展示如何在 TDesign 微信小程序组件库中集成和使用工蜂 Copilot 功能
 */

import { initBeehiveCopilot, getBeehiveCopilot } from './utils';

/**
 * 初始化工蜂 Copilot 示例
 */
export function initializeCopilotExample() {
  // 方式1: 直接初始化
  const copilot = initBeehiveCopilot({
    token: 'your-beehive-token', // 替换为您的工蜂访问令牌
    projectId: 'your-project-id', // 替换为您的项目ID
    apiBaseUrl: 'https://git.code.tencent.com/api/copilot', // 可选：自定义API地址
  });

  return copilot;
}

/**
 * 代码智能建议示例
 */
export async function getCodeSuggestionsExample() {
  const copilot = getBeehiveCopilot();
  
  const code = `
    function calculateTotal(items) {
      // 需要计算总价
    }
  `;
  
  const suggestion = await copilot.getCodeSuggestions(
    code,
    'src/utils/calculator.ts',
    'typescript'
  );
  
  console.log('代码建议:', suggestion);
  return suggestion;
}

/**
 * 代码智能补全示例
 */
export async function getCodeCompletionExample() {
  const copilot = getBeehiveCopilot();
  
  const completions = await copilot.getCodeCompletion(
    'const result = array.', // 输入前缀
    {
      filePath: 'src/components/list.ts',
      position: { line: 10, character: 20 },
      language: 'typescript',
    }
  );
  
  console.log('补全建议:', completions);
  return completions;
}

/**
 * 代码质量检查示例
 */
export async function analyzeCodeQualityExample() {
  const copilot = getBeehiveCopilot();
  
  const code = `
    function badFunction() {
      var x = 1;
      if (x = 2) {
        return true;
      }
      console.log(unusedVariable);
    }
  `;
  
  const issues = await copilot.analyzeCodeQuality(
    code,
    'src/components/example.ts'
  );
  
  console.log('代码质量问题:', issues);
  return issues;
}

/**
 * 生成文档示例
 */
export async function generateDocumentationExample() {
  const copilot = getBeehiveCopilot();
  
  const code = `
    export function formatDate(date, format) {
      // 格式化日期函数
      return date.toLocaleDateString();
    }
  `;
  
  const documentation = await copilot.generateDocumentation(code, 'jsdoc');
  
  console.log('生成的文档:', documentation);
  return documentation;
}

/**
 * 代码重构示例
 */
export async function getRefactorSuggestionsExample() {
  const copilot = getBeehiveCopilot();
  
  const code = `
    function oldStyleFunction() {
      var i;
      for (i = 0; i < array.length; i++) {
        if (array[i].status == 'active') {
          processItem(array[i]);
        }
      }
    }
  `;
  
  const refactoredCode = await copilot.getRefactorSuggestions(code, 'modernize');
  
  console.log('重构后的代码:', refactoredCode);
  return refactoredCode;
}

/**
 * 在组件中使用工蜂 Copilot 的完整示例
 */
export function useInComponent() {
  // 在页面或组件的 onLoad 或 created 中初始化
  const copilot = initBeehiveCopilot({
    token: 'your-token', // 请替换为实际的工蜂访问令牌
    projectId: 'your-project-id', // 请替换为实际的项目ID
  });

  // 在需要的时候调用各种功能
  const handleGetSuggestions = async (code: string, filePath: string) => {
    try {
      const suggestions = await copilot.getCodeSuggestions(code, filePath);
      // 处理建议结果
      return suggestions;
    } catch (error) {
      console.error('获取建议失败:', error);
      return '';
    }
  };

  const handleAnalyzeCode = async (code: string, filePath: string) => {
    try {
      const issues = await copilot.analyzeCodeQuality(code, filePath);
      // 显示代码质量问题
      issues.forEach(issue => {
        console.log(`第${issue.line}行 [${issue.severity}]: ${issue.message}`);
      });
      return issues;
    } catch (error) {
      console.error('代码分析失败:', error);
      return [];
    }
  };

  return {
    handleGetSuggestions,
    handleAnalyzeCode,
    copilot,
  };
} 
