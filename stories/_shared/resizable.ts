import type { StyleObj } from './types';

/**
 * リサイズハンドルの位置
 */
export type ResizeHandleType = 'right' | 'bottom' | 'corner';

/**
 * リサイズする軸
 */
export type ResizeAxis = 'x' | 'y' | 'xy';

export type Size = {
  width: number;
  height: number;
};

export type ResizeLimits = {
  /** 最小幅 (px)。デフォルト: 0 */
  minWidth?: number;
  /** 最小高さ (px)。デフォルト: 0 */
  minHeight?: number;
  /** 最大幅 (px)。デフォルト: Infinity */
  maxWidth?: number;
  /** 最大高さ (px)。デフォルト: Infinity */
  maxHeight?: number;
};

/**
 * ドラッグ開始時のイベント
 *
 * DOMの`MouseEvent`とReactの`MouseEvent`の共通部分
 */
export type ResizeStartEvent = {
  clientX: number;
  clientY: number;
  preventDefault: () => void;
};

export const RESIZE_HANDLE_TYPES: ResizeHandleType[] = [
  'right',
  'bottom',
  'corner',
];

const AXES: Record<ResizeHandleType, ResizeAxis> = {
  right: 'x',
  bottom: 'y',
  corner: 'xy',
};

const CURSORS: Record<ResizeAxis, string> = {
  x: 'ew-resize',
  y: 'ns-resize',
  xy: 'nwse-resize',
};

/**
 * ラッパーのスタイル
 * @param size サイズ
 * @returns
 */
export function getWrapperStyle(size: Size): StyleObj {
  return {
    position: 'relative',
    display: 'inline-block',
    width: `${size.width}px`,
    height: `${size.height}px`,
    boxSizing: 'border-box',
  };
}

/**
 * ハンドルのスタイル
 * @param type ハンドルの位置
 * @param handleSize ハンドルの太さ (px)
 * @returns
 */
export function getHandleStyle(
  type: ResizeHandleType,
  handleSize = 8,
): StyleObj {
  const base = {
    position: 'absolute',
    zIndex: '10',
    cursor: CURSORS[AXES[type]],
  };
  if (type === 'right') {
    return {
      ...base,
      top: '0',
      right: '0',
      width: `${handleSize}px`,
      height: `calc(100% - ${handleSize}px)`,
    };
  } else if (type === 'bottom') {
    return {
      ...base,
      bottom: '0',
      left: '0',
      width: `calc(100% - ${handleSize}px)`,
      height: `${handleSize}px`,
    };
  } else {
    return {
      ...base,
      right: '0',
      bottom: '0',
      width: `${handleSize}px`,
      height: `${handleSize}px`,
    };
  }
}

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

/**
 * ハンドルのドラッグによるリサイズを開始する
 *
 * ハンドルの`mousedown`から呼び出す。ドラッグ中は`document`のイベントを監視し、
 * `mouseup`で自動的に監視を解除する。
 * @param event `mousedown`のイベント
 * @param type ハンドルの位置
 * @param startSize ドラッグ開始時のサイズ
 * @param onResize サイズが変わった時のコールバック
 * @param limits サイズの制限
 * @returns ドラッグを中断する関数
 */
export function startResize(
  event: ResizeStartEvent,
  type: ResizeHandleType,
  startSize: Size,
  onResize: (size: Size) => void,
  limits: ResizeLimits = {},
): () => void {
  const {
    minWidth = 0,
    minHeight = 0,
    maxWidth = Infinity,
    maxHeight = Infinity,
  } = limits;
  const axis = AXES[type];
  const startX = event.clientX;
  const startY = event.clientY;
  event.preventDefault();

  const onMouseMove = (e: MouseEvent): void => {
    const width =
      axis === 'y'
        ? startSize.width
        : clamp(startSize.width + e.clientX - startX, minWidth, maxWidth);
    const height =
      axis === 'x'
        ? startSize.height
        : clamp(startSize.height + e.clientY - startY, minHeight, maxHeight);
    onResize({ width, height });
  };

  const stop = (): void => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', stop);
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
  };

  // ドラッグ中にテキスト選択・カーソル変化を防ぐ
  document.body.style.userSelect = 'none';
  document.body.style.cursor = CURSORS[axis];

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', stop);
  return stop;
}
