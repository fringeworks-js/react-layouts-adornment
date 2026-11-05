import extractStickerOptions from '@fringeworks/style-layouts-adornment/helpers/extractStickerOptions';
import sticker from '@fringeworks/style-layouts-adornment/sticker';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/_withLayoutBase';
import type { StickerLayoutComponent, WithStickerLayoutOptions } from './types';

/**
 * stickerレイアウトのコンテナの機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withStickerLayout<C extends ElementType>(
  Component: C,
  options: WithStickerLayoutOptions = {},
): StickerLayoutComponent<C> {
  return withLayoutBase(
    'withStickerLayout',
    Component,
    [sticker, extractStickerOptions],
    options,
  );
}
