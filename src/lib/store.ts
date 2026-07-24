import {
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import cartReducer from "@/features/cart/cart-slice";

function createNoopStorage() {
  return {
    getItem() {
      return Promise.resolve(null);
    },

    setItem(
      _key: string,
      value: string,
    ) {
      return Promise.resolve(value);
    },

    removeItem() {
      return Promise.resolve();
    },
  };
}

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const rootReducer = combineReducers({
  cart: cartReducer,
});

const persistConfig = {
  key: "tjermin-marketplace",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor =
  persistStore(store);

export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;