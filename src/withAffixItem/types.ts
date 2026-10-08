import type { AffixItemOptions } from '@fringeworks/style-layouts-adornment/affix';
import type { ElementType } from 'react';
import type {
  LayoutComponentBase,
  WithLayoutBaseOptions,
} from '../_internal/withLayoutBase';

export type WithAffixItemProps = AffixItemOptions;

export type WithAffixItemOptions = WithLayoutBaseOptions;

export type AffixItemComponent<C extends ElementType> = LayoutComponentBase<
  C,
  AffixItemOptions
>;
