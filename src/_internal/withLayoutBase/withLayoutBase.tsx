import type { StyleProxyOptions } from '@fringeworks/react-style-proxy';
import { styleProxy } from '@fringeworks/react-style-proxy';
import ensureComponent from '@fringeworks/react-utils/utils/ensureComponent';
import getComponentName from '@fringeworks/react-utils/utils/getComponentName';
import type { LooseDictionary } from '@fringeworks/types';
import { unsafeCast } from '@fringeworks/utils';
import clsx from 'clsx';
import type { ComponentRef, ElementType } from 'react';
import { createElement, forwardRef } from 'react';
import applyLayout from '../applyLayout';
import type {
  LayoutComponentBase,
  LayoutDefinition,
  WithLayoutBaseOptions,
  WithLayoutProps,
} from './types';

/**
 * レイアウト機能（コンテナ・装飾）を追加するHOC
 *
 * - レイアウトのオプションに当たるプロパティだけを取り除き、残りはコンポーネントへ渡す
 * - レイアウトのスタイルは`styleProp`のプロパティへ既定値としてマージする（ユーザーの指定が優先）
 * @param hocName HOCの名前（displayNameの既定値に使う）
 * @param Component コンポーネント
 * @param layout レイアウトを作る関数と、プロパティからそのオプションを分ける関数の組
 * @param options オプション
 * @returns
 */
export default function withLayoutBase<C extends ElementType, O extends object>(
  hocName: string,
  Component: C,
  layout: LayoutDefinition<O>,
  options: WithLayoutBaseOptions = {},
): LayoutComponentBase<C, O> {
  // 公開シグネチャは厳密に保ち、内部の型の辻褄合わせはここに閉じ込める
  const EnsuredComponent = ensureComponent(
    unsafeCast<ElementType<LooseDictionary>>(Component),
  );
  const {
    displayName = `${hocName}(${getComponentName(Component)})`,
    className: staticClassName,
    ...restOptions
  } = options;
  const styleProxyOptions: StyleProxyOptions = {
    styleAsDefault: true,
    ...restOptions,
  };
  const [createLayoutStyle, extractOptions] = layout;

  const LayoutComponent = forwardRef<ComponentRef<C>, WithLayoutProps<C, O>>(
    (props, ref) => {
      const { className, ...restProps } = unsafeCast<LooseDictionary>(props);
      const [layoutOptions, componentProps] = extractOptions(restProps);
      const layoutProps = applyLayout(createLayoutStyle, layoutOptions);
      return createElement(EnsuredComponent, {
        ref,
        className: clsx(staticClassName, className, layoutProps.className),
        ...styleProxy(componentProps, layoutProps.style, styleProxyOptions),
      });
    },
  );
  LayoutComponent.displayName = displayName;
  return LayoutComponent;
}
