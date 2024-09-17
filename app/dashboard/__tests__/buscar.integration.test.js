import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Buscar from "../buscar/index";
import supabase from "../../../database/database";

jest.mock("../../../database/database", () => ({
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  or: jest.fn().mockResolvedValue({
    data: [
      {
        id: 1,
        sku: "1234",
        nome: "Produto Teste",
        lote: "Lote 1",
        estoque: "50",
      },
    ],
    error: null,
  }),
}));

describe("Teste de Integração - Buscar Produto", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve buscar e exibir o produto corretamente", async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<Buscar />);

    fireEvent.changeText(getByPlaceholderText("Ex.: Pipoca"), "1234");

    fireEvent.press(getByText("PESQUISAR"));

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith("produtos");
      expect(supabase.select).toHaveBeenCalledWith("*");
      expect(supabase.or).toHaveBeenCalledWith(
        "sku.ilike.%1234%,nome.ilike.%1234%"
      );
    });

    await waitFor(() => {
      expect(queryByText("ID: 1")).toBeTruthy();
      expect(queryByText("Nome: Produto Teste")).toBeTruthy();
      expect(queryByText("Lote: Lote 1")).toBeTruthy();
      expect(queryByText("Estoque: 50")).toBeTruthy();
    });
  });

  it("deve exibir mensagem de nenhum produto encontrado quando não houver resultados", async () => {
    supabase.or.mockResolvedValueOnce({
      data: [],
      error: null,
    });

    const { getByPlaceholderText, getByText, queryByText } = render(<Buscar />);

    fireEvent.changeText(
      getByPlaceholderText("Ex.: Pipoca"),
      "produto_nao_existe"
    );

    fireEvent.press(getByText("PESQUISAR"));

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith("produtos");
      expect(supabase.select).toHaveBeenCalledWith("*");
      expect(supabase.or).toHaveBeenCalledWith(
        "sku.ilike.%produto_nao_existe%,nome.ilike.%produto_nao_existe%"
      );
    });

    await waitFor(() => {
      expect(queryByText("Nenhum produto encontrado")).toBeTruthy();
    });
  });
});
