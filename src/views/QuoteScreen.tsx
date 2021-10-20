import {
  Card,
  CardContent,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import axios from "axios";
import React from "react";
import styled from "styled-components/macro";

import {
  baseUrl,
  colors,
  dollarFormat,
  IQuote,
  IQuoteUpdatePayload,
} from "./constants";
import { PurplishButton, StyledInputBase } from "./shared";

const StyledLabel = styled(InputLabel)`
  color: ${colors.greenish};
`;

const Title = styled.span`
  font-size: 1.25em;
  font-weight: bold;
  font-style: smallcaps;
`;

const Info = styled.span`
  font-style: oblique;
  font-size: 0.75em;
`;

interface IProps {
  quote: IQuote;
  loading: boolean;
  setLoading: (newValue: boolean) => void;
  setQuote: (newQuote: IQuote) => void;
  resetState: () => void;
}

export const QuoteScreen = (props: IProps) => {
  const { quote, loading, setLoading, setQuote, resetState } = props;
  // The API note says this is the required set, which seems odd
  // since the ID would allow you to get all the info on the backend
  // without sending it all over, IMO should only need a partial of
  // the variable selections. This is ignoring obvious auth requirements
  // of course haha
  const updateQuote = async (toUpdate: IQuoteUpdatePayload) => {
    setLoading(true);
    const putResponse = await axios
      .put<{ quote: IQuote }>(baseUrl + "/" + toUpdate.quoteId, {
        quote: toUpdate,
      })
      .then((response) => {
        setLoading(false);
        return response;
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
    if (putResponse) {
      setLoading(false);
      setQuote(putResponse.data.quote);
    }
  };

  const handleChange = (key: string) => (e: SelectChangeEvent<number>) => {
    updateQuote({
      ...quote,
      variable_selections: {
        ...quote.variable_selections,
        [key]: e.target.value,
      },
    });
  };

  const cardStyle = {
    backgroundColor: colors.greenish,
    color: colors.purplish,
    "& dt": {
      fontWeight: "bold",
    },
    minWidth: "215px",
    maxWidth: "215px",
  };

  const stackStyle = {
    height: "100%",
  };

  const buttonStyle = {
    minWidth: "215px",
    maxWidth: "215px",
  };

  return (
    <>
      <Grid item xs={12} sm={5}>
        <Card sx={cardStyle}>
          <CardContent>
            <Title>Quote</Title>
            <dl>
              <dt>Policy holder:</dt>
              <dd>
                {quote.policy_holder.first_name +
                  " " +
                  quote.policy_holder.last_name[0].toUpperCase()}
              </dd>
              <dt>Priced for:</dt>
              <dd>{quote.rating_address.postal}</dd>
              <dt>Premium*: </dt>
              <dd>{loading ? "Loading. . ." : dollarFormat(quote.premium)}</dd>
            </dl>
            <Info>
              * premium adjusted based on the values of the adjacent dropdowns.
              New quote calculated immediately upon selection.
            </Info>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={7}>
        <Stack
          sx={stackStyle}
          direction="column"
          justifyContent="center"
          spacing={4}
        >
          <div>
            <StyledLabel>
              Deductible{" "}
              {quote.variable_options.deductible.default &&
                "default is: " +
                  dollarFormat(quote.variable_options.deductible.default)}
              {/* the docs provided say default exists, the return type does not contain it */}
            </StyledLabel>
            <Select
              value={quote.variable_selections.deductible}
              onChange={handleChange("deductible")}
              fullWidth
              input={<StyledInputBase />}
            >
              {quote.variable_options.deductible.values.map((value) => (
                <MenuItem key={quote.quoteId + "-" + value} value={value}>
                  {dollarFormat(value)}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div>
            <StyledLabel>
              Asteroid Collision{" "}
              {quote.variable_options.asteroid_collision.default &&
                "default is: " +
                  dollarFormat(
                    quote.variable_options.asteroid_collision.default
                  )}
              {/* the docs provided say this exists, the return type does not contain it */}
            </StyledLabel>
            <Select
              value={quote.variable_selections.asteroid_collision}
              onChange={handleChange("asteroid_collision")}
              fullWidth
              input={<StyledInputBase />}
            >
              {quote.variable_options.asteroid_collision.values.map((value) => (
                <MenuItem key={quote.quoteId + "-" + value} value={value}>
                  {dollarFormat(value)}
                </MenuItem>
              ))}
            </Select>
          </div>
        </Stack>
      </Grid>
      <Grid item xs={10}>
        <PurplishButton
          sx={buttonStyle}
          onClick={resetState}
          variant="outlined"
        >
          Request another quote
        </PurplishButton>
      </Grid>
    </>
  );
};
