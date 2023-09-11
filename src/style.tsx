import { Grid, styled } from "@mui/material";

export const StyledGrid = styled(Grid)({});
StyledGrid.defaultProps = {
  container: true,
  spacing: 2,
  mt: 1,
};

const GridChild = styled(Grid)(() => ({}));

GridChild.defaultProps = {
  ...GridChild.defaultProps,

  xs: 6,
  sm: 4,
  md: 3,
  item: true,
};

export { GridChild };
