import { useSlate } from 'slate-react';
import { Editor, Element as SlateElement } from 'slate';
import { Button } from '../ui/button';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react';

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor: Editor, format: string) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
  );

  return !!match;
};

const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(editor, format);
  const newProperties = {
    type: isActive ? 'paragraph' : format,
  };
  Editor.setNodes(editor, newProperties);
};

export const EditorToolbar = () => {
  const editor = useSlate();

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => toggleMark(editor, 'bold')}
        className={isMarkActive(editor, 'bold') ? 'bg-gray-100' : ''}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => toggleMark(editor, 'italic')}
        className={isMarkActive(editor, 'italic') ? 'bg-gray-100' : ''}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => toggleMark(editor, 'underline')}
        className={isMarkActive(editor, 'underline') ? 'bg-gray-100' : ''}
      >
        <Underline className="h-4 w-4" />
      </Button>
      <div className="w-px h-6 bg-gray-200 mx-1" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => toggleBlock(editor, 'bulleted-list')}
        className={isBlockActive(editor, 'bulleted-list') ? 'bg-gray-100' : ''}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => toggleBlock(editor, 'numbered-list')}
        className={isBlockActive(editor, 'numbered-list') ? 'bg-gray-100' : ''}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <div className="w-px h-6 bg-gray-200 mx-1" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => toggleBlock(editor, 'align-left')}
        className={isBlockActive(editor, 'align-left') ? 'bg-gray-100' : ''}
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => toggleBlock(editor, 'align-center')}
        className={isBlockActive(editor, 'align-center') ? 'bg-gray-100' : ''}
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => toggleBlock(editor, 'align-right')}
        className={isBlockActive(editor, 'align-right') ? 'bg-gray-100' : ''}
      >
        <AlignRight className="h-4 w-4" />
      </Button>
    </div>
  );
}; 