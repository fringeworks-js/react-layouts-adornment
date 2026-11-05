import clsx from 'clsx';
import type { CSSProperties } from 'react';
import type { ApplyLayoutResult, LayoutFunction } from './types';

/**
 * レイアウト用のクラスとスタイルを作る
 *
 * - ユーザーが指定したクラス・スタイルとのマージは呼び出し側で行う
 * @param layout レイアウトのクラスとスタイルを作る関数
 * @param options レイアウトのオプション
 * @returns
 */
export default function applyLayout<O>(
  layout: LayoutFunction<O>,
  options: O,
): ApplyLayoutResult {
  const { className, style: layoutStyle } = layout(options);
  const style: CSSProperties = { ...layoutStyle };
  return { className: clsx(className), style };
}
