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

/**
 * 描画した最初の要素のclass属性とstyle属性を取り出す
 *
 * - CSS変数の出力順に依存しないよう、styleは宣言ごとに分ける
 */
const renderAttributes = (
  node: React.ReactNode,
): { html: string; classNames: string[]; styles: string[] } => {
  const html = renderToStaticMarkup(node);
  const tag = /^<[^>]*>/.exec(html)?.[0] ?? '';
  const classNames = (/ class="([^"]*)"/.exec(tag)?.[1] ?? '')
    .split(' ')
    .filter(Boolean);
  const styles = (/ style="([^"]*)"/.exec(tag)?.[1] ?? '')
    .split(';')
    .filter(Boolean);
  return { html, classNames, styles };
};

describe('withAffixLayout', () => {
  test('コンテナのクラスとCSS変数を適用し、オプションはDOMへ渡さない', () => {
    const { html, classNames, styles } = renderAttributes(
      <AffixDiv
        sizingX="hug"
        sizingY="fill"
        gap={4}
        id="container"
        className="custom"
      />,
    );
    expect(classNames).toEqual([
      'custom',
      'frgs-layout-affix',
      'frgs-layout-affix-sizingX-hug',
      'frgs-layout-affix-sizingY-fill',
    ]);
    expect(styles).toEqual(
      expect.arrayContaining([
        '--frgs-layout-affix-gapX:4px',
        '--frgs-layout-affix-gapY:4px',
      ]),
    );
    expect(html).toContain('id="container"');
    expect(html).not.toMatch(/ (sizingX|sizingY|gap)=/);
  });

  test('利用者のstyleとマージする', () => {
    const { styles } = renderAttributes(
      <AffixDiv inset={2} style={{ color: 'red' }} />,
    );
    expect(styles).toEqual(
      expect.arrayContaining([
        'color:red',
        '--frgs-layout-affix-insetX:2px',
        '--frgs-layout-affix-insetY:2px',
      ]),
    );
  });
});

describe('withAffixItem', () => {
  test('装飾のクラスとCSS変数を適用し、オプションはDOMへ渡さない', () => {
    const { html, classNames, styles } = renderAttributes(
      <AffixSpan side="top" alignX="left" gap={8}>
        label
      </AffixSpan>,
    );
    expect(classNames).toEqual([
      'frgs-layout-affix-item',
      'frgs-layout-affix-side-top',
      'frgs-layout-affix-alignX-left',
    ]);
    expect(styles).toEqual(['--frgs-layout-affix-gapY:8px']);
    expect(html).not.toMatch(/ (side|alignX|gap)=/);
  });
});

describe('withStickerLayout / withStickerItem', () => {
  test('stickerのクラスとCSS変数を適用する', () => {
    const container = renderAttributes(
      <StickerDiv sizingX="hug" sizingY="hug" inset={-8} />,
    );
    expect(container.classNames).toEqual([
      'frgs-layout-sticker',
      'frgs-layout-sticker-sizingX-hug',
      'frgs-layout-sticker-sizingY-hug',
    ]);
    expect(container.styles).toEqual(
      expect.arrayContaining([
        '--frgs-layout-sticker-insetX:-8px',
        '--frgs-layout-sticker-insetY:-8px',
      ]),
    );

    const item = renderAttributes(
      <StickerSpan side="inside" alignX="right" alignY="top">
        3
      </StickerSpan>,
    );
    expect(item.classNames).toEqual([
      'frgs-layout-sticker-item',
      'frgs-layout-sticker-side-inside',
      'frgs-layout-sticker-alignX-right',
      'frgs-layout-sticker-alignY-top',
    ]);
  });
});

describe('HOCのオプション', () => {
  test('classNameとdisplayNameを指定できる', () => {
    const Label = withAffixItem('span', {
      className: 'label',
      displayName: 'Label',
    });
    expect(Label.displayName).toBe('Label');
    expect(renderAttributes(<Label side="bottom" />).classNames).toEqual([
      'label',
      'frgs-layout-affix-item',
      'frgs-layout-affix-side-bottom',
      'frgs-layout-affix-alignX-center',
    ]);
  });
});
