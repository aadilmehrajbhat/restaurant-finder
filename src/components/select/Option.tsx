import { ReactNode, Children, cloneElement, ReactElement } from 'react';
import styled from 'styled-components';
import { Checkbox } from '~/components/input';
import { useSelectContext } from './select-context';

interface OptionProps {
  value: string;
  label: string;
}

const Option = ({ value, label }: OptionProps) => {
  const { selected, onClick } = useSelectContext();
  const isSelected = !!selected[value];

  return (
    <S.Option role="button" onClick={(e) => onClick({ [value]: !isSelected })}>
      <S.Checkbox checked={isSelected} label={label} />
    </S.Option>
  );
};

const S = {
  Option: styled.span`
    cursor: pointer;

    &:hover {
      background: rgba(0, 0, 0, 0.08);
    }
  `,
  Checkbox: styled(Checkbox)`
    display: block;
    padding: 0.5rem 1rem;
  `,
};

export default Option;
