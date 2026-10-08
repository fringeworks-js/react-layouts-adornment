import sticker from '@fringeworks/style-layouts-adornment/sticker';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
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
  return withLayoutBase(Component, sticker, options);
}
