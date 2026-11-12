import type { StickerItemOptions } from '@fringeworks/style-layouts-adornment/sticker';
import type { ElementType } from 'react';
import type {
  LayoutComponentBase,
  WithLayoutBaseOptions,
} from '../_internal/_withLayoutBase';

export type WithStickerItemProps = StickerItemOptions;

export type WithStickerItemOptions = WithLayoutBaseOptions;

export type StickerItemComponent<C extends ElementType> = LayoutComponentBase<
  C,
  StickerItemOptions
>;

// `side` ごとのオプションの型（`WithStickerItemProps` の union の各メンバー）。
// 利用者が `@fringeworks/style-layouts-adornment` を入れずに使えるよう、ここから export する
export type {
  StickerItemInsideOptions,
  StickerItemLeftRightOptions,
  StickerItemTopBottomOptions,
} from '@fringeworks/style-layouts-adornment/sticker';
