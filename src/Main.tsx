import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components/macro";

import { colors } from "./views/constants";
import { LandingScreen } from "./views/LandingScreen";

const ContentWrapper = styled.div`
  height: 100vh;
  background-color: ${colors.blueish};
`;

const Header = styled.div`
  width: 100vw;
  min-height: 75px;
  max-height: 75px;
  padding: 0px 15px 0px 15px;
  background-color: ${colors.greenish};
`;

const CompanyName = styled.span`
  margin-left: 10px;
  font-size: 1.5em;
  font-weight: bold;
  color: ${colors.purplish};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  svg {
    color: ${colors.purplish};
  }
`;

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const Phrase = styled(Typography)`
  color: ${colors.purplish};
  font-style: oblique;
  font-size: 0.75em;
`;

export const Main = () => {
  return (
    <ContentWrapper>
      <Grid container spacing={0}>
        <Header>
          <Icon>
            <Row>
              <FontAwesomeIcon size={"2x"} icon={faRocket} />
              <CompanyName>Rocket Insurance</CompanyName>
            </Row>
            <Phrase>Our coverage is outta this world</Phrase>
          </Icon>
        </Header>
        <LandingScreen />
      </Grid>
    </ContentWrapper>
  );
};
