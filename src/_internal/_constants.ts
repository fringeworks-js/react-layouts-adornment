import type {
  AffixItemOptions,
  AffixOptions,
  StickerItemOptions,
  StickerOptions,
} from '@fringeworks/style-layouts-adornment';
import type { LayoutBaseProps } from './applyLayout';
import type { AllKeys } from './withLayoutBase';

/**
 * レイアウト機能が消費するプロパティのキー
 *
 * コンポーネントへ渡す前にプロパティから削除する
 */
export const LAYOUT_PROPS_KEYS: {
  [K in
    | keyof Required<LayoutBaseProps & AffixOptions & StickerOptions>
    | AllKeys<AffixItemOptions | StickerItemOptions>]: 1;
} = {
  className: 1,
  style: 1,
  sizingX: 1,
  sizingY: 1,
  gap: 1,
  gapX: 1,
  gapY: 1,
  inset: 1,
  insetX: 1,
  insetY: 1,
  side: 1,
  alignX: 1,
  alignY: 1,
} as const;
