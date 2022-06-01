import { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface PageHeadingProps {
  children: ReactNode;
}

const PageHeading: FC<PageHeadingProps> = ({ children }) => (
  <S.Heading>{children}</S.Heading>
);

const S = {
  Heading: styled.h1`
    font-size: 3.5rem;
    margin: 2rem 0 1rem;
    font-weight: 300;
  `,
};

export default PageHeading;
