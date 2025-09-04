import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';

// Функция для загрузки состояния из localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('productsState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Функция для сохранения состояния в localStorage
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('productsState', serializedState);
  } catch {
    // Игнорируем ошибки записи
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
  preloadedState
});

// Сохраняем состояние в localStorage при каждом изменении
store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;