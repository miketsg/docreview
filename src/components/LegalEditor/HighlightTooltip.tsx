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

export const HighlightTooltip = ({ attributes, children, highlight }: HighlightTooltipProps) => {
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
}; 