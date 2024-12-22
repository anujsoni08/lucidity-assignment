import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

import Header from "./components/Header";
import InventoryStats from "./components/InventoryStats";
import InventoryTable from "./components/InventoryTable";

import { fetchInventory } from "./store/slices/inventorySlice";

import "./App.css";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, isUserView } = useSelector(
    (state: RootState) => state.inventory
  );

  useEffect(() => {
    dispatch(fetchInventory());
  }, []);

  return (
    <>
      <Header isUserView={isUserView} />
      <InventoryStats />
      <InventoryTable products={products} isUserView={isUserView} />
    </>
  );
}

export default App;
