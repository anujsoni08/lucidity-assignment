import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  deleteProduct,
  disableProduct,
  editProduct,
} from "../../store/slices/inventorySlice";
import { Product } from "../../interfaces";
import EditModal from "../EditProductModal";

import "./styles.scss";

enum ACTION_TYPE {
  EDIT = "edit",
  DISABLE = "disable",
  DELETE = "delete",
}

interface InventoryTableProps {
  products: Product[];
  isUserView: boolean;
}

const InventoryTable: React.FC<InventoryTableProps> = ({
  products,
  isUserView,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setEditModalOpen] = useState(false);

  const dispatch = useDispatch();

  const isActionDisabled = (product: Product, actionName: ACTION_TYPE) => {
    if (isUserView) {
      return true;
    }
    if (product.disabled && actionName === ACTION_TYPE.EDIT) {
      return true;
    }
    return false;
  };

  const handleEditModalOpen = (product: Product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setSelectedProduct(null);
    setEditModalOpen(false);
  };

  const handleTableAction = ({
    actionName,
    action,
    product,
  }: {
    actionName: ACTION_TYPE;
    action: Function;
    product: Product;
  }) => {
    if (isActionDisabled(product, actionName)) {
      return;
    }

    if (
      actionName === ACTION_TYPE.DELETE ||
      actionName === ACTION_TYPE.DISABLE
    ) {
      dispatch(action(product.id));
      return;
    }

    handleEditModalOpen(product);
  };

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell>
                <span className="table-header-column-label">Name</span>
              </TableCell>
              <TableCell>
                <span className="table-header-column-label">Category</span>
              </TableCell>
              <TableCell>
                <span className="table-header-column-label">Price</span>
              </TableCell>
              <TableCell>
                <span className="table-header-column-label">Quantity</span>
              </TableCell>
              <TableCell>
                <span className="table-header-column-label">Value</span>
              </TableCell>
              <TableCell>
                <span className="table-header-column-label">Action</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>${product.value}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label={`Edit ${product.id}`}
                    onClick={() =>
                      handleTableAction({
                        actionName: ACTION_TYPE.EDIT,
                        action: editProduct,
                        product,
                      })
                    }
                  >
                    <EditIcon
                      color={
                        isActionDisabled(product, ACTION_TYPE.EDIT)
                          ? "disabled"
                          : "success"
                      }
                    />
                  </IconButton>
                  <IconButton
                    aria-label={`Disable ${product.id}`}
                    onClick={() =>
                      handleTableAction({
                        actionName: ACTION_TYPE.DISABLE,
                        action: disableProduct,
                        product,
                      })
                    }
                  >
                    <VisibilityIcon
                      color={
                        isActionDisabled(product, ACTION_TYPE.DISABLE)
                          ? "disabled"
                          : "secondary"
                      }
                    />
                  </IconButton>
                  <IconButton
                    aria-label={`Delete ${product.id}`}
                    onClick={() =>
                      handleTableAction({
                        actionName: ACTION_TYPE.DELETE,
                        action: deleteProduct,
                        product,
                      })
                    }
                  >
                    <DeleteIcon
                      color={
                        isActionDisabled(product, ACTION_TYPE.DELETE)
                          ? "disabled"
                          : "error"
                      }
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isModalOpen && selectedProduct && (
        <EditModal
          isOpen={isModalOpen}
          onClose={handleEditModalClose}
          initialData={selectedProduct}
          onSave={(updatedData) => dispatch(editProduct(updatedData))}
        />
      )}
    </Fragment>
  );
};

export default InventoryTable;
