import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InventoryApiData, Product } from "../../interfaces";
import { STATUS } from "../../constants";

export interface InventorySliceState {
  products: Product[];
  totalProducts: number;
  totalStoreValue: number;
  outOfStockProducts: number;
  noOfCategory: number;
  status: STATUS.IDLE | STATUS.LOADING | STATUS.SUCCESS | STATUS.FAILED;
  error: string | null;
  isUserView: boolean;
}

const initialState: InventorySliceState = {
  products: [],
  totalProducts: 0,
  totalStoreValue: 0,
  outOfStockProducts: 0,
  noOfCategory: 0,
  status: STATUS.IDLE,
  error: null,
  isUserView: false,
};

export const fetchInventory = createAsyncThunk(
  "inventory/fetchInventory",
  async () => {
    const response = await fetch(
      "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
    );
    const data = await response.json();
    return data;
  }
);

const calculateTotalStoreValue = (products: Product[]): number => {
  return products.reduce((sum, product) => {
    return sum + (product.disabled ? 0 : product.price * product.quantity);
  }, 0);
};

const calculateCategoryCount = (products: Product[]): number => {
  const categoryCounts = products.reduce((acc, product) => {
    if (!product.disabled) {
      acc[product.category] = (acc[product.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  return Object.keys(categoryCounts).length;
};

const calculateTotalProducts = (products: Product[]): number => {
  return products.filter((product) => !product.disabled).length;
};

const calculateOutOfStockProducts = (products: Product[]): number => {
  return products.filter(
    (product) => product.disabled || product.quantity === 0
  ).length;
};

const updateInventorySummary = (state: InventorySliceState): void => {
  state.totalProducts = calculateTotalProducts(state.products);
  state.totalStoreValue = calculateTotalStoreValue(state.products);
  state.outOfStockProducts = calculateOutOfStockProducts(state.products);
  state.noOfCategory = calculateCategoryCount(state.products);
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    toggleView(state) {
      state.isUserView = !state.isUserView;
    },
    deleteProduct(state, action: { payload: string }) {
      const productIndex = state.products.findIndex(
        (p) => p.name === action.payload
      );
      if (productIndex !== -1) {
        const product = state.products[productIndex];
        state.products.splice(productIndex, 1);
        state.totalProducts--;
        state.totalStoreValue -= product.price * product.quantity;
        if (product.quantity === 0) {
          state.outOfStockProducts--;
        }
        state.noOfCategory = calculateCategoryCount(state.products);
      }
    },
    disableProduct(state, action: { payload: string }) {
      const product = state.products.find(
        (product: Product) => product.id === action.payload
      );
      if (product) {
        product.disabled = !product.disabled;
        updateInventorySummary(state);
      }
    },
    editProduct(
      state,
      action: { payload: { id: string; quantity: number; price: number } }
    ) {
      const { id, quantity, price } = action.payload;
      const productIndex = state.products.findIndex(
        (product: Product) => product.id === id
      );
      if (productIndex !== -1) {
        const product = state.products[productIndex];
        const prevValue = product.price * product.quantity;
        product.quantity = quantity;
        product.price = price;
        const newValue = product.price * product.quantity;
        product.value = newValue;
        state.totalStoreValue = state.totalStoreValue - prevValue + newValue;
        if (quantity === 0 && !product.disabled) {
          state.outOfStockProducts++;
        } else if (quantity > 0 && product.disabled) {
          state.outOfStockProducts--;
        }
        updateInventorySummary(state);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null;
      })
      .addCase(
        fetchInventory.fulfilled,
        (state, action: { payload: InventoryApiData[] }) => {
          state.status = STATUS.SUCCESS;
          state.products = action.payload.map((product) => ({
            ...product,
            price: parseInt(product.price?.replace("$", "")),
            value: parseInt(product.value?.replace("$", "")),
            id: product.name,
            disabled: false,
          }));
          updateInventorySummary(state);
        }
      )
      .addCase(fetchInventory.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message || "Failed to fetch inventory data";
      });
  },
});

export const { toggleView, deleteProduct, disableProduct, editProduct } =
  inventorySlice.actions;

export default inventorySlice.reducer;
