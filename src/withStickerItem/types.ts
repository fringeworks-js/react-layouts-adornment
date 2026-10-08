import type { StickerItemOptions } from '@fringeworks/style-layouts-adornment/sticker';
import type { ElementType } from 'react';
import type {
  LayoutComponentBase,
  WithLayoutBaseOptions,
} from '../_internal/withLayoutBase';

export type WithStickerItemProps = StickerItemOptions;

export type WithStickerItemOptions = WithLayoutBaseOptions;

export type StickerItemComponent<C extends ElementType> = LayoutComponentBase<
  C,
  StickerItemOptions
>;
