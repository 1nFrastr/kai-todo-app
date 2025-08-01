import type { FormField } from './types';

/**
 * Find associated label for an input element
 */
export const findAssociatedLabel = (input: HTMLInputElement | HTMLTextAreaElement): string | undefined => {
  // First try to find label with 'for' attribute matching input id
  if (input.id) {
    const labelElement = document.querySelector<HTMLLabelElement>(`label[for="${input.id}"]`);
    if (labelElement) {
      return labelElement.textContent?.trim();
    }
  }

  // Then try to find parent label element
  const parentLabel = input.closest('label');
  if (parentLabel) {
    // Get text content excluding the input element itself
    const clone = parentLabel.cloneNode(true) as HTMLLabelElement;
    const inputInClone = clone.querySelector('input, textarea');
    if (inputInClone) {
      inputInClone.remove();
    }
    const labelText = clone.textContent?.trim();
    if (labelText) {
      return labelText;
    }
  }

  // Finally, try to find previous sibling label
  const prevSibling = input.previousElementSibling;
  if (prevSibling && prevSibling.tagName.toLowerCase() === 'label') {
    return prevSibling.textContent?.trim();
  }

  return undefined;
};

/**
 * Detect all form fields in a form element
 */
export const detectFormFields = (formElement: HTMLFormElement): FormField[] => {
  const inputs = formElement.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
  
  return Array.from(inputs)
    .filter(input => {
      // Filter out buttons, submits, hidden fields, etc.
      const type = input.type?.toLowerCase();
      const excludedTypes = ['button', 'submit', 'reset', 'hidden', 'file', 'image'];
      return !excludedTypes.includes(type);
    })
    .map(input => ({
      name: input.name || input.id || `field_${Date.now()}_${Math.random()}`,
      type: input.type || 'text',
      label: findAssociatedLabel(input),
      placeholder: input.placeholder,
      required: input.required,
      maxLength: input.maxLength > 0 ? input.maxLength : undefined,
      currentValue: input.value,
      element: input
    }));
};

/**
 * Infer form type based on field names and context
 */
export const inferFormType = (fields: FormField[]): string => {
  const fieldNames = fields.map(f => f.name.toLowerCase());
  const labels = fields.map(f => f.label?.toLowerCase() || '').join(' ');
  const placeholders = fields.map(f => f.placeholder?.toLowerCase() || '').join(' ');
  const context = `${fieldNames.join(' ')} ${labels} ${placeholders}`.toLowerCase();

  // Todo/Task form detection
  if (context.includes('todo') || context.includes('task') || 
      (context.includes('title') && context.includes('description'))) {
    return 'todo/task form';
  }

  // Contact form detection
  if (context.includes('contact') || context.includes('email') || 
      (context.includes('name') && context.includes('message'))) {
    return 'contact form';
  }

  // User registration form detection
  if (context.includes('register') || context.includes('signup') ||
      (context.includes('username') && context.includes('password'))) {
    return 'registration form';
  }

  // Login form detection
  if (context.includes('login') || context.includes('signin') ||
      (context.includes('email') && context.includes('password') && fields.length <= 3)) {
    return 'login form';
  }

  // Profile form detection
  if (context.includes('profile') || context.includes('bio') ||
      (context.includes('name') && context.includes('about'))) {
    return 'profile form';
  }

  // Feedback/Review form detection
  if (context.includes('feedback') || context.includes('review') || context.includes('comment')) {
    return 'feedback form';
  }

  // Default fallback
  return 'general form';
};

/**
 * Build structured prompt for AI generation
 */
export const buildFormPrompt = (fields: FormField[], customPrompt?: string, language: 'zh' | 'en' = 'en'): string => {
  const formType = inferFormType(fields);
  
  const fieldDescriptions = fields.map(field => {
    const parts = [];
    parts.push(`- ${field.name}`);
    
    if (field.label) {
      parts.push(`(${field.label})`);
    } else if (field.placeholder) {
      parts.push(`(${field.placeholder})`);
    }
    
    if (field.required) {
      parts.push(language === 'zh' ? '[必填]' : '[required]');
    }
    
    if (field.maxLength) {
      parts.push(language === 'zh' ? `[最多${field.maxLength}字符]` : `[max ${field.maxLength} chars]`);
    }
    
    return parts.join(' ');
  }).join('\n');

  if (language === 'zh') {
    return `${customPrompt || ''}

表单类型：${formType}
需要填充的字段：
${fieldDescriptions}

请为以上表单生成合适的内容，确保内容实用且符合字段要求。返回JSON格式：
{
  "fieldName1": "生成的内容1",
  "fieldName2": "生成的内容2"
}

注意：
1. 请根据字段的语义生成相关内容
2. 遵守字符长度限制
3. 为必填字段提供有意义的内容
4. 返回纯JSON格式，不要包含其他说明文字`;
  } else {
    return `${customPrompt || ''}

Form type: ${formType}
Fields to fill:
${fieldDescriptions}

Please generate appropriate content for the above form, ensuring the content is practical and meets field requirements. Return JSON format:
{
  "fieldName1": "generated content 1",
  "fieldName2": "generated content 2"
}

Notes:
1. Generate relevant content based on field semantics
2. Respect character length limits
3. Provide meaningful content for required fields
4. Return pure JSON format without additional explanatory text`;
  }
};

/**
 * Parse AI response and extract field values
 */
export const parseAIResponse = (response: string): Record<string, string> => {
  try {
    // Try to extract JSON from the response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const jsonStr = jsonMatch[0];
      const parsed = JSON.parse(jsonStr);
      
      // Ensure all values are strings
      const result: Record<string, string> = {};
      for (const [key, value] of Object.entries(parsed)) {
        result[key] = String(value || '');
      }
      return result;
    }
    
    // If no JSON found, return empty object
    return {};
  } catch (error) {
    console.error('Failed to parse AI response:', error);
    return {};
  }
};

/**
 * Fill form fields with generated values
 */
export const fillFormFields = (
  fields: FormField[], 
  values: Record<string, string>, 
  preserveExisting: boolean = false
): void => {
  fields.forEach(field => {
    const newValue = values[field.name];
    if (newValue !== undefined) {
      // Only fill if field is empty or we're not preserving existing values
      if (!preserveExisting || !field.currentValue.trim()) {
        field.element.value = newValue;
        
        // Trigger change event to notify React and other listeners
        const event = new Event('input', { bubbles: true });
        field.element.dispatchEvent(event);
        
        // Also trigger change event for good measure
        const changeEvent = new Event('change', { bubbles: true });
        field.element.dispatchEvent(changeEvent);
      }
    }
  });
};
