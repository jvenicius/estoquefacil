import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Buscar from "../buscar/index";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("Teste Unitário - Buscar Produto", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve atualizar o estado de SKU quando o texto de busca é alterado", () => {
    const { getByPlaceholderText } = render(<Buscar />);

    const input = getByPlaceholderText("Ex.: Pipoca");
    fireEvent.changeText(input, "1234");

    expect(input.props.value).toBe("1234");
  });

  it("deve exibir a mensagem de nenhum produto encontrado quando a lista de produtos estiver vazia", async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<Buscar />);

    const { getByText: getByTextMock } = render(<Buscar />);
    fireEvent.changeText(
      getByPlaceholderText("Ex.: Pipoca"),
      "produto_nao_existe"
    );
    fireEvent.press(getByText("PESQUISAR"));

    await waitFor(() => {
      expect(queryByText("Nenhum produto encontrado")).toBeTruthy();
    });
  });
});
