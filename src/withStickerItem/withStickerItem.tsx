import extractStickerItemOptions from '@fringeworks/style-layouts-adornment/helpers/extractStickerItemOptions';
import { stickerItem } from '@fringeworks/style-layouts-adornment/sticker';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { StickerItemComponent, WithStickerItemOptions } from './types';

/**
 * stickerレイアウトの装飾の機能を追加するHOC
 *
 * - 指定した間隔・距離だけ、コンテナ（withStickerLayout）の指定を上書きする
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withStickerItem<C extends ElementType>(
  Component: C,
  options: WithStickerItemOptions = {},
): StickerItemComponent<C> {
  return withLayoutBase(
    'withStickerItem',
    Component,
    [stickerItem, extractStickerItemOptions],
    options,
  );
}
