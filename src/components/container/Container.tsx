import { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => (
  <S.Container>{children}</S.Container>
);

const S = {
  Container: styled.main`
    max-width: ${({ theme }) => theme.screens['2xl']};
    margin: 0 auto;
    padding: 0 2rem;
  `,
};

export default Container;
