import * as Tooltip from '@radix-ui/react-tooltip';
import { Highlight } from './types';

interface HighlightTooltipProps {
  attributes: {
    'data-slate-leaf': boolean;
    [key: string]: any;
  };
  children: React.ReactNode;
  highlight: Highlight;
}

export const HighlightTooltip = ({ 
  attributes, 
  children, 
  highlight
}: HighlightTooltipProps) => {
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
            className="p-4 bg-gray-50 border border-gray-200 rounded shadow-lg w-[500px] whitespace-normal break-words"
            sideOffset={5}
            side="top"
          >
            <div className="space-y-2">
              <p>{highlight.description}</p>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  className="px-2 py-0.5 text-xs bg-black text-white rounded hover:bg-gray-800 hover:cursor-pointer transition-colors"
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="px-2 py-0.5 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 hover:cursor-pointer transition-colors"
                >
                  Ignore
                </button>
              </div>
            </div>
            <Tooltip.Arrow className="fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};