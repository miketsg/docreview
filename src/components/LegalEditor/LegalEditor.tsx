import { useCallback, useState } from 'react';
import { createEditor, Descendant, Text, NodeEntry, BaseEditor } from 'slate';
import { Slate, Editable, withReact, RenderLeafProps, ReactEditor, RenderElementProps } from 'slate-react';
import { withHistory, HistoryEditor } from 'slate-history';
import contractData from '../../data/contract.json';
import { HighlightTooltip } from './HighlightTooltip';
import { EditorToolbar } from './EditorToolbar';
import { Highlight, CustomText, CustomElement } from './types';

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: contractData.content }],
  },
];

const LegalEditor = () => {
  const [editor] = useState(() => withHistory(withReact(createEditor())));
  const [value, setValue] = useState<Descendant[]>(initialValue);

  const renderLeaf = useCallback(({ attributes, children, leaf }: RenderLeafProps) => {
    const highlight = contractData.highlights.find(
      (h: Highlight) =>
        'start' in leaf &&
        'end' in leaf &&
        leaf.start! >= h.start &&
        leaf.end! <= h.end
    );

    let element = <span {...attributes}>{children}</span>;

    if (leaf.bold) {
      element = <strong>{element}</strong>;
    }
    if (leaf.italic) {
      element = <em>{element}</em>;
    }
    if (leaf.underline) {
      element = <u>{element}</u>;
    }

    if (highlight) {
      return (
        <HighlightTooltip
          attributes={attributes}
          highlight={highlight}
        >
          {element}
        </HighlightTooltip>
      );
    }

    return element;
  }, []);

  const renderElement = useCallback(({ attributes, children, element }: RenderElementProps) => {
    const style: React.CSSProperties = { textAlign: 'left' };
    switch (element.type) {
      case 'align-center':
        style.textAlign = 'center';
        break;
      case 'align-right':
        style.textAlign = 'right';
        break;
      case 'bulleted-list':
        return <ul style={style} {...attributes}>{children}</ul>;
      case 'numbered-list':
        return <ol style={style} {...attributes}>{children}</ol>;
      default:
        return <p style={style} {...attributes}>{children}</p>;
    }
  }, []);

  const decorate = useCallback(([node, path]: NodeEntry) => {
    const ranges: Array<{ anchor: { path: number[]; offset: number }; focus: { path: number[]; offset: number }; highlight: boolean; start: number; end: number }> = [];

    if (!Text.isText(node)) {
      return ranges;
    }

    contractData.highlights.forEach((highlight: Highlight) => {
      const start = highlight.start;
      const end = highlight.end;

      ranges.push({
        anchor: { path, offset: start },
        focus: { path, offset: end },
        highlight: true,
        start,
        end,
      });
    });

    return ranges;
  }, []);

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <Slate editor={editor} initialValue={value} onChange={setValue}>
        <div className="border rounded-lg bg-white">
          <EditorToolbar />
          <div className="p-4 min-h-[500px]">
            <Editable
              renderLeaf={renderLeaf}
              renderElement={renderElement}
              decorate={decorate}
              placeholder="Enter your legal text..."
              className="prose max-w-none"
            />
          </div>
        </div>
      </Slate>
    </div>
  );
};

export default LegalEditor; 