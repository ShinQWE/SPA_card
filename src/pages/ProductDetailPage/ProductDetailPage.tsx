import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Button, Box, Typography, Grid, Rating } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { RootState } from '../../store/store';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = useSelector((state: RootState) =>
    state.products.products.find(p => p.id === Number(id))
  );

  if (!product) {
    return (
      <Container>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/products')} sx={{ mb: 2 }}>
          Назад к товарам
        </Button>
        <Typography variant="h4">Товар не найден</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/products')} sx={{ mb: 2 }}>
        Назад к товарам
      </Button>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>{product.title}</Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            {product.price} руб.
          </Typography>
          
          <Box display="flex" alignItems="center" mb={2}>
            <Rating value={product.rating} readOnly precision={0.1} />
            <Typography variant="body2" sx={{ ml: 1 }}>{product.rating}</Typography>
          </Box>
          
          <Typography variant="body1" paragraph>{product.description}</Typography>
          
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              Бренд: {product.brand}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Категория: {product.category}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;