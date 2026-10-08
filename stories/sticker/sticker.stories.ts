import type { Meta, StoryObj } from '../_internal/adapter';
import createRenderer from '../_internal/createRenderer';
import { ARG_TYPES } from '../_shared/constants';
import type { StoryArgs } from '../_shared/types';

const meta = {
  title: 'sticker',
  render: createRenderer('sticker'),
  argTypes: ARG_TYPES.sticker,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

// ===== 基本 =====

/**
 * 本体の右上にバッジを貼る
 */
export const Default: Story = {
  args: {
    main: 'box',
    insideX: 'right',
    insideY: 'top',
    inset: '-8',
  },
};

/**
 * 全てのsideに配置する
 */
export const AllSides: Story = {
  args: {
    main: 'box',
    top: 'center',
    bottom: 'center',
    left: 'middle',
    right: 'middle',
    insideX: 'center',
    insideY: 'middle',
    gap: '4',
  },
};

/**
 * プログレスバーにラベルを貼る
 */
export const ProgressBar: Story = {
  args: {
    main: 'bar',
    top: 'left',
    right: 'middle',
    insideX: 'center',
    gap: '4',
  },
};

// ===== レイアウトへの影響 =====

/**
 * 装飾はレイアウト上の場所を確保しないため、周りの要素と重なる
 */
export const Surroundings: Story = {
  args: {
    main: 'box',
    top: 'left',
    bottom: 'right',
    gap: '4',
    surroundings: true,
  },
};

/**
 * 装飾が本体より大きくても、本体の大きさや位置は変わらない
 */
export const LargeItem: Story = {
  args: {
    main: 'bar',
    left: 'middle',
    right: 'top',
    insideX: 'center',
    itemSize: 'large',
    gap: '4',
  },
};

// ===== コンテナの幅 =====

/**
 * 幅を固定した本体でsizingXを指定しない場合、コンテナは親の幅に広がり、装飾は本体から離れる
 */
export const FixedSizeMain: Story = {
  args: {
    main: 'box',
    top: 'center',
    right: 'middle',
    insideX: 'right',
    insideY: 'top',
    inset: '-8',
    gap: '4',
  },
};

/**
 * sizingXに`hug`を指定すると、コンテナの幅が本体に合い、装飾が本体に揃う
 */
export const Hug: Story = {
  args: {
    main: 'box',
    sizingX: 'hug',
    top: 'center',
    right: 'middle',
    insideX: 'right',
    insideY: 'top',
    inset: '-8',
    gap: '4',
  },
};

/**
 * 幅を指定しない本体(プログレスバーなど)でsizingXに`hug`を指定すると、本体の幅は0になる
 */
export const HugWithoutMainWidth: Story = {
  args: {
    main: 'bar',
    sizingX: 'hug',
    top: 'left',
    insideX: 'center',
    gap: '4',
  },
};

// ===== 中央寄せの方法の比較 =====

/**
 * 外側の装飾を中央に揃える方法を比較する
 *
 * - centering: 中央寄せの方法を切り替える
 * - itemTransform: 利用者が装飾にtransformを指定した場合を再現する
 * - stageOverflow: autoにすると、はみ出しがスクロール領域に影響するかを確認できる
 */
export const Centering: Story = {
  args: {
    main: 'box',
    sizingX: 'hug',
    top: 'center',
    bottom: 'center',
    left: 'middle',
    right: 'middle',
    itemSize: 'large',
    gap: '4',
    centering: 'translate',
    itemTransform: 'scale',
    stageOverflow: 'auto',
  },
};

// ===== 大きさの決め方 =====

/**
 * sizingX / sizingYを試す
 *
 * - sizing: fillでコンテナをリサイズ可能な領域いっぱいに広げると、fillの効果が確認しやすい
 * - main: 本体の種類を切り替えて確認する
 */
export const Sizing: Story = {
  args: {
    main: 'box',
    sizing: 'fill',
    sizingX: 'fill',
    sizingY: 'fill',
    top: 'left',
    right: 'middle',
    insideX: 'right',
    insideY: 'top',
    gap: '4',
  },
};

/**
 * fill: 本体をコンテナに合わせる
 */
export const SizingFill: Story = {
  args: {
    main: 'box',
    sizing: 'fill',
    sizingX: 'fill',
    sizingY: 'fill',
    top: 'left',
    insideX: 'center',
    gap: '4',
  },
};

/**
 * keep: 本体の大きさを保ち、中央に置く
 */
export const SizingKeep: Story = {
  args: {
    main: 'box',
    sizing: 'fill',
    sizingX: 'keep',
    sizingY: 'keep',
    top: 'center',
    insideX: 'right',
    insideY: 'top',
    gap: '4',
  },
};

/**
 * hug: コンテナを本体に合わせる
 */
export const SizingHug: Story = {
  args: {
    main: 'box',
    sizing: 'auto',
    sizingX: 'hug',
    sizingY: 'hug',
    top: 'center',
    insideX: 'right',
    insideY: 'top',
    gap: '4',
  },
};

/**
 * プログレスバー: 横はfill、縦はkeep
 */
export const SizingProgressBar: Story = {
  args: {
    main: 'bar',
    sizing: 'fill',
    sizingX: 'fill',
    sizingY: 'keep',
    top: 'left',
    right: 'middle',
    insideX: 'center',
    gap: '4',
  },
};
