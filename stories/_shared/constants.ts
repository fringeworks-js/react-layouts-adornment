import type { ArgTypes } from '../_internal/adapter';
import { AlignX, AlignY, Sizing } from '../_internal/adapter';
import type {
  DebugArgs,
  ItemArgs,
  LayoutArgs,
  LayoutName,
  SizingArgs,
  StoryArgs,
} from './types';

export const CONTAINER_STYLE = {
  width: 480,
  height: 240,
};

export const ALIGN_X_ARG_OPTIONS = Object.values(AlignX);

export const ALIGN_Y_ARG_OPTIONS = Object.values(AlignY);

export const SIZING_ARG_OPTIONS = ['none', ...Object.values(Sizing)];

export const SIZING_ARG_TYPES: ArgTypes<SizingArgs> = {
  sizingX: {
    control: 'select',
    options: SIZING_ARG_OPTIONS,
  },
  sizingY: {
    control: 'select',
    options: SIZING_ARG_OPTIONS,
  },
};

export const LAYOUT_ARG_TYPES: ArgTypes<LayoutArgs> = {
  gap: {
    control: 'text',
  },
  gapX: {
    control: 'text',
  },
  gapY: {
    control: 'text',
  },
  inset: {
    control: 'text',
  },
  insetX: {
    control: 'text',
  },
  insetY: {
    control: 'text',
  },
};

export const ITEM_ARG_TYPES: ArgTypes<ItemArgs> = {
  top: {
    control: 'select',
    options: ['none', ...ALIGN_X_ARG_OPTIONS],
  },
  bottom: {
    control: 'select',
    options: ['none', ...ALIGN_X_ARG_OPTIONS],
  },
  left: {
    control: 'select',
    options: ['none', ...ALIGN_Y_ARG_OPTIONS],
  },
  right: {
    control: 'select',
    options: ['none', ...ALIGN_Y_ARG_OPTIONS],
  },
  insideX: {
    control: 'select',
    options: ['none', ...ALIGN_X_ARG_OPTIONS],
  },
  insideY: {
    control: 'select',
    options: ALIGN_Y_ARG_OPTIONS,
  },
  topGap: {
    control: 'text',
  },
  insideInset: {
    control: 'text',
  },
};

export const DEBUG_ARG_TYPES: ArgTypes<DebugArgs> = {
  containerWidth: {
    control: 'text',
  },
  containerHeight: {
    control: 'text',
  },
  sizing: {
    control: 'select',
    options: ['auto', 'fill'],
  },
  main: {
    control: 'select',
    options: ['bar', 'box', 'auto'],
  },
  itemSize: {
    control: 'select',
    options: ['small', 'large'],
  },
  surroundings: {
    control: 'boolean',
  },
};

export const ARG_TYPES: Record<LayoutName, ArgTypes<StoryArgs>> = {
  affix: {
    ...SIZING_ARG_TYPES,
    ...LAYOUT_ARG_TYPES,
    ...ITEM_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  sticker: {
    ...SIZING_ARG_TYPES,
    ...LAYOUT_ARG_TYPES,
    ...ITEM_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
    centering: {
      control: 'select',
      options: ['translate', 'transform', 'inset'],
    },
    itemTransform: {
      control: 'select',
      options: ['none', 'scale', 'rotate', 'pulse'],
    },
    stageOverflow: {
      control: 'select',
      options: ['visible', 'auto'],
    },
    display: {
      control: 'select',
      options: [
        'default',
        'block',
        'inline-block',
        'flex',
        'inline-flex',
        'grid',
        'inline-grid',
      ],
    },
  },
};
