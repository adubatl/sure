import { Container, Grid } from "@mui/material";
import React, { useState } from "react";

import { colors, IQuote } from "./constants";
import { QuoteScreen } from "./QuoteScreen";
import { RequestAQuote } from "./RequestAQuote";

export const LandingScreen = () => {
  const [quote, setQuote] = useState<IQuote | null>(null);
  const [loading, setLoading] = useState(false);

  const resetState = () => {
    setQuote(null);
    setLoading(false);
  };

  // could have just styled(Container) but
  // messing around with the library builtins
  const containerStyle = {
    backgroundColor: colors.blueish,
    color: colors.greenish,
  };

  return (
    <Container sx={containerStyle}>
      <h1 data-test="header-text">{quote ? "" : "Tell us about you"}</h1>
      <Grid container component="form" autoComplete="off" spacing={2}>
        {!quote ? (
          <RequestAQuote
            loading={loading}
            setLoading={setLoading}
            setQuote={setQuote}
          />
        ) : (
          <QuoteScreen
            quote={quote}
            loading={loading}
            setLoading={setLoading}
            setQuote={setQuote}
            resetState={resetState}
          />
        )}
      </Grid>
    </Container>
  );
};
