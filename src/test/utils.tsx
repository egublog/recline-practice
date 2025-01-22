import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { ChakraProvider } from '@chakra-ui/react';
import i18n from '../lib/i18n/config';
import { ThemeProvider } from '../contexts/ThemeContext';
import { TodoProvider } from '../contexts/TodoContext';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <TodoProvider>
            {children}
          </TodoProvider>
        </ThemeProvider>
      </I18nextProvider>
    </ChakraProvider>
  );
};

const customRender = (ui: ReactElement, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
