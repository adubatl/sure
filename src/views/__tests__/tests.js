import { mount } from "enzyme";

import { RequestAQuote } from "../RequestAQuote";

const fakeProps = {
  loading: false,
  setLoading: jest.fn(),
  setQuote: jest.fn(),
};

describe("Tests... i guess", () => {
  test("mounts the RequestAQuote screen without crashing", () => {
    expect(() => mount(<RequestAQuote {...fakeProps} />)).not.toThrow();
  });
});
