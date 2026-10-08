import type { StickerOptions } from '@fringeworks/style-layouts-adornment/sticker';
import type { ElementType } from 'react';
import type {
  LayoutComponentBase,
  WithLayoutBaseOptions,
} from '../_internal/withLayoutBase';

export type WithStickerLayoutProps = StickerOptions;

export type WithStickerLayoutOptions = WithLayoutBaseOptions;

export type StickerLayoutComponent<C extends ElementType> = LayoutComponentBase<
  C,
  StickerOptions
>;
