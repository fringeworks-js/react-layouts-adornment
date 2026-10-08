import { affixItem } from '@fringeworks/style-layouts-adornment/affix';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { AffixItemComponent, WithAffixItemOptions } from './types';

/**
 * affixレイアウトの装飾の機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withAffixItem<C extends ElementType>(
  Component: C,
  options: WithAffixItemOptions = {},
): AffixItemComponent<C> {
  return withLayoutBase(Component, affixItem, options);
}
