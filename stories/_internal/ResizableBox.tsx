import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { ResizeLimits, Size } from '../_shared/resizable';
import {
  getHandleStyle,
  getWrapperStyle,
  RESIZE_HANDLE_TYPES,
  startResize,
} from '../_shared/resizable';
import type { StyleObj } from '../_shared/types';

export type ResizableBoxProps = ResizeLimits & {
  /** 初期幅 (px)。デフォルト: 200 */
  initialWidth?: number;
  /** 初期高さ (px)。デフォルト: 200 */
  initialHeight?: number;
  /** ハンドルの太さ (px)。デフォルト: 8 */
  handleSize?: number;
  /** ラッパーに追加するスタイル */
  style?: StyleObj;
  /** 対象の要素。ラッパーいっぱいに広げること */
  children?: ReactNode;
};

/**
 * 右辺・下辺・右下コーナーをドラッグしてサイズ変更できるラッパー
 *
 * 初期サイズの変更を反映するには`key`で再生成する
 */
export default function ResizableBox(props: ResizableBoxProps) {
  const {
    initialWidth = 200,
    initialHeight = 200,
    handleSize = 8,
    style,
    children,
    ...limits
  } = props;
  const [size, setSize] = useState<Size>({
    width: initialWidth,
    height: initialHeight,
  });
  const stopResizeRef = useRef<() => void>(undefined);

  // ドラッグ中にアンマウントされた場合はドラッグを中断する
  useEffect(() => () => stopResizeRef.current?.(), []);

  return (
    <div style={{ ...getWrapperStyle(size), ...style } as CSSProperties}>
      {children}
      {RESIZE_HANDLE_TYPES.map((type) => (
        <div
          key={type}
          style={getHandleStyle(type, handleSize) as CSSProperties}
          onMouseDown={(e) => {
            stopResizeRef.current = startResize(e, type, size, setSize, limits);
          }}
        />
      ))}
    </div>
  );
}
