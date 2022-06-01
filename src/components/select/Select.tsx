import { useState, useEffect, useRef, ReactNode } from 'react';
import styled from 'styled-components';
import ChevronDownIcon from '~/assets/icons/chevron-down.svg';
import Option from './Option';
import { SelectProvider, useSelectContext } from './select-context';
import useClickAway from '~/hooks/useClickAway';

const SELECT_ALL = '';

const getSelectedObject = (
  selected: string | string[],
): {
  [name: string]: boolean;
} =>
  Array.isArray(selected)
    ? selected.reduce(
        (prev, curr) => ({
          ...prev,
          [curr]: true,
        }),
        {},
      )
    : { [selected]: true };

const getSelectedValues = (selected: {
  [name: string]: boolean;
}): string | string[] =>
  Object.entries(selected)
    .filter(([name, checked]) => checked)
    .map(([name]) => name);

export type SelectProps = {
  label: string;
  selected: string[] | string;
  onChange: (values: string | string[]) => void;
  children: ReactNode[];
  className?: string;
};

const Select = ({
  label,
  selected,
  onChange,
  className,
  children,
}: SelectProps) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);
  const isMultiple = Array.isArray(selected);

  useClickAway(selectRef, () => {
    setOpen(false);
  });

  return (
    <SelectProvider
      selected={getSelectedObject(selected)}
      onClick={(value) => {
        const [[name, checked]] = Object.entries(value);
        const selectedObject = getSelectedObject(selected);
        let result = {};
        if (isMultiple) {
          result = {
            ...selectedObject,
            [name]: checked,
          };

          const values = getSelectedValues(result);

          if (
            (name === SELECT_ALL && checked) ||
            (values.length > 1 && values.includes(SELECT_ALL))
          ) {
            result = { [name]: checked };
          }
        } else {
          result = { [name]: checked };
        }

        const selectedOptions = getSelectedValues(result);
        onChange(isMultiple ? selectedOptions : selectedOptions[0]);

        !isMultiple && setTimeout(() => setOpen(false), 700);
      }}
    >
      <S.Container ref={selectRef} className={className}>
        <S.Button onClick={() => setOpen((p) => !p)}>
          {label}
          <S.Icon $isOpen={isOpen} />
        </S.Button>
        {isOpen && <S.Content>{children}</S.Content>}
      </S.Container>
    </SelectProvider>
  );
};

const S = {
  Container: styled.div`
    position: relative;
    display: inline-block;
    margin: 0 0.75em;
  `,
  Button: styled.button`
    background: none;
    display: inline-block;
    position: relative;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 0.45em 3em 0.45em 0;
    font-size: 1rem;
    width: 100%;
    color: ${({ theme }) => theme.colors.greyLight};
    text-align: start;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.primary};
    }
  `,
  Icon: styled(ChevronDownIcon)<{ $isOpen: boolean }>`
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    vertical-align: middle;
    position: absolute;
    right: 0;
    transform: rotate(${({ $isOpen }) => ($isOpen ? '180deg' : '0deg')});
    transition: transform 200ms;
  `,
  Content: styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    max-height: 400px;
    background: white;
    z-index: 99;
    border: 1px solid rgba(0, 0, 0, 0.2);
    left: 0;
    right: 0;
    padding: 0.5rem 0;
    overflow: auto;
  `,
};

Select.Option = Option;

export default Select;
