import { FC, ReactNode, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
  variant?: 'solid' | 'outlined';
  size?: 'small' | 'normal';
}

const Button: FC<ButtonProps> = ({
  block = false,
  variant = 'solid',
  size = 'normal',
  ...props
}) => <S.Button block={block} variant={variant} size={size} {...props} />;

const S = {
  Button: styled.button<ButtonProps>`
    background: none;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    display: ${({ block }) => (block ? 'block' : 'inline-block')};
    width: ${({ block }) => (block ? '100%' : '')};
    text-align: center;
    background: ${({ theme, variant }) =>
      variant === 'solid' ? theme.colors.primary : theme.colors.primaryText};
    color: ${({ theme, variant }) =>
      variant === 'solid' ? theme.colors.primaryText : theme.colors.primary};
    padding: ${({ size }) =>
      size === 'small' ? '1em 1.25em' : '1.35em 1.75em'};
    font-size: ${({ size }) => (size === 'small' ? '0.75rem' : '0.9rem')};
    font-weight: 600;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 1px;
    cursor: pointer;
    transition: opacity 200ms;

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    &:hover {
      opacity: 0.8;
    }
  `,
};

export default Button;
