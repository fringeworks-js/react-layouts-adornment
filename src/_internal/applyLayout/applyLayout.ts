import { unsafeCast } from '@fringeworks/utils';
import clsx from 'clsx';
import type { CSSProperties } from 'react';
import type {
  ApplyLayoutOptions,
  ApplyLayoutResult,
  LayoutFunction,
} from './types';

/**
 * レイアウト用のスタイルを適用する
 * @param layout レイアウトのクラスとスタイルを作る関数
 * @param options レイアウトのオプション
 * @returns
 */
export default function applyLayout<O>(
  layout: LayoutFunction<O>,
  options: ApplyLayoutOptions<O>,
): ApplyLayoutResult {
  const { className, style: optionStyle, ...rest } = options;
  const style: CSSProperties = { ...optionStyle };
  // レイアウトのクラスとスタイル
  const { className: layoutedClassName, style: layoutedStyle } = layout(
    unsafeCast<O>(rest),
  );
  if (layoutedStyle) {
    // スタイルのマージ
    Object.assign(style, layoutedStyle);
  }

  return {
    className: clsx(className, layoutedClassName),
    style,
  };
}
