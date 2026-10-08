import { stickerItem } from '@fringeworks/style-layouts-adornment/sticker';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { StickerItemComponent, WithStickerItemOptions } from './types';

/**
 * stickerレイアウトの装飾の機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withStickerItem<C extends ElementType>(
  Component: C,
  options: WithStickerItemOptions = {},
): StickerItemComponent<C> {
  return withLayoutBase(Component, stickerItem, options);
}
