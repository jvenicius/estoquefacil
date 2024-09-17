import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Login from "../index";
import { useAuth } from "../../hooks/authContext"; // Certifique-se de que o caminho está correto

// Mock do hook useAuth
jest.mock("../../hooks/authContext", () => ({
  useAuth: jest.fn(),
}));

describe("Login Screen", () => {
  let loginMock;

  beforeEach(() => {
    loginMock = jest.fn();
    useAuth.mockReturnValue({
      login: loginMock,
    });
  });

  it("deve renderizar o componente de login corretamente", () => {
    const { getByText, getByPlaceholderText } = render(<Login />);

    expect(getByText("EstoqueFácil")).toBeTruthy();
    expect(getByText("Sistema de gestão e controle")).toBeTruthy();
    expect(getByPlaceholderText("email@mail.com")).toBeTruthy();
    expect(getByPlaceholderText("********")).toBeTruthy();
    expect(getByText("Entrar")).toBeTruthy();
    expect(getByText("Fale com o suporte via WhatsApp")).toBeTruthy();
  });

  it("deve permitir que o usuário insira o email e a senha", () => {
    const { getByPlaceholderText } = render(<Login />);

    const emailInput = getByPlaceholderText("email@mail.com");
    const passwordInput = getByPlaceholderText("********");

    fireEvent.changeText(emailInput, "teste@email.com");
    fireEvent.changeText(passwordInput, "senha123");

    expect(emailInput.props.value).toBe("teste@email.com");
    expect(passwordInput.props.value).toBe("senha123");
  });

  it("deve chamar a função de login ao pressionar o botão de entrar", async () => {
    const { getByText, getByPlaceholderText } = render(<Login />);

    const emailInput = getByPlaceholderText("email@mail.com");
    const passwordInput = getByPlaceholderText("********");
    const loginButton = getByText("Entrar");

    fireEvent.changeText(emailInput, "teste@email.com");
    fireEvent.changeText(passwordInput, "senha123");
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith({
        email: "teste@email.com",
        password: "senha123",
      });
    });
  });
});
