import type { Meta, StoryObj } from '../_internal/adapter';
import createTestRenderer from '../_internal/createTestRenderer';
import type { TestStoryArgs } from '../_shared/types';

const meta = {
  title: 'spec/sticker',
  render: createTestRenderer('sticker'),
} satisfies Meta<TestStoryArgs>;

export default meta;
type Story = StoryObj<TestStoryArgs>;

const GAP = 8;
const INSET = 8;
const FIXED_MAIN = { width: '100px', height: '60px' };

// ===== 本体・コンテナ =====

export const MainOnly: Story = {
  args: {
    main: FIXED_MAIN,
  },
};

export const Hug: Story = {
  args: {
    sizingX: 'hug',
    main: FIXED_MAIN,
  },
};

/**
 * インライン要素の本体(<img>など)でも、本体の下に行の隙間ができない
 */
export const HugInlineMain: Story = {
  args: {
    sizingX: 'hug',
    sizingY: 'hug',
    gap: GAP,
    main: { ...FIXED_MAIN, display: 'inline-block' },
    items: [
      { id: 'bottom', options: { side: 'bottom' } },
      {
        id: 'inside',
        options: { side: 'inside', alignX: 'right', alignY: 'bottom' },
      },
    ],
  },
};

// ===== 上下 =====

export const TopLeft: Story = {
  args: {
    sizingX: 'hug',
    gap: GAP,
    main: FIXED_MAIN,
    items: [{ id: 'item', options: { side: 'top', alignX: 'left' } }],
  },
};
export const TopCenter: Story = {
  args: {
    sizingX: 'hug',
    gap: GAP,
    main: FIXED_MAIN,
    items: [{ id: 'item', options: { side: 'top' } }],
  },
};
export const TopRight: Story = {
  args: {
    sizingX: 'hug',
    gap: GAP,
    main: FIXED_MAIN,
    items: [{ id: 'item', options: { side: 'top', alignX: 'right' } }],
  },
};
export const BottomLeft: Story = {
  args: {
    sizingX: 'hug',
    gap: GAP,
    main: FIXED_MAIN,
    items: [{ id: 'item', options: { side: 'bottom', alignX: 'left' } }],
  },
};
export const BottomCenter: Story = {
  args: {
    sizingX: 'hug',
    gap: GAP,
    main: FIXED_MAIN,
    items: [{ id: 'item', options: { side: 'bottom' } }],
  },
};
export const BottomRight: Story = {
  args: {
    sizingX: 'hug',
    gap: GAP,
    main: FIXED_MAIN,
    items: [{ id: 'item', options: { side: 'bottom', alignX: 'right' } }],
  },
};

// ===== 左右 =====

export const LeftTop: Story = {
  args: {
    sizingX: 'hug',
    gap: GAP,
    main: FIXED_MAIN,
    items: [{ id: 'item', options: { side: 'left', alignY: 'top' } }],
  },
};
export const LeftMiddle: Story = {
  args: {
    sizingX: 'hug',
    gap: GAP,
    main: FIXED_MAIN,
    items: [{ id: 'item', options: { side: 'left' } }],
  },
};
export const LeftBottom: Story = {
  args: {
    sizingX: 'hug',
    gap: GAP,
    main: FIXED_MAIN,
    items: [{ id: 'item', options: { side: 'left', alignY: 'bottom' } }],
  },
};
export const RightTop: Story = {
  args: {
    sizingX: 'hug',
    gap: GAP,
    main: FIXED_MAIN,
    items: [{ id: 'item', options: { side: 'right', alignY: 'top' } }],
  },
};
export const RightMiddle: Story = {
  args: {
    sizingX: 'hug',
    gap: GAP,
    main: FIXED_MAIN,
    items: [{ id: 'item', options: { side: 'right' } }],
  },
};
export const RightBottom: Story = {
  args: {
    sizingX: 'hug',
    gap: GAP,
    main: FIXED_MAIN,
    items: [{ id: 'item', options: { side: 'right', alignY: 'bottom' } }],
  },
};

// ===== 内側 =====

export const InsideLeftTop: Story = {
  args: {
    sizingX: 'hug',
    inset: INSET,
    main: FIXED_MAIN,
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
    sizingX: 'hug',
    inset: INSET,
    main: FIXED_MAIN,
    items: [{ id: 'item', options: { side: 'inside' } }],
  },
};
export const InsideRightBottom: Story = {
  args: {
    sizingX: 'hug',
    inset: INSET,
    main: FIXED_MAIN,
    items: [
      {
        id: 'item',
        options: { side: 'inside', alignX: 'right', alignY: 'bottom' },
      },
    ],
  },
};
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

// ===== 装飾ごとの上書き =====

export const ItemOverride: Story = {
  args: {
    sizingX: 'hug',
    gap: 4,
    inset: 4,
    main: FIXED_MAIN,
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

// ===== レイアウトへの影響 =====

/**
 * 装飾はレイアウト上の場所を確保しない
 */
export const NoLayoutSpace: Story = {
  args: {
    sizingX: 'hug',
    gap: GAP,
    main: FIXED_MAIN,
    surroundings: true,
    items: [
      { id: 'top', options: { side: 'top' } },
      { id: 'bottom', options: { side: 'bottom' } },
      { id: 'left', options: { side: 'left' } },
      { id: 'right', options: { side: 'right' } },
    ],
  },
};

/**
 * 本体より大きい装飾も本体の中央に揃う
 */
export const LargerThanMain: Story = {
  args: {
    sizingX: 'hug',
    gap: GAP,
    main: FIXED_MAIN,
    items: [
      {
        id: 'top',
        options: { side: 'top' },
        style: { width: '200px', height: '20px' },
      },
      {
        id: 'left',
        options: { side: 'left' },
        style: { width: '40px', height: '120px' },
      },
    ],
  },
};

/**
 * 外側の装飾はコンテナの幅で折り返さない
 */
export const NoWrap: Story = {
  args: {
    sizingX: 'hug',
    gap: GAP,
    main: FIXED_MAIN,
    items: [
      {
        id: 'item',
        options: { side: 'top' },
        text: 'a long label wider than the main element',
        style: { fontSize: '14px', lineHeight: '20px' },
      },
    ],
  },
};

/**
 * 利用者が装飾にtransformを指定しても中央に揃う
 */
export const WithItemTransform: Story = {
  args: {
    sizingX: 'hug',
    gap: GAP,
    main: FIXED_MAIN,
    items: [
      {
        id: 'top',
        options: { side: 'top' },
        style: { width: '40px', height: '20px', transform: 'scale(2)' },
      },
      {
        id: 'left',
        options: { side: 'left' },
        style: { width: '40px', height: '20px', transform: 'rotate(30deg)' },
      },
    ],
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
// ===== keep: 装飾を本体に揃える =====

const KEEP_ITEMS: NonNullable<TestStoryArgs['items']> = [
  { id: 'topLeft', options: { side: 'top', alignX: 'left' } },
  { id: 'topRight', options: { side: 'top', alignX: 'right' } },
  { id: 'leftTop', options: { side: 'left', alignY: 'top' } },
  { id: 'rightBottom', options: { side: 'right', alignY: 'bottom' } },
  { id: 'inside', options: { side: 'inside', alignX: 'right', alignY: 'top' } },
];

/**
 * keepでも装飾は本体を基準に配置される
 */
export const SizingKeepWithItems: Story = {
  args: {
    gap: GAP,
    sizingX: 'keep',
    sizingY: 'keep',
    containerStyle: SIZED_CONTAINER,
    mainClassName: 'story-main-fixed',
    items: KEEP_ITEMS,
  },
};

/**
 * 横だけkeep
 */
export const SizingKeepXWithItems: Story = {
  args: {
    gap: GAP,
    sizingX: 'keep',
    containerStyle: { width: '300px' },
    mainClassName: 'story-main-fixed',
    items: KEEP_ITEMS,
  },
};

/**
 * 縦だけkeep
 */
export const SizingKeepYWithItems: Story = {
  args: {
    gap: GAP,
    sizingY: 'keep',
    containerStyle: { height: '200px' },
    mainClassName: 'story-main-fixed',
    items: KEEP_ITEMS,
  },
};

/**
 * keepで本体がコンテナより大きい場合も、装飾は本体を基準に配置され、右と下にはみ出す
 */
export const SizingKeepOverflowWithItems: Story = {
  args: {
    gap: GAP,
    sizingX: 'keep',
    sizingY: 'keep',
    containerStyle: { width: '100px', height: '50px' },
    mainClassName: 'story-main-large',
    items: KEEP_ITEMS,
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
 * fillでも装飾はコンテナを基準に配置される
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
      {
        id: 'inside',
        options: { side: 'inside', alignX: 'right', alignY: 'top' },
      },
    ],
  },
};
