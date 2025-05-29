import { useCallback, useState } from 'react';
import { createEditor, Descendant, Text, NodeEntry, BaseText, BaseEditor } from 'slate';
import { Slate, Editable, withReact, RenderLeafProps, ReactEditor } from 'slate-react';
import { withHistory, HistoryEditor } from 'slate-history';
import * as Tooltip from '@radix-ui/react-tooltip';
import contractData from '../../data/contract.json';

interface Highlight {
  id: number;
  start: number;
  end: number;
  description: string;
}

interface CustomText extends BaseText {
  start?: number;
  end?: number;
}

type CustomElement = {
  type: 'paragraph';
  children: CustomText[];
}

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

    if (highlight) {
      return (
        <Tooltip.Provider delayDuration={0} skipDelayDuration={0}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <span
                {...attributes}
                style={{
                  backgroundColor: 'rgba(255, 255, 0, 0.3)',
                  cursor: 'pointer',
                }}
              >
                {children}
              </span>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="p-2 bg-white border border-gray-200 rounded shadow-lg"
                sideOffset={5}
                side="top"
              >
                {highlight.description}
                <Tooltip.Arrow className="fill-white" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      );
    }

    return <span {...attributes}>{children}</span>;
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
        <div className="border rounded-lg p-4 min-h-[500px] bg-white">
          <Editable
            renderLeaf={renderLeaf}
            decorate={decorate}
            placeholder="Enter your legal text..."
            className="prose max-w-none"
          />
        </div>
      </Slate>
    </div>
  );
};

export default LegalEditor; 