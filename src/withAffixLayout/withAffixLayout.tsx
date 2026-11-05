import affix from '@fringeworks/style-layouts-adornment/affix';
import extractAffixOptions from '@fringeworks/style-layouts-adornment/helpers/extractAffixOptions';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/_withLayoutBase';
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
  return withLayoutBase(
    'withAffixLayout',
    Component,
    [affix, extractAffixOptions],
    options,
  );
}
