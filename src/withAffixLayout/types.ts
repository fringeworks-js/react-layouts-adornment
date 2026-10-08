import type { AffixOptions } from '@fringeworks/style-layouts-adornment/affix';
import type { ElementType } from 'react';
import type {
  LayoutComponentBase,
  WithLayoutBaseOptions,
} from '../_internal/withLayoutBase';

export type WithAffixLayoutProps = AffixOptions;

export type WithAffixLayoutOptions = WithLayoutBaseOptions;

export type AffixLayoutComponent<C extends ElementType> = LayoutComponentBase<
  C,
  AffixOptions
>;
