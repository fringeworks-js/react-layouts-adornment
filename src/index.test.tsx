import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  withAffixItem,
  withAffixLayout,
  withStickerItem,
  withStickerLayout,
} from './index';

const AffixDiv = withAffixLayout('div');
const AffixSpan = withAffixItem('span');
const StickerDiv = withStickerLayout('div');
const StickerSpan = withStickerItem('span');

describe('withAffixLayout', () => {
  test('コンテナのクラスとCSS変数を適用し、オプションはDOMへ渡さない', () => {
    const html = renderToStaticMarkup(
      <AffixDiv
        sizingX="hug"
        sizingY="fill"
        gap={4}
        id="container"
        className="custom"
      />,
    );
    expect(html).toBe(
      '<div class="custom frg-layout-affix frg-layout-affix-sizingX-hug frg-layout-affix-sizingY-fill" id="container" style="--frg-layout-affix-gapX:4px;--frg-layout-affix-gapY:4px"></div>',
    );
  });

  test('利用者のstyleとマージする', () => {
    const html = renderToStaticMarkup(
      <AffixDiv inset={2} style={{ color: 'red' }} />,
    );
    expect(html).toBe(
      '<div class="frg-layout-affix" style="color:red;--frg-layout-affix-insetX:2px;--frg-layout-affix-insetY:2px"></div>',
    );
  });
});

describe('withAffixItem', () => {
  test('装飾のクラスとCSS変数を適用し、オプションはDOMへ渡さない', () => {
    const html = renderToStaticMarkup(
      <AffixSpan side="top" alignX="left" gap={8}>
        label
      </AffixSpan>,
    );
    expect(html).toBe(
      '<span class="frg-layout-affix-item frg-layout-affix-side-top frg-layout-affix-alignX-left" style="--frg-layout-affix-gapX:8px;--frg-layout-affix-gapY:8px">label</span>',
    );
  });

  test('refを引き継ぐ', () => {
    const ref = createRef<HTMLSpanElement>();
    // サーバー描画ではrefは設定されないため、型と描画が成立することのみ確認する
    expect(() =>
      renderToStaticMarkup(<AffixSpan ref={ref} side="inside" />),
    ).not.toThrow();
  });
});

describe('withStickerLayout / withStickerItem', () => {
  test('stickerのクラスとCSS変数を適用する', () => {
    const html = renderToStaticMarkup(
      <StickerDiv sizingX="hug" sizingY="hug" inset={-8}>
        <div />
        <StickerSpan side="inside" alignX="right" alignY="top">
          3
        </StickerSpan>
      </StickerDiv>,
    );
    expect(html).toBe(
      '<div class="frg-layout-sticker frg-layout-sticker-sizingX-hug frg-layout-sticker-sizingY-hug" style="--frg-layout-sticker-insetX:-8px;--frg-layout-sticker-insetY:-8px"><div></div><span class="frg-layout-sticker-item frg-layout-sticker-side-inside frg-layout-sticker-alignX-right frg-layout-sticker-alignY-top">3</span></div>',
    );
  });
});

describe('HOCのオプション', () => {
  test('classNameとdisplayNameを指定できる', () => {
    const Label = withAffixItem('span', {
      className: 'label',
      displayName: 'Label',
    });
    expect(Label.displayName).toBe('Label');
    expect(renderToStaticMarkup(<Label side="bottom" />)).toBe(
      '<span class="label frg-layout-affix-item frg-layout-affix-side-bottom frg-layout-affix-alignX-center"></span>',
    );
  });
});
