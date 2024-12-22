import React from "react";
import { Typography, Card } from "@mui/material";

import { InventoryStatListItem } from "../../interfaces";

import "./styles.scss";

interface StatCardProps {
  stat: InventoryStatListItem;
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const { label, value, iconComponent: StatIconComponent } = stat;
  return (
    <Card sx={{ width: "100%" }} className="stat-card">
      <StatIconComponent sx={{ color: "white" }} />
      <div>
        <Typography variant="subtitle1" className="stat-card-label">
          {label}
        </Typography>
        <Typography variant="h3" className="stat-card-value">
          {value}
        </Typography>
      </div>
    </Card>
  );
};

export default StatCard;
