/**
 * AIPromptPanel component type definitions
 */

export interface AIPromptPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
  error: string | null;
  placeholder?: string;
}
