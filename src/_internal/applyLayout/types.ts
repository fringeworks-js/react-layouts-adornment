import type { LayoutStyle } from '@fringeworks/style-layouts-adornment';
import type { CSSProperties } from 'react';

/**
 * レイアウトのクラスとスタイルを作る関数
 */
export type LayoutFunction<O> = (options: O) => LayoutStyle;

/**
 * レイアウト機能が消費する共通のプロパティ
 */
export type LayoutBaseProps = {
  /**
   * クラス
   */
  className?: string;

  /**
   * スタイル
   */
  style?: CSSProperties;
};

/**
 * レイアウト用のスタイルを適用する際のオプション
 */
export type ApplyLayoutOptions<O> = O & LayoutBaseProps;

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
