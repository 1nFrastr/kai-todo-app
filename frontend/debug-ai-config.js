// Test script to verify AI config save/load functionality
// Run this in browser console to test

console.log('=== AI Config Test ===');

// Test data
const testConfig = {
  apiKey: 'test-api-key-123',
  baseURL: 'https://api.openai.com/v1',
  model: 'gpt-3.5-turbo',
  timeout: 30000,
  lastUpdated: Date.now()
};

console.log('1. Testing localStorage save...');
try {
  const configToStore = {
    ...testConfig,
    apiKey: btoa(testConfig.apiKey), // base64 encode
  };
  localStorage.setItem('ai-config', JSON.stringify(configToStore));
  console.log('✅ Save successful');
} catch (error) {
  console.error('❌ Save failed:', error);
}

console.log('2. Testing localStorage load...');
try {
  const stored = localStorage.getItem('ai-config');
  if (stored) {
    const parsed = JSON.parse(stored);
    parsed.apiKey = atob(parsed.apiKey); // base64 decode
    console.log('✅ Load successful:', { ...parsed, apiKey: '[HIDDEN]' });
  } else {
    console.log('❌ No config found in localStorage');
  }
} catch (error) {
  console.error('❌ Load failed:', error);
}

console.log('3. Testing isAIConfigured function...');
// This would need to be run in the actual app context
console.log('Run this in the app: console.log("isAIConfigured:", isAIConfigured())');

console.log('4. Testing custom event dispatch...');
window.dispatchEvent(new CustomEvent('ai-config-changed'));
console.log('✅ Custom event dispatched');

console.log('=== Test Complete ===');
