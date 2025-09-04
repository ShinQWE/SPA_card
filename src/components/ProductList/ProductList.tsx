import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Box, Typography } from '@mui/material';
import { RootState } from '../../store/store';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';

interface ProductListProps {
  products?: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { filter } = useSelector((state: RootState) => state.products);
  
  const productsToDisplay = products || useSelector((state: RootState) => {
    const allProducts = state.products.products;
    return filter === 'favorites' 
      ? allProducts.filter(product => product.isLiked) 
      : allProducts;
  });

  if (productsToDisplay.length === 0) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="200px"
      >
        <Typography variant="h6" color="text.secondary" textAlign="center">
          {filter === 'favorites' 
            ? 'Нет избранных товаров\nДобавьте товары в избранное, нажав на сердечко' 
            : 'Товары не найдены\nПопробуйте изменить поисковый запрос'}
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {productsToDisplay.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;