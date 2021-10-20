import { LoadingButton } from "@mui/lab";
import { Button, InputBase } from "@mui/material";
import { darken } from "polished";
import styled from "styled-components/macro";

import { colors } from "./constants";

export const PurplishButton = styled(Button)`
  background-color: ${colors.greenish};
  color: ${colors.purplish};
  border-color: ${colors.purplish};
  :hover {
    background-color: ${darken(0.2, colors.greenish)};
    border-color: ${colors.purplish};
  }
`;

export const PurplishLoadingButton = styled(LoadingButton)`
  background-color: ${colors.greenish};
  color: ${colors.purplish};
  border-color: ${colors.purplish};
  :hover {
    background-color: ${darken(0.2, colors.greenish)};
    border-color: ${colors.purplish};
  }
`;

export const StyledInputBase = styled(InputBase)`
  background-color: white;
  border: none;
  border-radius: 4px;
  box-shadow: unset;
  padding: 10px;
  color: ${colors.purplish};
  svg {
    color: ${colors.purplish};
  }
`;
