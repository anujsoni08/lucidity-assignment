import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import CurrencyExchangeOutlined from "@mui/icons-material/CurrencyExchangeOutlined";
import RemoveShoppingCartOutlined from "@mui/icons-material/RemoveShoppingCartOutlined";
import CategoryOutlined from "@mui/icons-material/CategoryOutlined";
import { InventoryStats } from "../../interfaces";
import { formatNumberWithCommas } from "../../utils/helpers";

export const getInventoryStatList = ({
  totalProducts,
  totalStoreValue,
  outOfStockProducts,
  noOfCategory,
}: InventoryStats) => {
  return [
    {
      label: "Total Product",
      value: totalProducts,
      iconComponent: ShoppingCartOutlined,
    },
    {
      label: "Total store value",
      value: formatNumberWithCommas(totalStoreValue),
      iconComponent: CurrencyExchangeOutlined,
    },
    {
      label: "Out of stocks",
      value: outOfStockProducts,
      iconComponent: RemoveShoppingCartOutlined,
    },
    {
      label: "No of Category",
      value: noOfCategory,
      iconComponent: CategoryOutlined,
    },
  ];
};
