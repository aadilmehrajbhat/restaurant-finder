import { FC } from 'react';
import styled from 'styled-components';
import { useTheme } from '~/theme';

const SIZES = {
  small: '22px',
  normal: '28px',
  large: '32px',
};

type Size = keyof typeof SIZES;

interface StarRatingProps {
  className?: string;
  rating: number;
  total: number;
  size?: Size;
}

const StarRating: FC<StarRatingProps> = ({
  className,
  rating,
  total,
  size = 'normal',
}) => {
  const theme = useTheme();

  return (
    <>
      <svg
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <defs>
          <mask id="half">
            <rect x="0" y="0" width="20" height="20" fill="white" />
            <rect x="50%" y="0" width="20" height="20" fill="black" />
          </mask>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            id="rating-star-symbol"
          >
            <path d="M9.9983 1.56627L12.2915 7.71474L12.4128 8.04001H12.76H18.264L13.5593 11.5805L13.2582 11.8071L13.3931 12.159L15.6321 17.9991L10.3 14L9.99954 13.7747L9.69942 14.0004L4.38347 17.9993L6.60727 12.1579L6.74103 11.8066L6.44064 11.5805L1.73594 8.04001H7.21999H7.56627L7.68805 7.71585L9.9983 1.56627Z" />
          </symbol>
        </defs>
      </svg>

      <S.Ratings
        className={className}
        aria-label={`Rating is ${rating} out of ${total}`}
      >
        {Array(total)
          .fill(0)
          .map((_, i) => i + 1)
          .map((rating) => (
            <S.Star
              key={rating}
              viewBox="0 0 20 20"
              size={size}
              active={rating >= rating}
            >
              <use
                xlinkHref="#rating-star-symbol"
                mask={
                  rating > rating && rating < rating + 0.5 ? 'url(#half)' : ''
                }
              ></use>
              <use
                xlinkHref="#rating-star-symbol"
                fill="none"
                stroke={theme.colors.primary}
              ></use>
            </S.Star>
          ))}
      </S.Ratings>
    </>
  );
};

const S = {
  Ratings: styled.p`
    display: flex;
  `,
  Star: styled.svg<{ active?: boolean; size: Size }>`
    --size: ${({ size }) => SIZES[size]};
    width: var(--size);
    height: var(--size);
    fill: ${({ active = false, theme }) =>
      active ? theme.colors.primary : '#fff'};
  `,
};

export default StarRating;
