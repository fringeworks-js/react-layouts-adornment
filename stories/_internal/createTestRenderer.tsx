import type { CSSProperties } from 'react';
import createTestModel from '../_shared/createTestModel';
import type { LayoutName, TestStoryArgs } from '../_shared/types';
import LAYOUTS from './layouts';

export default function createTestRenderer(name: LayoutName) {
  const { Container, Item } = LAYOUTS[name];
  return (args: TestStoryArgs) => {
    const {
      options,
      wrapperStyle,
      containerClassName,
      containerStyle,
      mains,
      items,
      surroundings,
    } = createTestModel(args);
    const [before, after] = surroundings;
    return (
      <div style={wrapperStyle as CSSProperties}>
        {before && (
          <div
            data-testid={before.testId}
            style={before.style as CSSProperties}
          />
        )}
        <Container
          {...options}
          className={containerClassName || undefined}
          style={containerStyle as CSSProperties}
        >
          {/* 装飾 */}
          {items.map((item) => (
            <Item
              key={item.testId}
              data-testid={item.testId}
              {...item.options}
              style={item.style as CSSProperties}
            >
              {item.text}
            </Item>
          ))}
          {/* 本体 */}
          {mains.map((main) => (
            <div
              key={main.testId}
              data-testid={main.testId}
              className={main.className || undefined}
              style={main.style as CSSProperties}
            />
          ))}
        </Container>
        {after && (
          <div
            data-testid={after.testId}
            style={after.style as CSSProperties}
          />
        )}
      </div>
    );
  };
}
