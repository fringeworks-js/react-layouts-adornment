import affix from '@fringeworks/style-layouts-adornment/affix';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { AffixLayoutComponent, WithAffixLayoutOptions } from './types';

/**
 * affixレイアウトのコンテナの機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withAffixLayout<C extends ElementType>(
  Component: C,
  options: WithAffixLayoutOptions = {},
): AffixLayoutComponent<C> {
  return withLayoutBase(Component, affix, options);
}
