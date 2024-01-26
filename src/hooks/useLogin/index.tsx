import { useContext, useState } from "react";
import { httpClient } from "../../lib/axios";
import { LoginForm } from "../../types/Login";
import { useNavigate } from "react-router-dom";
import { AuthUserContext } from "../../context";
import { renderErrorMessage } from "../../utils/renderErrorMessage.utils";
import { AxiosError } from "axios";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserId } = useContext(AuthUserContext);

  async function handleSignIn(data: LoginForm) {
    try {
      setIsLoading(true);

      const response = await httpClient.post("user/auth", {
        email: data.email,
        password: data.password,
      });

      const {
        data: { userId, access_token },
      } = response;

      setUserId(userId);
      localStorage.setItem("token-user", access_token);
      localStorage.setItem("user-id", userId);

      navigate("/");
    } catch (error) {
      const errorSignIn = error as AxiosError<string>;
      if (
        errorSignIn?.response?.data &&
        errorSignIn?.response?.status === 401
      ) {
        renderErrorMessage(errorSignIn.response.data);
      }

      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    handleSignIn,
  };
}
