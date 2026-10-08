import type { Meta, StoryObj } from '../_internal/adapter';
import createTestRenderer from '../_internal/createTestRenderer';
import type { TestStoryArgs } from '../_shared/types';

const meta = {
  title: 'spec/affix',
  render: createTestRenderer('affix'),
} satisfies Meta<TestStoryArgs>;

export default meta;
type Story = StoryObj<TestStoryArgs>;

const GAP = 8;
const INSET = 8;
const TALL_MAIN = { height: '100px' };
const FIXED_MAIN = { width: '100px', height: '60px' };

// ===== 本体 =====

export const MainOnly: Story = {
  args: {},
};

export const MultipleMains: Story = {
  args: {
    mainCount: 2,
    main: { width: '100px', height: '60px' },
  },
};

// ===== 上下 =====

export const TopLeft: Story = {
  args: {
    gap: GAP,
    items: [{ id: 'item', options: { side: 'top', alignX: 'left' } }],
  },
};
export const TopCenter: Story = {
  args: {
    gap: GAP,
    items: [{ id: 'item', options: { side: 'top' } }],
  },
};
export const TopRight: Story = {
  args: {
    gap: GAP,
    items: [{ id: 'item', options: { side: 'top', alignX: 'right' } }],
  },
};
export const BottomLeft: Story = {
  args: {
    gap: GAP,
    items: [{ id: 'item', options: { side: 'bottom', alignX: 'left' } }],
  },
};
export const BottomCenter: Story = {
  args: {
    gap: GAP,
    items: [{ id: 'item', options: { side: 'bottom' } }],
  },
};
export const BottomRight: Story = {
  args: {
    gap: GAP,
    items: [{ id: 'item', options: { side: 'bottom', alignX: 'right' } }],
  },
};

// ===== 左右 =====

export const LeftTop: Story = {
  args: {
    gap: GAP,
    main: TALL_MAIN,
    items: [{ id: 'item', options: { side: 'left', alignY: 'top' } }],
  },
};
export const LeftMiddle: Story = {
  args: {
    gap: GAP,
    main: TALL_MAIN,
    items: [{ id: 'item', options: { side: 'left' } }],
  },
};
export const LeftBottom: Story = {
  args: {
    gap: GAP,
    main: TALL_MAIN,
    items: [{ id: 'item', options: { side: 'left', alignY: 'bottom' } }],
  },
};
export const RightTop: Story = {
  args: {
    gap: GAP,
    main: TALL_MAIN,
    items: [{ id: 'item', options: { side: 'right', alignY: 'top' } }],
  },
};
export const RightMiddle: Story = {
  args: {
    gap: GAP,
    main: TALL_MAIN,
    items: [{ id: 'item', options: { side: 'right' } }],
  },
};
export const RightBottom: Story = {
  args: {
    gap: GAP,
    main: TALL_MAIN,
    items: [{ id: 'item', options: { side: 'right', alignY: 'bottom' } }],
  },
};

// ===== 内側 =====

export const InsideLeftTop: Story = {
  args: {
    inset: INSET,
    main: TALL_MAIN,
    items: [
      {
        id: 'item',
        options: { side: 'inside', alignX: 'left', alignY: 'top' },
      },
    ],
  },
};
export const InsideCenterMiddle: Story = {
  args: {
    inset: INSET,
    main: TALL_MAIN,
    items: [{ id: 'item', options: { side: 'inside' } }],
  },
};
export const InsideRightBottom: Story = {
  args: {
    inset: INSET,
    main: TALL_MAIN,
    items: [
      {
        id: 'item',
        options: { side: 'inside', alignX: 'right', alignY: 'bottom' },
      },
    ],
  },
};

/**
 * 本体より大きい内側の装飾
 */
export const InsideLargerThanMain: Story = {
  args: {
    main: { height: '10px' },
    items: [{ id: 'item', options: { side: 'inside' } }],
  },
};

/**
 * 負のinset
 */
export const NegativeInset: Story = {
  args: {
    sizingX: 'hug',
    inset: -8,
    main: FIXED_MAIN,
    items: [
      {
        id: 'item',
        options: { side: 'inside', alignX: 'right', alignY: 'top' },
      },
    ],
  },
};

// ===== 間隔 =====

/**
 * 装飾のない側には間隔ができない
 */
export const GapOnlyWithItem: Story = {
  args: {
    gap: 16,
    items: [{ id: 'item', options: { side: 'right' } }],
  },
};

/**
 * 装飾ごとの上書き
 */
export const ItemOverride: Story = {
  args: {
    gap: 4,
    inset: 4,
    main: TALL_MAIN,
    items: [
      { id: 'top', options: { side: 'top', alignX: 'left', gap: 16 } },
      { id: 'bottom', options: { side: 'bottom', alignX: 'left' } },
      {
        id: 'inside',
        options: { side: 'inside', alignX: 'left', alignY: 'top', inset: 12 },
      },
    ],
  },
};

// ===== コンテナの幅 =====

export const FixedMain: Story = {
  args: {
    main: FIXED_MAIN,
    items: [{ id: 'item', options: { side: 'top' } }],
  },
};

export const Hug: Story = {
  args: {
    sizingX: 'hug',
    gap: GAP,
    main: FIXED_MAIN,
    items: [
      { id: 'top', options: { side: 'top' } },
      { id: 'left', options: { side: 'left' } },
      { id: 'right', options: { side: 'right' } },
    ],
  },
};

// ===== 本体の位置 =====

/**
 * 本体より高い左右の装飾があっても、本体は行の中央に配置される
 */
export const TallerSideItem: Story = {
  args: {
    main: { height: '10px' },
    items: [
      {
        id: 'item',
        options: { side: 'left' },
        style: { width: '40px', height: '40px' },
      },
    ],
  },
};

// ===== 重なり =====

/**
 * 同じ位置の装飾は重なる
 */
export const SamePosition: Story = {
  args: {
    items: [
      { id: 'item', options: { side: 'top', alignX: 'left' } },
      { id: 'item-2', options: { side: 'top', alignX: 'left' } },
    ],
  },
};

/**
 * DOM順で本体より前にある内側の装飾も、本体の上に表示される
 */
export const InsideAboveMain: Story = {
  args: {
    main: { height: '60px', position: 'relative' },
    items: [{ id: 'item', options: { side: 'inside' } }],
  },
};

// ===== 大きさの決め方 =====

const SIZED_CONTAINER = { width: '300px', height: '200px' };

export const SizingFill: Story = {
  args: {
    sizingX: 'fill',
    sizingY: 'fill',
    containerStyle: SIZED_CONTAINER,
    mainClassName: 'story-main-fixed',
  },
};

export const SizingKeep: Story = {
  args: {
    sizingX: 'keep',
    sizingY: 'keep',
    containerStyle: SIZED_CONTAINER,
    mainClassName: 'story-main-fixed',
  },
};

/**
 * 本体がコンテナより大きい場合
 */
export const SizingKeepOverflow: Story = {
  args: {
    sizingX: 'keep',
    sizingY: 'keep',
    containerStyle: { width: '100px', height: '50px' },
    mainClassName: 'story-main-large',
  },
};

/**
 * クラスで指定したコンテナの大きさはhugで上書きされる
 */
export const SizingHug: Story = {
  args: {
    sizingX: 'hug',
    sizingY: 'hug',
    containerClassName: 'story-container-sized',
    mainClassName: 'story-main-fixed',
  },
};

/**
 * インラインスタイルで指定したコンテナの大きさはhugより優先される
 */
export const SizingHugInlineSize: Story = {
  args: {
    sizingX: 'hug',
    sizingY: 'hug',
    containerStyle: SIZED_CONTAINER,
    mainClassName: 'story-main-fixed',
  },
};

/**
 * 幅を指定しない本体をkeepにすると幅は0になる
 */
export const SizingKeepWithoutMainWidth: Story = {
  args: {
    sizingX: 'keep',
    mainClassName: 'story-main-bar',
  },
};

/**
 * プログレスバー: 横はfill、縦はkeep
 */
export const SizingProgressBar: Story = {
  args: {
    sizingX: 'fill',
    sizingY: 'keep',
    containerStyle: { height: '100px' },
    mainClassName: 'story-main-bar',
  },
};

/**
 * fillの本体は装飾を除いた領域いっぱいになる
 */
export const SizingFillWithItems: Story = {
  args: {
    gap: GAP,
    sizingX: 'fill',
    sizingY: 'fill',
    containerStyle: SIZED_CONTAINER,
    mainClassName: 'story-main-fixed',
    items: [
      { id: 'top', options: { side: 'top' } },
      { id: 'left', options: { side: 'left' } },
      {
        id: 'inside',
        options: { side: 'inside', alignX: 'right', alignY: 'top' },
      },
    ],
  },
};

/**
 * コンテナの高さが決まっていない場合、縦のfillは行の高さになる
 */
export const SizingFillAutoHeight: Story = {
  args: {
    sizingY: 'fill',
    mainClassName: 'story-main-fixed',
    items: [
      {
        id: 'left',
        options: { side: 'left' },
        style: { width: '40px', height: '120px' },
      },
    ],
  },
};
