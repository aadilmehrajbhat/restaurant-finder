import { FC } from 'react';
import styled from 'styled-components';
import { InputHTMLAttributes } from 'react';

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  className?: string;
  label: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  onClick,
  className,
  ...props
}) => {
  return (
    <S.Container className={className} checked={checked} onClick={onClick}>
      <S.Label checked={checked}>
        <S.Checkbox
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          {...props}
          onClick={(e) => e.stopPropagation()}
        />
        {label}
      </S.Label>
    </S.Container>
  );
};

const S = {
  Container: styled.div<{ checked: boolean }>`
    --size: 18px;
    --border: 2px;
    --accent: #002b56;
    display: inline-block;
    color: ${({ checked, theme }) =>
      checked ? 'var(--accent)' : theme.colors.greyLight};

    &:hover,
    &:hover > label,
    &:hover > label::before {
      color: var(--accent);
    }

    & > label::before {
      color: ${({ checked }) => (checked ? 'var(--accent)' : '#C8C8C8')};
    }
  `,
  Label: styled.label<{ checked: boolean }>`
    cursor: pointer;
    display: inline-block;
    width: 100%;
    height: 100%;
    position: relative;
    padding-left: calc(var(--size) + 8px);
    color: inherit;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      color: inherit;
      transform: translateY(-50%);
      width: var(--size);
      height: var(--size);
      border: var(--border) solid currentColor;
      display: inline-block;
      border-radius: 50%;
      cursor: pointer;
      transition: border-color 200ms;
    }

    &::after {
      content: '';
      background-image: url("data:image/svg+xml,%3Csvg width='10' height='7' viewBox='0 0 11 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.21427 6.07388L9.53723 0.553772L10.4627 1.44623L4.21427 7.92613L0.537231 4.1129L1.46275 3.22044L4.21427 6.07388Z' fill='white'/%3E%3C/svg%3E%0A");
      position: absolute;
      background-color: ${({ checked }) =>
        checked ? 'var(--accent)' : '#fff'};
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      position: absolute;
      left: var(--border);
      top: calc(50% + var(--border));
      transform: translateY(calc(-50% - var(--border)));
      width: calc(var(--size) - var(--border) * 2);
      height: calc(var(--size) - var(--border) * 2);
      display: inline-block;
      border-radius: 50%;
      z-index: -2;
      cursor: pointer;
      transition: border-color 200ms, background-color 200ms;
    }

    &:hover::before {
      border-color: currentColor;
    }
  `,
  Checkbox: styled.input`
    display: none;
  `,
};

export default Checkbox;
