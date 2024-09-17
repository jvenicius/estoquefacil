import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Login from "../index";
import * as authContext from "../../hooks/authContext";
import { useRouter } from "expo-router";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("Login Integration Test", () => {
  it("deve realizar o login e redirecionar para o dashboard", async () => {
    const mockLogin = jest.fn().mockResolvedValue(true);
    const mockReplace = jest.fn();

    jest.spyOn(authContext, "useAuth").mockReturnValue({ login: mockLogin });

    useRouter.mockReturnValue({ replace: mockReplace });

    const { getByText, getByPlaceholderText } = render(<Login />);

    console.log("Renderização completa");

    const emailInput = getByPlaceholderText("email@mail.com");
    const passwordInput = getByPlaceholderText("********");
    const loginButton = getByText("Entrar");

    fireEvent.changeText(emailInput, "teste@email.com");
    fireEvent.changeText(passwordInput, "123");

    console.log("Valores preenchidos");

    fireEvent.press(loginButton);

    console.log("Botão de login pressionado");

    await waitFor(() => {
      console.log("Verificando se o login foi chamado");
      expect(mockLogin).toHaveBeenCalledWith({
        email: "teste@email.com",
        password: "123",
      });
      expect(mockReplace).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("deve exibir mensagem de erro ao falhar no login", async () => {
    const mockLogin = jest.fn().mockResolvedValue(false); // Simula falha no login
    const mockReplace = jest.fn();

    jest.spyOn(authContext, "useAuth").mockReturnValue({ login: mockLogin });
    useRouter.mockReturnValue({ replace: mockReplace });

    const { getByText, getByPlaceholderText } = render(<Login />);

    const emailInput = getByPlaceholderText("email@mail.com");
    const passwordInput = getByPlaceholderText("********");
    const loginButton = getByText("Entrar");

    fireEvent.changeText(emailInput, "teste@email.com");
    fireEvent.changeText(passwordInput, "123");
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "teste@email.com",
        password: "123",
      });
      expect(
        getByText("*As credenciais informadas estão incorretas")
      ).toBeTruthy();
    });
  });
});
