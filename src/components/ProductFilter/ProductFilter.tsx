import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToggleButton, ToggleButtonGroup, Box, Typography } from '@mui/material';
import { ViewList, Favorite } from '@mui/icons-material';
import { setFilter } from '../../store/slices/productsSlice';
import { RootState } from '../../store/store';

const ProductFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { products, filter } = useSelector((state: RootState) => state.products);

  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: 'all' | 'favorites',
  ) => {
    if (newFilter !== null) {
      dispatch(setFilter(newFilter));
    }
  };

  const favoriteCount = products.filter(p => p.isLiked).length;

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={handleFilterChange}
        aria-label="фильтр товаров"
      >
        <ToggleButton value="all" aria-label="все товары">
          <ViewList sx={{ mr: 1 }} />
          Все
        </ToggleButton>
        <ToggleButton value="favorites" aria-label="избранные товары">
          <Favorite sx={{ mr: 1 }} />
          Избранное
          {favoriteCount > 0 && (
            <Typography variant="caption" sx={{ ml: 1 }}>
              ({favoriteCount})
            </Typography>
          )}
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default ProductFilter;