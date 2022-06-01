import { FC, useMemo } from 'react';
import { Radio } from '~/components/input';
import styled from 'styled-components';
import Select from '~/components/select';
import useCategoryList from '~/hooks/useCategoryList';
import { PriceFilter } from './constants';
import Button from '../button';

interface RestaurantFiltersProps {
  isOpenNow: boolean;
  onOpenNowClick: () => void;
  selectedPrice: PriceFilter[];
  onPriceChange: (price: string | string[]) => void;
  category: string[];
  onCategoryChange: (price: string | string[]) => void;
  onClearClick: () => void;
}

const RestaurantFilters: FC<RestaurantFiltersProps> = ({
  isOpenNow,
  onOpenNowClick,
  selectedPrice,
  onPriceChange,
  category,
  onCategoryChange,
  onClearClick,
}) => {
  const { categories, loading, error } = useCategoryList();
  const hasFilters = useMemo(
    () => isOpenNow || selectedPrice.join(',') || category.join(','),
    [isOpenNow, selectedPrice, category],
  );

  if (loading) {
    return null;
  }

  return (
    <S.Container>
      <S.Filters>
        <S.Text>Filter by:</S.Text>
        <S.OpenNowFilter
          label="Open now"
          checked={isOpenNow}
          onClick={onOpenNowClick}
        />
        <S.Price
          label="Price"
          selected={selectedPrice}
          onChange={onPriceChange}
        >
          <Select.Option value="" label="All"></Select.Option>
          <Select.Option value="1" label="$"></Select.Option>
          <Select.Option value="2" label="$$"></Select.Option>
          <Select.Option value="3" label="$$$"></Select.Option>
          <Select.Option value="4" label="$$$$"></Select.Option>
        </S.Price>

        {!error && (
          <S.Category
            label="Categories"
            selected={category}
            onChange={onCategoryChange}
          >
            <Select.Option value="" label="All"></Select.Option>
            {categories.map((category) => (
              <Select.Option
                key={category.alias}
                value={category.alias}
                label={category.title}
              ></Select.Option>
            ))}
          </S.Category>
        )}
      </S.Filters>

      {hasFilters && (
        <Button onClick={onClearClick} variant="outlined" size="small">
          Clear All
        </Button>
      )}
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
    border-top: 1px solid;
    border-bottom: 1px solid;
    margin: 2rem 0;
    padding: 1.75rem 0;
    border-color: rgba(0, 0, 0, 0.09);
  `,
  Filters: styled.div`
    height: 2.75rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  Text: styled.p`
    margin: 0;
    font-size: 1.1rem;
    font-weight: 300;
    opacity: 0.7;
    margin-right: 1.5rem;
    text-transform: capitalize;
  `,
  OpenNowFilter: styled(Radio)`
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-right: 1rem;
  `,
  Price: styled(Select)`
    width: 120px;
  `,
  Category: styled(Select)`
    width: 200px;
  `,
};

export default RestaurantFilters;
