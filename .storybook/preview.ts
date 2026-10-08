import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [
    (story) => {
      // body と #storybook-root に高さを設定
      document.body.style.height = '100vh';
      document.body.style.margin = '0';
      document.body.style.padding = '32px';
      const root = document.getElementById('storybook-root');
      if (root) {
        root.style.height = '100%';
      }
      return story();
    },
  ],
};

export default preview;
