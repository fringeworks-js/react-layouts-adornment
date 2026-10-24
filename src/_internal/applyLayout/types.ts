import type { LayoutStyle } from '@fringeworks/style-layouts-adornment';
import type { LooseDictionary } from '@fringeworks/types';
import type { CSSProperties } from 'react';

/**
 * レイアウトのクラスとスタイルを作る関数
 *
 * - HOCからは常にオプションを渡すため、オプションを省略できない関数（`affixItem`など）も受け付ける
 * - オプションを省略できる関数（`affix`など）も含めておくと、型引数の推論で`undefined`が混ざらない
 */
export type LayoutFunction<O> =
  ((options?: O) => LayoutStyle) | ((options: O) => LayoutStyle);

/**
 * プロパティからレイアウトのオプションとそれ以外を分ける関数（`extract*Options`）
 */
export type ExtractLayoutOptions<O> = (
  props: LooseDictionary,
) => [O, LooseDictionary];

/**
 * レイアウト機能が消費する共通のプロパティ
 *
 * - `style`は消費せず、レイアウトのスタイルを`styleProp`のプロパティへマージする
 */
export type LayoutBaseProps = {
  /**
   * クラス
   */
  className?: string;
};

export type ApplyLayoutResult = {
  /**
   * クラス
   */
  className: string;

  /**
   * スタイル
   */
  style: CSSProperties;
};
