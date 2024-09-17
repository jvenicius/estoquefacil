import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Registrar from "../registrar/index";
import supabase from "../../../database/database";
import { Alert } from "react-native";

jest.mock("../../../database/database", () => ({
  from: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
}));

jest.spyOn(Alert, "alert");

describe("Teste Unitário - Registrar Produto", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve exibir mensagem de erro ao tentar registrar com campos vazios", async () => {
    const { getByText } = render(<Registrar />);

    fireEvent.press(getByText("REGISTRAR"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Erro",
        "Preencha todos os campos."
      );
    });
  });

  it("não deve chamar supabase.insert se algum campo estiver vazio", async () => {
    const { getByLabelText, getByText } = render(<Registrar />);

    // Preencher apenas alguns campos
    fireEvent.changeText(getByLabelText("SKU"), "1234");
    fireEvent.changeText(getByLabelText("Nome"), "Produto Teste");

    fireEvent.press(getByText("REGISTRAR"));

    await waitFor(() => {
      expect(supabase.insert).not.toHaveBeenCalled();
    });
  });
});
