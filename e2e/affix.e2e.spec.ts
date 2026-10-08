import { expect, test, type Page } from '@playwright/test';

const STORY_URL = (storyId: string) =>
  `/iframe.html?id=spec-affix--${storyId}&viewMode=story`;

const gotoStory = async (page: Page, storyId: string) => {
  await page.setViewportSize({ width: 800, height: 600 });
  await page.goto(STORY_URL(storyId));
  // 幅が0の本体もあるため、表示ではなく要素の存在を待つ
  await page.waitForSelector('[data-testid="main"]', { state: 'attached' });
};

const GAP = 8;
const INSET = 8;

type Rect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
};

const toRect = (el: Element): Rect => {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left,
    right: rect.right,
    top: rect.top,
    bottom: rect.bottom,
    width: rect.width,
    height: rect.height,
  };
};

const getRect = (page: Page, testId: string) =>
  page.getByTestId(testId).evaluate(toRect);

const getContainerRect = (page: Page) =>
  page.locator('.frg-layout-affix').evaluate(toRect);

const midX = (rect: Rect) => (rect.left + rect.right) / 2;
const midY = (rect: Rect) => (rect.top + rect.bottom) / 2;

// ===== 本体 =====

test.describe('affix - 本体', () => {
  test('装飾がない場合、本体はコンテナいっぱいに配置される', async ({
    page,
  }) => {
    await gotoStory(page, 'main-only');
    const main = await getRect(page, 'main');
    const container = await getContainerRect(page);
    expect(main.left).toBeCloseTo(container.left, 0);
    expect(main.width).toBeCloseTo(container.width, 0);
    expect(main.height).toBeCloseTo(40, 0);
    expect(container.height).toBeCloseTo(40, 0);
  });

  test('本体が複数ある場合は重なる', async ({ page }) => {
    await gotoStory(page, 'multiple-mains');
    const main = await getRect(page, 'main');
    const main2 = await getRect(page, 'main-2');
    expect(main2.left).toBeCloseTo(main.left, 0);
    expect(main2.top).toBeCloseTo(main.top, 0);
  });

  test('本体より高い左右の装飾があっても、本体は伸びずに行の中央に配置される', async ({
    page,
  }) => {
    await gotoStory(page, 'taller-side-item');
    const main = await getRect(page, 'main');
    const item = await getRect(page, 'item');
    expect(main.height).toBeCloseTo(10, 0);
    expect(midY(main)).toBeCloseTo(midY(item), 0);
  });
});

// ===== 上下 =====

test.describe('affix - 上下', () => {
  test('top: 本体の上にgapの間隔で配置される', async ({ page }) => {
    await gotoStory(page, 'top-center');
    const main = await getRect(page, 'main');
    const item = await getRect(page, 'item');
    expect(item.bottom).toBeCloseTo(main.top - GAP, 0);
  });

  test('top / left: 本体の左端に揃う', async ({ page }) => {
    await gotoStory(page, 'top-left');
    const main = await getRect(page, 'main');
    const item = await getRect(page, 'item');
    expect(item.left).toBeCloseTo(main.left, 0);
  });

  test('top / center: 本体の横方向の中央に揃う', async ({ page }) => {
    await gotoStory(page, 'top-center');
    const main = await getRect(page, 'main');
    const item = await getRect(page, 'item');
    expect(midX(item)).toBeCloseTo(midX(main), 0);
  });

  test('top / right: 本体の右端に揃う', async ({ page }) => {
    await gotoStory(page, 'top-right');
    const main = await getRect(page, 'main');
    const item = await getRect(page, 'item');
    expect(item.right).toBeCloseTo(main.right, 0);
  });

  test('bottom: 本体の下にgapの間隔で配置される', async ({ page }) => {
    await gotoStory(page, 'bottom-center');
    const main = await getRect(page, 'main');
    const item = await getRect(page, 'item');
    expect(item.top).toBeCloseTo(main.bottom + GAP, 0);
    expect(midX(item)).toBeCloseTo(midX(main), 0);
  });

  test('bottom / left・right: 本体の端に揃う', async ({ page }) => {
    await gotoStory(page, 'bottom-left');
    const mainL = await getRect(page, 'main');
    const itemL = await getRect(page, 'item');
    expect(itemL.left).toBeCloseTo(mainL.left, 0);

    await gotoStory(page, 'bottom-right');
    const mainR = await getRect(page, 'main');
    const itemR = await getRect(page, 'item');
    expect(itemR.right).toBeCloseTo(mainR.right, 0);
  });
});

// ===== 左右 =====

test.describe('affix - 左右', () => {
  test('left: 本体の左にgapの間隔で配置される', async ({ page }) => {
    await gotoStory(page, 'left-middle');
    const main = await getRect(page, 'main');
    const item = await getRect(page, 'item');
    expect(item.right).toBeCloseTo(main.left - GAP, 0);
  });

  test('left / top: 本体の上端に揃う', async ({ page }) => {
    await gotoStory(page, 'left-top');
    const main = await getRect(page, 'main');
    const item = await getRect(page, 'item');
    expect(item.top).toBeCloseTo(main.top, 0);
  });

  test('left / middle: 本体の縦方向の中央に揃う', async ({ page }) => {
    await gotoStory(page, 'left-middle');
    const main = await getRect(page, 'main');
    const item = await getRect(page, 'item');
    expect(midY(item)).toBeCloseTo(midY(main), 0);
  });

  test('left / bottom: 本体の下端に揃う', async ({ page }) => {
    await gotoStory(page, 'left-bottom');
    const main = await getRect(page, 'main');
    const item = await getRect(page, 'item');
    expect(item.bottom).toBeCloseTo(main.bottom, 0);
  });

  test('right: 本体の右にgapの間隔で配置される', async ({ page }) => {
    await gotoStory(page, 'right-middle');
    const main = await getRect(page, 'main');
    const item = await getRect(page, 'item');
    expect(item.left).toBeCloseTo(main.right + GAP, 0);
    expect(midY(item)).toBeCloseTo(midY(main), 0);
  });

  test('right / top・bottom: 本体の端に揃う', async ({ page }) => {
    await gotoStory(page, 'right-top');
    const mainT = await getRect(page, 'main');
    const itemT = await getRect(page, 'item');
    expect(itemT.top).toBeCloseTo(mainT.top, 0);

    await gotoStory(page, 'right-bottom');
    const mainB = await getRect(page, 'main');
    const itemB = await getRect(page, 'item');
    expect(itemB.bottom).toBeCloseTo(mainB.bottom, 0);
  });
});

// ===== 内側 =====

test.describe('affix - 内側', () => {
  test('left / top: 本体の左上からinsetの距離に配置される', async ({
    page,
  }) => {
    await gotoStory(page, 'inside-left-top');
    const main = await getRect(page, 'main');
    const item = await getRect(page, 'item');
    expect(item.left).toBeCloseTo(main.left + INSET, 0);
    expect(item.top).toBeCloseTo(main.top + INSET, 0);
  });

  test('center / middle: 本体の中央に配置される', async ({ page }) => {
    await gotoStory(page, 'inside-center-middle');
    const main = await getRect(page, 'main');
    const item = await getRect(page, 'item');
    expect(midX(item)).toBeCloseTo(midX(main), 0);
    expect(midY(item)).toBeCloseTo(midY(main), 0);
    expect(item.width).toBeCloseTo(40, 0);
  });

  test('right / bottom: 本体の右下からinsetの距離に配置される', async ({
    page,
  }) => {
    await gotoStory(page, 'inside-right-bottom');
    const main = await getRect(page, 'main');
    const item = await getRect(page, 'item');
    expect(item.right).toBeCloseTo(main.right - INSET, 0);
    expect(item.bottom).toBeCloseTo(main.bottom - INSET, 0);
  });

  test('本体より大きい内側の装飾は、本体の大きさに影響しない', async ({
    page,
  }) => {
    await gotoStory(page, 'inside-larger-than-main');
    const main = await getRect(page, 'main');
    const container = await getContainerRect(page);
    expect(main.height).toBeCloseTo(10, 0);
    expect(container.height).toBeCloseTo(10, 0);
  });

  test('負のinsetで本体の端からはみ出す', async ({ page }) => {
    await gotoStory(page, 'negative-inset');
    const main = await getRect(page, 'main');
    const item = await getRect(page, 'item');
    expect(item.right).toBeCloseTo(main.right + 8, 0);
    expect(item.top).toBeCloseTo(main.top - 8, 0);
  });

  test('DOM順で本体より前にあっても、本体の上に表示される', async ({
    page,
  }) => {
    await gotoStory(page, 'inside-above-main');
    const item = await getRect(page, 'item');
    const testId = await page.evaluate(
      ({ x, y }) =>
        (document.elementFromPoint(x, y) as HTMLElement | null)?.dataset.testid,
      { x: midX(item), y: midY(item) },
    );
    expect(testId).toBe('item');
  });
});

// ===== 間隔 =====

test.describe('affix - 間隔', () => {
  test('装飾のない側には間隔ができない', async ({ page }) => {
    await gotoStory(page, 'gap-only-with-item');
    const main = await getRect(page, 'main');
    const item = await getRect(page, 'item');
    const container = await getContainerRect(page);
    expect(main.left).toBeCloseTo(container.left, 0);
    expect(main.top).toBeCloseTo(container.top, 0);
    expect(main.bottom).toBeCloseTo(container.bottom, 0);
    expect(item.left).toBeCloseTo(main.right + 16, 0);
  });

  test('装飾ごとにgap / insetを上書きできる', async ({ page }) => {
    await gotoStory(page, 'item-override');
    const main = await getRect(page, 'main');
    const top = await getRect(page, 'top');
    const bottom = await getRect(page, 'bottom');
    const inside = await getRect(page, 'inside');
    expect(top.bottom).toBeCloseTo(main.top - 16, 0);
    expect(bottom.top).toBeCloseTo(main.bottom + 4, 0);
    expect(inside.left).toBeCloseTo(main.left + 12, 0);
    expect(inside.top).toBeCloseTo(main.top + 12, 0);
  });
});

// ===== コンテナの幅 =====

test.describe('affix - コンテナの幅', () => {
  test('hugを指定しない場合、幅を固定した本体は列の左端に置かれ、装飾は列に揃う', async ({
    page,
  }) => {
    await gotoStory(page, 'fixed-main');
    const main = await getRect(page, 'main');
    const item = await getRect(page, 'item');
    const container = await getContainerRect(page);
    expect(container.width).toBeGreaterThan(main.width);
    expect(main.left).toBeCloseTo(container.left, 0);
    expect(midX(item)).toBeCloseTo(midX(container), 0);
  });

  test('hug: コンテナの幅が本体と装飾に合い、装飾が本体に揃う', async ({
    page,
  }) => {
    await gotoStory(page, 'hug');
    const main = await getRect(page, 'main');
    const top = await getRect(page, 'top');
    const container = await getContainerRect(page);
    expect(container.width).toBeCloseTo(main.width + (40 + GAP) * 2, 0);
    expect(midX(top)).toBeCloseTo(midX(main), 0);
  });
});

// ===== 重なり =====

test.describe('affix - 重なり', () => {
  test('同じ位置の装飾は重なる', async ({ page }) => {
    await gotoStory(page, 'same-position');
    const item = await getRect(page, 'item');
    const item2 = await getRect(page, 'item-2');
    expect(item2.left).toBeCloseTo(item.left, 0);
    expect(item2.top).toBeCloseTo(item.top, 0);
  });
});

// ===== 大きさの決め方 =====

test.describe('affix - 大きさの決め方', () => {
  test('fill: 本体がコンテナに合わせて伸び縮みする', async ({ page }) => {
    await gotoStory(page, 'sizing-fill');
    const main = await getRect(page, 'main');
    const container = await getContainerRect(page);
    expect(main.left).toBeCloseTo(container.left, 0);
    expect(main.top).toBeCloseTo(container.top, 0);
    expect(main.width).toBeCloseTo(300, 0);
    expect(main.height).toBeCloseTo(200, 0);
  });

  test('keep: 本体の大きさのまま中央に置かれる', async ({ page }) => {
    await gotoStory(page, 'sizing-keep');
    const main = await getRect(page, 'main');
    const container = await getContainerRect(page);
    expect(main.width).toBeCloseTo(100, 0);
    expect(main.height).toBeCloseTo(60, 0);
    expect(midX(main)).toBeCloseTo(midX(container), 0);
    expect(midY(main)).toBeCloseTo(midY(container), 0);
  });

  test('keep: 本体がコンテナより大きい場合は右と下にはみ出す', async ({
    page,
  }) => {
    await gotoStory(page, 'sizing-keep-overflow');
    const main = await getRect(page, 'main');
    const container = await getContainerRect(page);
    expect(main.width).toBeCloseTo(200, 0);
    expect(main.height).toBeCloseTo(100, 0);
    expect(main.left).toBeCloseTo(container.left, 0);
    expect(main.top).toBeCloseTo(container.top, 0);
  });

  test('keep: 幅を指定しない本体は幅が0になる', async ({ page }) => {
    await gotoStory(page, 'sizing-keep-without-main-width');
    const main = await getRect(page, 'main');
    expect(main.width).toBeCloseTo(0, 0);
  });

  test('hug: クラスで指定したコンテナの大きさを上書きし、本体に合わせる', async ({
    page,
  }) => {
    await gotoStory(page, 'sizing-hug');
    const main = await getRect(page, 'main');
    const container = await getContainerRect(page);
    expect(container.width).toBeCloseTo(100, 0);
    expect(container.height).toBeCloseTo(60, 0);
    expect(main.left).toBeCloseTo(container.left, 0);
    expect(main.top).toBeCloseTo(container.top, 0);
  });

  test('hug: インラインスタイルで指定したコンテナの大きさが優先される', async ({
    page,
  }) => {
    await gotoStory(page, 'sizing-hug-inline-size');
    const main = await getRect(page, 'main');
    const container = await getContainerRect(page);
    expect(container.width).toBeCloseTo(300, 0);
    expect(container.height).toBeCloseTo(200, 0);
    expect(main.width).toBeCloseTo(100, 0);
    expect(midX(main)).toBeCloseTo(midX(container), 0);
  });

  test('横はfill、縦はkeepを組み合わせられる', async ({ page }) => {
    await gotoStory(page, 'sizing-progress-bar');
    const main = await getRect(page, 'main');
    const container = await getContainerRect(page);
    expect(main.width).toBeCloseTo(container.width, 0);
    expect(main.height).toBeCloseTo(8, 0);
    expect(midY(main)).toBeCloseTo(midY(container), 0);
  });

  test('fill: 本体は装飾を除いた領域いっぱいになり、内側の装飾は本体に揃う', async ({
    page,
  }) => {
    await gotoStory(page, 'sizing-fill-with-items');
    const main = await getRect(page, 'main');
    const top = await getRect(page, 'top');
    const left = await getRect(page, 'left');
    const inside = await getRect(page, 'inside');
    const container = await getContainerRect(page);
    expect(main.left).toBeCloseTo(left.right + GAP, 0);
    expect(main.top).toBeCloseTo(top.bottom + GAP, 0);
    expect(main.right).toBeCloseTo(container.right, 0);
    expect(main.bottom).toBeCloseTo(container.bottom, 0);
    expect(inside.right).toBeCloseTo(main.right, 0);
    expect(inside.top).toBeCloseTo(main.top, 0);
  });

  test('fill: コンテナの高さが決まっていない場合、縦は行の高さになる', async ({
    page,
  }) => {
    await gotoStory(page, 'sizing-fill-auto-height');
    const main = await getRect(page, 'main');
    expect(main.height).toBeCloseTo(120, 0);
  });
});
