import { useCallback, useReducer } from 'react';
import {
  DEFAULT_CATEGORY,
  DEFAULT_IS_OPEN_NOW,
  DEFAULT_PRICE,
} from '~/components/restaurant-filters';
import { Restaurant } from '~/types/restaurant';

const LOAD_RESTAURANTS = 'LOAD_RESTAURANTS';
const LOAD_RESTAURANTS_SUCCESS = 'LOAD_RESTAURANTS_SUCCESS';
const LOAD_RESTAURANTS_FAILURE = 'LOAD_RESTAURANTS_FAILURE';
const LOAD_MORE_RESTAURANTS = 'LOAD_MORE_RESTAURANTS';
const RESET_RESTAURANTS = 'RESET_RESTAURANTS';
const CHANGE_FILTERS = 'CHANGE_FILTERS';

type InitialState = {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  page: number;
  filters: {
    categories: string[];
    prices: string[];
    isOpenNow: boolean;
  };
};

type LoadRestaurantsAction = {
  type: typeof LOAD_RESTAURANTS;
};

type LoadRestaurantsSuccessAction = {
  type: typeof LOAD_RESTAURANTS_SUCCESS;
  payload: {
    restaurants: Restaurant[];
    totalCount: number;
  };
};

type LoadRestaurantsFailureAction = {
  type: typeof LOAD_RESTAURANTS_FAILURE;
  payload: {
    error: string;
  };
};

type LoadMoreRestaurantsAction = {
  type: typeof LOAD_MORE_RESTAURANTS;
};

type ResetRestaurantsAction = {
  type: typeof RESET_RESTAURANTS;
};

type ChangeFiltersAction = {
  type: typeof CHANGE_FILTERS;
  payload: {
    categories: string[];
    prices: string[];
    isOpenNow: boolean;
  };
};

const initialState: InitialState = {
  restaurants: [],
  loading: false,
  error: null,
  totalCount: 0,
  page: 0,
  filters: {
    categories: DEFAULT_CATEGORY,
    prices: DEFAULT_PRICE,
    isOpenNow: DEFAULT_IS_OPEN_NOW,
  },
};

const actions = {
  loadRestaurants: (): LoadRestaurantsAction => ({
    type: LOAD_RESTAURANTS,
  }),
  loadRestaurantsSuccess: (
    restaurants: Restaurant[],
    totalCount: number,
  ): LoadRestaurantsSuccessAction => ({
    type: LOAD_RESTAURANTS_SUCCESS,
    payload: { restaurants, totalCount },
  }),
  loadRestaurantsFailure: (error: string): LoadRestaurantsFailureAction => ({
    type: LOAD_RESTAURANTS_FAILURE,
    payload: { error },
  }),
  loadMoreRestaurants: (): LoadMoreRestaurantsAction => ({
    type: LOAD_MORE_RESTAURANTS,
  }),
  resetRestaurants: (): ResetRestaurantsAction => ({
    type: RESET_RESTAURANTS,
  }),
  changeFilters: ({
    categories,
    prices,
    isOpenNow,
  }: {
    categories: string[];
    prices: string[];
    isOpenNow: boolean;
  }): ChangeFiltersAction => ({
    type: CHANGE_FILTERS,
    payload: { categories, prices, isOpenNow },
  }),
};

type ActionTypes =
  | LoadRestaurantsAction
  | LoadRestaurantsSuccessAction
  | LoadRestaurantsFailureAction
  | LoadMoreRestaurantsAction
  | ChangeFiltersAction
  | ResetRestaurantsAction;

function restaurantListReducer(
  state: InitialState,
  action: ActionTypes,
): InitialState {
  switch (action.type) {
    case LOAD_RESTAURANTS: {
      return { ...state, loading: true, error: null };
    }

    case LOAD_RESTAURANTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        restaurants: [...state.restaurants, ...action.payload.restaurants],
        totalCount: action.payload.totalCount,
      };
    }

    case LOAD_RESTAURANTS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }

    case LOAD_MORE_RESTAURANTS: {
      return {
        ...state,
        page: state.page + 1,
      };
    }

    case CHANGE_FILTERS: {
      const { categories } = action.payload;
      return {
        ...initialState,
        filters: {
          ...state.filters,
          categories,
        },
      };
    }
    case RESET_RESTAURANTS: {
      return {
        ...initialState,
      };
    }
    default:
      throw new Error();
  }
}

const useRestaurantListReducer = () => {
  const [state, dispatch] = useReducer(restaurantListReducer, initialState);

  const loadRestaurants = useCallback(
    () => dispatch(actions.loadRestaurants()),
    [dispatch],
  );

  const loadRestaurantsSuccess = useCallback(
    (restaurants: Restaurant[], totalCount: number) =>
      dispatch(actions.loadRestaurantsSuccess(restaurants, totalCount)),
    [dispatch],
  );

  const loadRestaurantsFailure = useCallback(
    (error: string) => dispatch(actions.loadRestaurantsFailure(error)),
    [dispatch],
  );

  const loadMoreRestaurants = useCallback(
    () => dispatch(actions.loadMoreRestaurants()),
    [dispatch],
  );

  const changeFilters = useCallback(
    ({
      categories,
      prices,
      isOpenNow,
    }: {
      categories: string[];
      prices: string[];
      isOpenNow: boolean;
    }) => dispatch(actions.changeFilters({ categories, prices, isOpenNow })),
    [dispatch],
  );

  const reset = useCallback(
    () => dispatch(actions.resetRestaurants()),
    [dispatch],
  );

  return {
    ...state,
    loadRestaurants,
    loadRestaurantsSuccess,
    loadRestaurantsFailure,
    loadMoreRestaurants,
    changeFilters,
    reset,
  };
};

export default useRestaurantListReducer;
