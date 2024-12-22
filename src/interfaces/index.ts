import { SvgIconProps } from "@mui/material";

export interface InventoryStatListItem {
  label: string;
  value: string | number;
  iconComponent: React.FC<SvgIconProps>;
}

export interface InventoryStats {
  totalProducts: number;
  totalStoreValue: number;
  outOfStockProducts: number;
  noOfCategory: number;
}

export interface Product {
  name: string;
  category: string;
  value: number;
  quantity: number;
  price: number;
  disabled?: boolean;
  id: string;
}
