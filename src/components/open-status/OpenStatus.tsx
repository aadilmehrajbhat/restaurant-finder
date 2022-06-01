import { FC } from 'react';
import styled from 'styled-components';

interface OpenStatusProps {
  isOpen: boolean;
  size?: 'normal' | 'large';
}

const OpenStatus: FC<OpenStatusProps> = ({ isOpen, size = 'normal' }) => (
  <S.Status isOpen={isOpen} size={size}>
    {isOpen ? 'Open' : 'Closed'}
  </S.Status>
);

const S = {
  Status: styled.span<OpenStatusProps>`
    display: inline-flex;
    align-items: center;

    &::before {
      content: '';
      --size: ${({ size }) => (size === 'large' ? '10px' : '8px')};
      background: ${({ isOpen }) => (isOpen ? '#00e8a4' : '#FF3548')};
      display: inline-block;
      width: var(--size);
      height: var(--size);
      border-radius: 50%;
      margin: 0 0.5em;
    }
  `,
};

export default OpenStatus;
