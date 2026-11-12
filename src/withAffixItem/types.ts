import type { AffixItemOptions } from '@fringeworks/style-layouts-adornment/affix';
import type { ElementType } from 'react';
import type {
  LayoutComponentBase,
  WithLayoutBaseOptions,
} from '../_internal/_withLayoutBase';

export type WithAffixItemProps = AffixItemOptions;

export type WithAffixItemOptions = WithLayoutBaseOptions;

export type AffixItemComponent<C extends ElementType> = LayoutComponentBase<
  C,
  AffixItemOptions
>;

// `side` ごとのオプションの型（`WithAffixItemProps` の union の各メンバー）。
// 利用者が `@fringeworks/style-layouts-adornment` を入れずに使えるよう、ここから export する
export type {
  AffixItemInsideOptions,
  AffixItemLeftRightOptions,
  AffixItemTopBottomOptions,
} from '@fringeworks/style-layouts-adornment/affix';
