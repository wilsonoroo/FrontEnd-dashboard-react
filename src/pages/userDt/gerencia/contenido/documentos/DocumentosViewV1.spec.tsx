import { render } from "@testing-library/react";
import DocumentosView from "./DocumentosView";

// Tests that the DocumentosView component renders correctly with the correct title.
it("test_documentos_view_renders_correctly", () => {
  const titulo = "Test Title";
  const useParamsMock = {
    idEmpresa: "1",
    idGerencia: "2",
    idDivision: "3",
  };

  jest.mock("react-router", () => ({
    useParams: jest.fn().mockReturnValue(useParamsMock),
  }));

  const { container, getByText } = render(<DocumentosView titulo={titulo} />);

  expect(getByText(titulo)).toBeInTheDocument();
  expect(container.querySelector("table")).toBeInTheDocument();
  expect(container.querySelector("thead")).toBeInTheDocument();
  expect(container.querySelector("tbody")).toBeInTheDocument();
});
