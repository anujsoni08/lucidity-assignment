import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { RootState } from "../../store";
import { getInventoryStatList } from "./helper";
import StatCard from "../StatCard";
import { InventoryStatListItem } from "../../interfaces";

import "./styles.scss";

const InventoryStats = () => {
  const { totalProducts, totalStoreValue, outOfStockProducts, noOfCategory } =
    useSelector((state: RootState) => state.inventory);

  const inventoryStatList = getInventoryStatList({
    totalProducts,
    totalStoreValue,
    outOfStockProducts,
    noOfCategory,
  });

  return (
    <div className="inventory-stats-container">
      <Typography variant="h3" gutterBottom align="left">
        Inventory Stats
      </Typography>
      <div className="stat-card-container">
        {inventoryStatList.map((stat: InventoryStatListItem) => (
          <StatCard stat={stat} key={stat.label} />
        ))}
      </div>
    </div>
  );
};

export default InventoryStats;
