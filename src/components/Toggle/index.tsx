import { Switch } from "@mui/material";

import "./styles.scss";

interface ToggleProps {
  unCheckedLabel: string;
  checkedLabel: string;
  isUserView: boolean;
  handleChangeViewType: () => {};
}

const Toggle: React.FC<ToggleProps> = ({
  unCheckedLabel,
  checkedLabel,
  isUserView,
  handleChangeViewType,
}) => {
  const onChange = () => {
    handleChangeViewType();
  };

  return (
    <div className="toggle-container">
      <p className="toggle-label">{unCheckedLabel}</p>
      <Switch
        checked={isUserView}
        onClick={onChange}
        sx={{
          "& .MuiSwitch-switchBase.Mui-checked": {
            color: "#a6e22e",
          },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#a6e22e",
          },
        }}
      />
      <p className="toggle-label">{checkedLabel}</p>
    </div>
  );
};

export default Toggle;
