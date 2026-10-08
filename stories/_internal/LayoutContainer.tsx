import type { CSSProperties } from 'react';
import type { ContainerModel } from '../_shared/createContainerModel';
import type LAYOUTS from './layouts';
import ResizableBox from './ResizableBox';

export type LayoutContainerProps = {
  /**
   * 表示するレイアウト
   */
  layout: (typeof LAYOUTS)[keyof typeof LAYOUTS];

  /**
   * 描画内容
   */
  model: ContainerModel;
};

/**
 * 表示確認用のコンテナー
 */
export default function LayoutContainer(props: LayoutContainerProps) {
  const {
    layout: { Container, Item },
    model,
  } = props;
  const {
    options,
    resizable,
    containerClassName,
    containerStyle,
    main,
    items,
    surroundings,
  } = model;
  const { initialWidth, initialHeight } = resizable;
  const surrounding = surroundings && (
    <p style={surroundings.style as CSSProperties}>{surroundings.text}</p>
  );

  return (
    <ResizableBox
      // argsで初期サイズが変わった場合は作り直す
      key={`${initialWidth}x${initialHeight}`}
      initialWidth={initialWidth}
      initialHeight={initialHeight}
      style={resizable.style}
    >
      <div style={{ width: '100%', height: '100%' }}>
        {surrounding}
        <Container
          {...options}
          className={containerClassName || undefined}
          style={containerStyle as CSSProperties}
        >
          {/* 装飾 */}
          {items.map(({ label, options, style }) => (
            <Item key={label} {...options} style={style as CSSProperties}>
              {label}
            </Item>
          ))}
          {/* 本体 */}
          <div
            className={main.className || undefined}
            style={main.style as CSSProperties}
          >
            {main.label}
          </div>
        </Container>
        {surrounding}
      </div>
    </ResizableBox>
  );
}
