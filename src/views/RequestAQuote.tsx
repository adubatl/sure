import { Grid, TextField } from "@mui/material";
import axios from "axios";
import { useState, ChangeEvent } from "react";
import styled from "styled-components/macro";

import {
  addressTemplate,
  baseUrl,
  colors,
  IQuote,
  touchedTemplate,
} from "./constants";
import { PurplishButton, PurplishLoadingButton } from "./shared";

const CustomTextField = styled(TextField)`
  background-color: white;
  border-bottom: 1px solid ${colors.purplish};
  border-radius: 4px;
  box-shadow: unset;

  & label {
    color: ${colors.purplish};
  }

  & label.Mui-focused {
    color: ${colors.purplish};
  }

  & .MuiFilledInput-root {
    :before {
      border-radius: 4px;
      border-bottom: none;
    }
    :hover:before {
      border-bottom: none;
    }
    :after {
      border-radius: 4px;
      border-bottom: 2px solid ${colors.purplish};
    }
  }
`;

interface IProps {
  loading: boolean;
  setLoading: (newValue: boolean) => void;
  setQuote: (newQuote: IQuote) => void;
}

export const RequestAQuote = (props: IProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState({ ...addressTemplate });
  // state for error handling. libraries like Formik handle validation etc
  // internally but felt like doing it manually here(no real justification)
  const [touched, setTouched] = useState({ ...touchedTemplate });
  const { loading, setLoading, setQuote } = props;

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setAddress({ ...addressTemplate });
    setTouched({ ...touchedTemplate });
    setLoading(false);
  };

  // Change handler to curry the key for each input
  // and set touched state, which again, could be 3rd partied
  // to be more perfect about touched state, could set on blur
  // but feels overkill for this exercise
  const updateForm =
    (key: string) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (key.includes("address")) {
        setTouched({ ...touched, [key.split(".")[1]]: true });
        setAddress({
          ...address,
          [key.split(".")[1]]: e.target.value,
        });
      } else {
        if (key === "first") {
          setTouched({ ...touched, [key]: true });
          setFirstName(e.target.value);
        } else {
          setTouched({ ...touched, [key]: true });
          setLastName(e.target.value);
        }
      }
    };

  const fetchQuote = async () => {
    setLoading(true);
    // in a production environment I would personally
    // prefer these calls to happen server side
    // 1. Send data for request to backend
    // 2. backend crafts and fires off requests
    // 3. client gets data back in an async manner
    const response = await axios
      .post<{ quote: IQuote }>(baseUrl, {
        first_name: firstName,
        last_name: lastName,
        address,
      })
      .then((response) => {
        setLoading(false);
        return response;
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
    if (response) {
      setLoading(false);
      setQuote(response.data.quote);
    }
  };

  // Error validation by key, some other libs
  // offer a slightly more built-in set of form
  // validation
  const hasError = (key: string) => {
    switch (key) {
      case "first":
        return touched["first"] && !firstName;
      case "last":
        return touched["last"] && !lastName;
      case "address.line_1":
        return touched["line_1"] && !address.line_1;
      case "address.city":
        return touched["city"] && !address.city;
      // for simplicity im opting to validate postal for US only
      case "address.postal":
        return (
          touched["postal"] &&
          !address.postal &&
          !/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(address.postal)
        );
      case "address.region":
        return touched["region"] && !address.region;
    }
  };

  return (
    <>
      <Grid item xs={5}>
        <CustomTextField
          required
          variant="filled"
          label="First Name"
          value={firstName}
          onChange={updateForm("first")}
          error={hasError("first")}
          helperText={hasError("first") && "A first name is required."}
          fullWidth
          disabled={loading}
        />
      </Grid>
      <Grid item xs={5}>
        <CustomTextField
          required
          variant="filled"
          label="Last Name"
          value={lastName}
          onChange={updateForm("last")}
          error={touched["last"] && hasError("last")}
          helperText={
            touched["last"] && hasError("last") && "A last name is required."
          }
          fullWidth
          disabled={loading}
        />
      </Grid>
      <Grid item xs={10}>
        <CustomTextField
          required
          variant="filled"
          label="Address"
          value={address.line_1}
          onChange={updateForm("address.line_1")}
          error={hasError("address.line_1")}
          helperText={hasError("address.line_1") && "An address is required."}
          fullWidth
          disabled={loading}
        />
      </Grid>
      <Grid item xs={5}>
        <CustomTextField
          label="Apt/Ste/#"
          variant="filled"
          value={address.line_2}
          onChange={updateForm("address.line_2")}
          fullWidth
          disabled={loading}
        />
      </Grid>
      <Grid item xs={5}>
        <CustomTextField
          required
          variant="filled"
          label="City"
          value={address.city}
          onChange={updateForm("address.city")}
          error={hasError("address.city")}
          helperText={hasError("address.city") && "A city is required."}
          fullWidth
          disabled={loading}
        />
      </Grid>
      <Grid item xs={5}>
        <CustomTextField
          required
          variant="filled"
          label="Region"
          value={address.region}
          onChange={updateForm("address.region")}
          error={hasError("address.region")}
          helperText={hasError("address.region") && "A region is required."}
          fullWidth
          disabled={loading}
        />
      </Grid>
      <Grid item xs={5}>
        <CustomTextField
          required
          variant="filled"
          label="Postal code"
          value={address.postal}
          onChange={updateForm("address.postal")}
          error={hasError("address.postal")}
          helperText={
            hasError("address.postal") && "A valid US postal code is required."
          }
          fullWidth
          disabled={loading}
        />
      </Grid>
      <Grid item xs={5}>
        <PurplishLoadingButton
          loading={loading}
          onClick={fetchQuote}
          variant="outlined"
        >
          Get a quote FAST!
        </PurplishLoadingButton>
      </Grid>
      <Grid item xs={3}>
        <PurplishButton
          onClick={resetForm}
          variant="outlined"
          disabled={loading}
        >
          Clear
        </PurplishButton>
      </Grid>
    </>
  );
};