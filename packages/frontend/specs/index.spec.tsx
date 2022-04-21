import { FC, ReactNode } from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Index, { HomePageContext } from '../pages/index';

interface TestProviderProps {
  children: ReactNode;
}

const TestProvider: FC<TestProviderProps> = ({ children }) => {
  return (
    <HomePageContext.Provider
      value={{
        getBoard: async () => [],
        resizeBoard: async (size: number) => undefined,
        setCells: async (cells: number[][]) => undefined,
        setCell: async (row: number, col: number) => undefined,
        tick: async () => [],
      }}
    >
      {children}
    </HomePageContext.Provider>
  );
};

describe(Index.name, () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TestProvider>
        <Index />
      </TestProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', async () => {
    // given
    const { findByText } = render(
      <TestProvider>
        <Index />
      </TestProvider>
    );

    // when

    // then
    const element = await findByText('Best conway game');
    expect(element).not.toBeNull();
  });
});
