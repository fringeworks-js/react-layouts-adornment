import type { StyleProxyOptions } from '@fringeworks/react-style-proxy/styleProxy';
import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  ElementType,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import type {
  ExtractLayoutOptions,
  LayoutBaseProps,
  LayoutFunction,
} from '../_applyLayout';

/**
 * ユニオン型を分配して全てのキーを取り出す
 *
 * `keyof`をユニオン型へそのまま適用すると共通のキーしか得られないため、
 * 分配してから取り出す
 */
export type AllKeys<T> = T extends unknown ? keyof T : never;

/**
 * レイアウトを作る関数と、プロパティからそのオプションを分ける関数の組
 *
 * - オプションの型はレイアウトを作る関数から推論する
 */
export type LayoutDefinition<O> = readonly [
  layout: LayoutFunction<O>,
  extractOptions: ExtractLayoutOptions<NoInfer<O>>,
];

/**
 * HOCのオプション
 */
export type WithLayoutBaseOptions = Omit<
  StyleProxyOptions,
  'styleAsDefault'
> & {
  /**
   * コンポーネントに設定するdisplayName
   */
  displayName?: string;

  /**
   * クラス名
   */
  className?: string;
};

/**
 * レイアウト機能を追加したコンポーネントのプロパティ
 */
export type WithLayoutProps<C extends ElementType, O> = Omit<
  ComponentPropsWithoutRef<C>,
  AllKeys<O> | keyof LayoutBaseProps
> &
  O &
  LayoutBaseProps;

/**
 * レイアウト機能を追加したコンポーネント
 */
export type LayoutComponentBase<
  C extends ElementType,
  O,
> = ForwardRefExoticComponent<
  PropsWithoutRef<WithLayoutProps<C, O>> & RefAttributes<ComponentRef<C>>
>;
