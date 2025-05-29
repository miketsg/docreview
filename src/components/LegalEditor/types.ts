export interface Highlight {
  id: number;
  start: number;
  end: number;
  description: string;
}

export interface CustomText {
  text: string;
  start?: number;
  end?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export interface CustomElement {
  type: 'paragraph' | 'bulleted-list' | 'numbered-list' | 'align-left' | 'align-center' | 'align-right';
  children: CustomText[];
} 