import { useDispatch } from "react-redux";

import Toggle from "../Toggle";
import { toggleView } from "../../store/slices/inventorySlice";

import "./styles.scss";

interface HeaderProps {
  isUserView: boolean;
}

const Header: React.FC<HeaderProps> = ({ isUserView }) => {
  const dispatch = useDispatch();
  return (
    <div className="header">
      <Toggle
        unCheckedLabel={"Admin"}
        checkedLabel={"User"}
        isUserView={isUserView}
        handleChangeViewType={() => dispatch(toggleView())}
      />
    </div>
  );
};

export default Header;
