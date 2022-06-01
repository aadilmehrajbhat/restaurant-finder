import { FC } from 'react';
import styled from 'styled-components';
import RestaurantLogo from '~/assets/icons/restaurant.svg';

interface NoRestaurantResultsProps {
  text: string | null;
}

const NoRestaurantResults: FC<NoRestaurantResultsProps> = ({ text }) => (
  <S.Container>
    <RestaurantLogo width="100" />
    <S.Text>{text}</S.Text>
  </S.Container>
);

const S = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 400px;
  `,
  Text: styled.p`
    margin: 2rem 0 0;
    opacity: 0.5;
    font-size: 1.5rem;
    font-weight: 300;
  `,
};

export default NoRestaurantResults;
