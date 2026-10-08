import { expect, test, type Page } from '@playwright/test';

const STORY_URL = (storyId: string) =>
  `/iframe.html?id=spec-sticker--${storyId}&viewMode=story`;

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
  page.locator('.frg-layout-sticker').evaluate(toRect);

const midX = (rect: Rect) => (rect.left + rect.right) / 2;
const midY = (rect: Rect) => (rect.top + rect.bottom) / 2;

const expectSameRect = (actual: Rect, expected: Rect) => {
  expect(actual.left).toBeCloseTo(expected.left, 0);
  expect(actual.top).toBeCloseTo(expected.top, 0);
  expect(actual.width).toBeCloseTo(expected.width, 0);
  expect(actual.height).toBeCloseTo(expected.height, 0);
};

// ===== 本体・コンテナ =====

test.describe('sticker - 本体・コンテナ', () => {
  test('本体の大きさは変わらず、コンテナは親の幅に広がる', async ({ page }) => {
    await gotoStory(page, 'main-only');
    const main = await getRect(page, 'main');
    const container = await getContainerRect(page);
    expect(main.width).toBeCloseTo(100, 0);
    expect(main.height).toBeCloseTo(60, 0);
    expect(container.width).toBeGreaterThan(main.width);
    expect(container.height).toBeCloseTo(60, 0);
  });

  test('hug: コンテナの大きさが本体に合う', async ({ page }) => {
    await gotoStory(page, 'hug');
    const main = await getRect(page, 'main');
    const container = await getContainerRect(page);
    expectSameRect(container, main);
  });
});

// ===== 上下 =====

test.describe('sticker - 上下', () => {
  test('top: 本体の上にgapの間隔で配置される', async ({ page }) => {
    await gotoStory(page, 'top-center');
    const main = await getRect(page, 'main');
    const item = await getRect(page, 'item');
    expect(item.bottom).toBeCloseTo(main.top - GAP, 0);
    expect(midX(item)).toBeCloseTo(midX(main), 0);
  });

  test('top / left・right: 本体の端に揃う', async ({ page }) => {
    await gotoStory(page, 'top-left');
    const mainL = await getRect(page, 'main');
    const itemL = await getRect(page, 'item');
    expect(itemL.left).toBeCloseTo(mainL.left, 0);

    await gotoStory(page, 'top-right');
    const mainR = await getRect(page, 'main');
    const itemR = await getRect(page, 'item');
    expect(itemR.right).toBeCloseTo(mainR.right, 0);
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

test.describe('sticker - 左右', () => {
  test('left: 本体の左にgapの間隔で配置される', async ({ page }) => {
    await gotoStory(page, 'left-middle');
    const main = await getRect(page, 'main');
    const item = await getRect(page, 'item');
    expect(item.right).toBeCloseTo(main.left - GAP, 0);
    expect(midY(item)).toBeCloseTo(midY(main), 0);
  });

  test('left / top・bottom: 本体の端に揃う', async ({ page }) => {
    await gotoStory(page, 'left-top');
    const mainT = await getRect(page, 'main');
    const itemT = await getRect(page, 'item');
    expect(itemT.top).toBeCloseTo(mainT.top, 0);

    await gotoStory(page, 'left-bottom');
    const mainB = await getRect(page, 'main');
    const itemB = await getRect(page, 'item');
    expect(itemB.bottom).toBeCloseTo(mainB.bottom, 0);
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

test.describe('sticker - 内側', () => {
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

  test('負のinsetで本体の端からはみ出す', async ({ page }) => {
    await gotoStory(page, 'negative-inset');
    const main = await getRect(page, 'main');
    const item = await getRect(page, 'item');
    expect(item.right).toBeCloseTo(main.right + 8, 0);
    expect(item.top).toBeCloseTo(main.top - 8, 0);
  });
});

// ===== 間隔 =====

test.describe('sticker - 間隔', () => {
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

// ===== レイアウトへの影響 =====

test.describe('sticker - レイアウトへの影響', () => {
  test('装飾があってもコンテナの大きさは本体と同じで、前後の要素も詰めて配置される', async ({
    page,
  }) => {
    await gotoStory(page, 'no-layout-space');
    const main = await getRect(page, 'main');
    const container = await getContainerRect(page);
    const before = await getRect(page, 'before');
    const after = await getRect(page, 'after');
    expectSameRect(container, main);
    expect(before.bottom).toBeCloseTo(container.top, 0);
    expect(after.top).toBeCloseTo(container.bottom, 0);
  });

  test('本体より大きい装飾も本体の中央に揃う', async ({ page }) => {
    await gotoStory(page, 'larger-than-main');
    const main = await getRect(page, 'main');
    const top = await getRect(page, 'top');
    const left = await getRect(page, 'left');
    expect(top.width).toBeCloseTo(200, 0);
    expect(midX(top)).toBeCloseTo(midX(main), 0);
    expect(left.height).toBeCloseTo(120, 0);
    expect(midY(left)).toBeCloseTo(midY(main), 0);
  });

  test('外側の装飾はコンテナの幅で折り返さない', async ({ page }) => {
    await gotoStory(page, 'no-wrap');
    const main = await getRect(page, 'main');
    const item = await getRect(page, 'item');
    expect(item.width).toBeGreaterThan(main.width);
    expect(item.height).toBeCloseTo(20, 0);
    expect(midX(item)).toBeCloseTo(midX(main), 0);
  });

  test('利用者が装飾にtransformを指定しても中央に揃う', async ({ page }) => {
    await gotoStory(page, 'with-item-transform');
    const main = await getRect(page, 'main');
    const top = await getRect(page, 'top');
    const left = await getRect(page, 'left');
    expect(midX(top)).toBeCloseTo(midX(main), 0);
    expect(midY(left)).toBeCloseTo(midY(main), 0);
  });
});

// ===== 大きさの決め方 =====

test.describe('sticker - 大きさの決め方', () => {
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

  test('fill: 装飾はコンテナを基準に配置される', async ({ page }) => {
    await gotoStory(page, 'sizing-fill-with-items');
    const main = await getRect(page, 'main');
    const top = await getRect(page, 'top');
    const inside = await getRect(page, 'inside');
    const container = await getContainerRect(page);
    expectSameRect(main, container);
    expect(top.bottom).toBeCloseTo(container.top - GAP, 0);
    expect(inside.right).toBeCloseTo(container.right, 0);
    expect(inside.top).toBeCloseTo(container.top, 0);
  });
});
