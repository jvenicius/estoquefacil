import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Registrar from "../registrar/index";
import supabase from "../../../database/database";
import { Alert } from "react-native";

jest.spyOn(Alert, "alert");

jest.mock("../../../database/database", () => ({
  from: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  select: jest.fn().mockResolvedValue({
    data: [
      {
        id: 1,
        sku: "1234",
        nome: "Produto Teste",
        fornecedor: "Fornecedor Teste",
        lote: "Lote 1",
        estoque: "50",
      },
    ],
    error: null,
  }),
}));

describe("Teste de Integração - Registrar Produto", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve registrar o produto e exibir uma mensagem de sucesso", async () => {
    const { getByLabelText, getByText } = render(<Registrar />);

    fireEvent.changeText(getByLabelText("SKU"), "1234");
    fireEvent.changeText(getByLabelText("Nome"), "Produto Teste");
    fireEvent.changeText(getByLabelText("Fornecedor"), "Fornecedor Teste");
    fireEvent.changeText(getByLabelText("Lote"), "Lote 1");
    fireEvent.changeText(getByLabelText("Estoque"), "50");

    fireEvent.press(getByText("REGISTRAR"));

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith("produtos");
      expect(supabase.insert).toHaveBeenCalledWith([
        {
          sku: "1234",
          nome: "Produto Teste",
          fornecedor: "Fornecedor Teste",
          lote: "Lote 1",
          estoque: "50",
        },
      ]);

      expect(Alert.alert).toHaveBeenCalledWith(
        "Sucesso",
        "Produto registrado com sucesso!"
      );
    });
  });

  it("deve exibir erro ao tentar registrar com campos vazios", async () => {
    const { getByText } = render(<Registrar />);

    fireEvent.press(getByText("REGISTRAR"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Erro",
        "Preencha todos os campos."
      );
    });
  });
});
