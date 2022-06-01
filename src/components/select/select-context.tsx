import { FC, ReactNode, useContext } from 'react';
import { createContext } from 'react';

interface SelectContextProps {
  selected: { [key: string]: boolean };
  onClick: (value: { [name: string]: boolean }) => void;
}

interface SelectProviderProps extends SelectContextProps {
  children: ReactNode;
}

const SelectContext = createContext<SelectContextProps>({
  selected: {},
  onClick: () => null,
});

export const SelectProvider = ({
  selected,
  onClick,
  children,
}: SelectProviderProps) => (
  <SelectContext.Provider value={{ selected, onClick }}>
    {children}
  </SelectContext.Provider>
);

export const useSelectContext = () => {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error('useSelectContext must be used under SelectProvider');
  }

  return context;
};
