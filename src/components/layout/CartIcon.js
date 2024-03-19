import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cartSlice";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}));

export default function Cart() {
  const cartItems = useSelector(selectCartItems);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <IconButton aria-label="cart" className="text-dark">
      <StyledBadge badgeContent={itemCount} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}
