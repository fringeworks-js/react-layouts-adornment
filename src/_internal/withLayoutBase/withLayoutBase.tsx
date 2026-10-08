import type { StyleProxyOptions } from '@fringeworks/react-style-proxy';
import { styleProxy } from '@fringeworks/react-style-proxy';
import ensureComponent from '@fringeworks/react-utils/utils/ensureComponent';
import type { LooseDictionary } from '@fringeworks/types';
import { unsafeCast } from '@fringeworks/utils';
import clsx from 'clsx';
import type { ComponentRef, ElementType } from 'react';
import { createElement, forwardRef } from 'react';
import { LAYOUT_PROPS_KEYS } from '../_constants';
import type { ApplyLayoutOptions, LayoutFunction } from '../applyLayout';
import applyLayout from '../applyLayout';
import type {
  LayoutComponentBase,
  WithLayoutBaseOptions,
  WithLayoutProps,
} from './types';

/**
 * レイアウト機能を追加するHOC
 *
 * コンテナ・装飾のどちらにも使用する
 * @param Component コンポーネント
 * @param layout レイアウトのクラスとスタイルを作る関数
 * @param options オプション
 * @returns
 */
export default function withLayoutBase<C extends ElementType, O>(
  Component: C,
  layout: LayoutFunction<O>,
  options: WithLayoutBaseOptions = {},
): LayoutComponentBase<C, O> {
  // 公開シグネチャは厳密に保ち、内部の型の辻褄合わせはここに閉じ込める
  const EnsuredComponent = ensureComponent(
    unsafeCast<ElementType<LooseDictionary>>(Component),
  );
  const name =
    EnsuredComponent.displayName ?? EnsuredComponent.name ?? 'Unknown';
  const {
    displayName = `withLayout(${name})`,
    className: staticClassName,
    ...restOptions
  } = options;
  const styleProxyOptions: StyleProxyOptions = {
    styleAsDefault: true,
    ...restOptions,
  };

  const LayoutComponent = forwardRef<ComponentRef<C>, WithLayoutProps<C, O>>(
    (props, ref) => {
      // propsは`O`を含むが、未解決の型引数`O`そのものとは同一視できないためキャストする
      const layoutProps = applyLayout(
        layout,
        unsafeCast<ApplyLayoutOptions<O>>(props),
      );
      // レイアウト用のプロパティを削除
      const componentProps: LooseDictionary = { ...props };
      for (const key in LAYOUT_PROPS_KEYS) {
        delete componentProps[key];
      }
      return createElement(EnsuredComponent, {
        ref,
        className: clsx(staticClassName, layoutProps.className),
        ...styleProxy(componentProps, layoutProps.style, styleProxyOptions),
      });
    },
  );
  LayoutComponent.displayName = displayName;
  return LayoutComponent;
}
