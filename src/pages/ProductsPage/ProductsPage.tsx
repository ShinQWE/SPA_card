import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box, TextField, Pagination, Typography  } from '@mui/material';
import { setProducts } from '../../store/slices/productsSlice';
import { RootState } from '../../store/store';
import ProductList from '../../components/ProductList/ProductList';
import ProductFilter from '../../components/ProductFilter/ProductFilter';

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { products, filter, loadedFromApi } = useSelector((state: RootState) => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6; // Уменьшим до 6 товаров на странице

  useEffect(() => {
    if (!loadedFromApi) {
      const fetchProducts = async () => {
        try {
          const response = await fetch('https://dummyjson.com/products?limit=20');
          const data = await response.json();
          
          const russianProducts = data.products.map((product: any) => ({
            ...product,
            title: product.title,
            description: product.description,
            price: Math.round(product.price * 80),
            brand: product.brand,
            category: product.category,
            thumbnail: product.thumbnail,
            rating: product.rating,
            isLiked: false
          }));
          
          dispatch(setProducts(russianProducts));
        } catch (err) {
          console.error('Ошибка загрузки товаров');
        }
      };

      fetchProducts();
    }
  }, [dispatch, loadedFromApi]);

  // Фильтрация товаров по поиску и избранному
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'favorites') {
      return matchesSearch && product.isLiked;
    }
    
    return matchesSearch;
  });

  // Пагинация
  const displayedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  // Сбрасываем страницу при изменении фильтра или поиска
  React.useEffect(() => {
    setPage(1);
  }, [filter, searchTerm]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <ProductFilter />
        <TextField
          label="Поиск товаров"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      
      <ProductList products={displayedProducts} />
      
      {pageCount > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}

      {filteredProducts.length > 0 && (
        <Box textAlign="center" mt={2}>
          <Typography variant="body2" color="text.secondary">
            Показано {displayedProducts.length} из {filteredProducts.length} товаров
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default ProductsPage;