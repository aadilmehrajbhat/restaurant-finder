import { FC } from 'react';
import styled from 'styled-components';

interface PageCaptionProps {
  children: string;
}

const PageCaption: FC<PageCaptionProps> = ({ children }) => (
  <S.Caption>{children}</S.Caption>
);

const S = {
  Caption: styled.h5`
    font-size: 1.5rem;
    margin: 0.5rem 0;
    font-weight: 300;
    line-height: 1.5;
    opacity: 0.6;
    max-width: ${({ theme }) => theme.screens.md};
  `,
};

export default PageCaption;
