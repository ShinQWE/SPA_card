import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import ProductForm from '../../components/ProductForm/ProductForm';

const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/products');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/products')} sx={{ mb: 2 }}>
        Назад к товарам
      </Button>
      
      <Typography variant="h4" gutterBottom>Добавить новый товар</Typography>
      
      <ProductForm onSuccess={handleSuccess} />
    </Container>
  );
};

export default CreateProductPage;