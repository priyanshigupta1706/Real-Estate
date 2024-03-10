// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import useReducer from './user/userSlice';



// const rootReducer = combineReducers({user:useReducer})

// const persistConfig = {
//     key: 'root',
//     storage,
//     version:1,
// }

// // const persistData = JSON.stringify(persistConfig)

// const persistedReducer =persistReducer( persistConfig,rootReducer)


// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware:(getDefaultMiddleware) =>
//    getDefaultMiddleware({
//     serializableCheck: false,
//   }),
// });

// export const persistor = persistStore(store);


import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import useReducer from './user/userSlice';

const rootReducer = combineReducers({
  user: useReducer
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  // Transform state to string before persisting
  serialize: state => JSON.stringify(state),
  // Parse state when loading from storage
  deserialize: state => JSON.parse(state)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);

