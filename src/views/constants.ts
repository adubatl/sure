// I've seen types in their own types.ts files
// but IMO all types _are_ consts, willing to be
// wrong on this.
export interface IAddress {
  line_1: string;
  line_2: string | null;
  city: string;
  region: string;
  postal: string;
}

export interface IPerson {
  first_name: string;
  last_name: string;
}

// The default doesn't actually come back, but the
// documentation says it does.
export interface IQuoteVariable {
  title: string;
  description: string;
  values: number[];
  default?: number;
}

// Why does this API mix camel/snake case?!?
// S A D
export interface IQuote {
  quoteId: string;
  rating_address: IAddress;
  policy_holder: IPerson;
  variable_options: {
    deductible: IQuoteVariable;
    asteroid_collision: IQuoteVariable;
  };
  variable_selections: {
    deductible: number;
    asteroid_collision: number;
  };
  premium: number;
}

export interface IQuoteUpdatePayload extends Partial<IQuote> {
  quoteId: string;
  rating_address: IAddress;
  policy_holder: IPerson;
  variable_selections: {
    deductible: number;
    asteroid_collision: number;
  };
}

// initial state for an address
export const addressTemplate: IAddress = {
  line_1: "",
  line_2: "",
  city: "",
  region: "",
  postal: "",
};

// initial state to track touched inputs
export const touchedTemplate = {
  first: false,
  last: false,
  line_1: false,
  line_2: false,
  city: false,
  region: false,
  postal: false,
};

export const baseUrl = `https://fed-challenge-api.sure.now.sh/api/v1/quotes`;

// again, going the US only route for now, there are loads
// of libraries/builtins that can do this internationally if that
// is the requirement!
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export const dollarFormat = (value: number | string) => {
  return formatter.format(typeof value === "string" ? parseInt(value) : value);
};

// could use a theme built into MUI/sc but
// once more, speedier route!
export const colors = {
  blueish: "#63768d",
  greenish: "#5be0a6",
  purplish: "#490761",
};
