import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import { Favorite, FavoriteBorder, Delete } from '@mui/icons-material';
import { toggleLike, deleteProduct } from '../../store/slices/productsSlice';
import { Product } from '../../types/Product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleLike(product.id));
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteProduct(product.id));
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const shortDescription = product.description.length > 100 
    ? `${product.description.substring(0, 100)}...` 
    : product.description;

  return (
    <Card 
      sx={{ 
        cursor: 'pointer', 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
        }
      }} 
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.thumbnail}
        alt={product.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '60px'
          }}
        >
          {shortDescription}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Typography variant="h6" color="primary">
            {product.price} руб.
          </Typography>
          <Box>
            <IconButton onClick={handleToggleLike} aria-label="нравится">
              {product.isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
            <IconButton onClick={handleDelete} aria-label="удалить">
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;