import { FC } from 'react';
import styled from 'styled-components';
import { InputHTMLAttributes } from 'react';

interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

const Radio: FC<RadioProps> = ({
  label,
  checked,
  onChange,
  className,
  ...props
}) => {
  return (
    <S.Container className={className}>
      <S.Label checked={checked}>
        <S.Radio
          type="radio"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          {...props}
        />
        {label}
      </S.Label>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    padding: 0.35rem 0;
  `,
  Label: styled.label<{ checked: boolean }>`
    --size: 18px;
    --border: 2px;
    --accent: #002b56;
    cursor: pointer;
    position: relative;
    padding-left: calc(var(--size) + 8px);
    color: ${({ checked, theme }) =>
      checked ? 'var(--accent)' : theme.colors.greyLight};
    line-height: 1.35;

    &:hover {
      color: var(--accent);
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: var(--size);
      height: var(--size);
      border: var(--border) solid #c8c8c8;
      display: inline-block;
      border-radius: 50%;
      cursor: pointer;
      transition: border-color 200ms;
    }

    &::after {
      content: '';
      position: absolute;
      left: var(--border);
      top: calc(50% + var(--border));
      transform: translateY(calc(-50% - var(--border)));
      width: calc(var(--size) - var(--border) * 2);
      height: calc(var(--size) - var(--border) * 2);
      border: 2px solid #fff;
      display: inline-block;
      border-radius: 50%;
      background: ${({ checked }) => (checked ? 'var(--accent)' : '#fff')};
      cursor: pointer;
      transition: border-color 200ms, background-color 200ms;
    }

    &:hover::before {
      border-color: var(--accent);
    }
  `,
  Radio: styled.input`
    display: none;
  `,
};

export default Radio;
