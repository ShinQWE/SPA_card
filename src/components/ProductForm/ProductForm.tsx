import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { TextField, Button, Box, MenuItem } from '@mui/material';
import { NewProduct, Product } from '../../types/Product';
import { addProduct } from '../../store/slices/productsSlice';

interface ProductFormProps {
  onSuccess?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { control, handleSubmit, formState: { errors }, reset } = useForm<NewProduct>({
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      brand: '',
      category: '',
      thumbnail: '',
    }
  });

  const categories = [
    'смартфоны',
    'ноутбуки',
    'парфюмерия',
    'уход за кожей',
    'продукты',
    'одежда',
    'обувь',
    'аксессуары',
    'мебель',
    'электроника'
  ];

  const onSubmit = (data: NewProduct) => {
    const newProduct: Product = {
      ...data,
      id: Date.now(), // Уникальный ID больше 1000
      rating: 4.5,
      isLiked: false,
    };
    dispatch(addProduct(newProduct));
    
    // Очищаем форму
    reset();
    
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <Controller
        name="title"
        control={control}
        rules={{ required: 'Название обязательно' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Название товара"
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        )}
      />
      
      <Controller
        name="description"
        control={control}
        rules={{ required: 'Описание обязательно', minLength: { value: 10, message: 'Минимум 10 символов' } }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Описание"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        )}
      />
      
      <Controller
        name="price"
        control={control}
        rules={{ required: 'Цена обязательна', min: { value: 0, message: 'Цена должна быть положительной' } }}
        render={({ field }) => (
          <TextField
            {...field}
            type="number"
            label="Цена"
            fullWidth
            margin="normal"
            error={!!errors.price}
            helperText={errors.price?.message}
          />
        )}
      />
      
      <Controller
        name="brand"
        control={control}
        rules={{ required: 'Бренд обязателен' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Бренд"
            fullWidth
            margin="normal"
            error={!!errors.brand}
            helperText={errors.brand?.message}
          />
        )}
      />
      
      <Controller
        name="category"
        control={control}
        rules={{ required: 'Категория обязательна' }}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Категория"
            fullWidth
            margin="normal"
            error={!!errors.category}
            helperText={errors.category?.message}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      
      <Controller
        name="thumbnail"
        control={control}
        rules={{ 
          required: 'Ссылка на изображение обязательна',
          pattern: {
            value: /^https?:\/\/.+/,
            message: 'Введите корректную ссылку'
          }
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Ссылка на изображение"
            fullWidth
            margin="normal"
            error={!!errors.thumbnail}
            helperText={errors.thumbnail?.message || 'Пример: https://example.com/image.jpg'}
          />
        )}
      />
      
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, mb: 2 }}>
        Создать товар
      </Button>
    </Box>
  );
};

export default ProductForm;