import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarSVG } from "../../assets/Calendar";
import { Navbar } from "../../components";
import "./styles.modules.css";

import { LoginFormValidationSchema } from "./utils";
import { LoginForm } from "../../types/Login";
import { useLogin } from "../../hooks";
import { Link } from "react-router-dom";

export function Login() {
  const { register, handleSubmit, formState } = useForm<LoginForm>({
    resolver: zodResolver(LoginFormValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSignIn, isLoading } = useLogin();

  async function handleLogin(data: LoginForm) {
    handleSignIn(data);
  }

  const errors = formState.errors;

  const isBtnLoginDisabled = Object.keys(errors).length > 0 || isLoading;
  return (
    <div
      className="container-fluid p-0 overflow-hidden"
      style={{ height: "100vh" }}
    >
      <Navbar />
      <div
        className="d-flex flex-row justify-content-center align-items-center gap-4"
        style={{ height: "100vh" }}
      >
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="d-flex flex-column border align-items-center gap-2 section-login-size px-4"
          style={{ height: "auto" }}
        >
          <h3 className="mt-4">Login</h3>

          <div className="mb-3 w-100">
            <label htmlFor="emailInput" className="form-label">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              className="form-control"
              id="emailInput"
              placeholder="name@email.com"
              aria-describedby="emailError"
            />
            {errors.email && (
              <div id="emailError" className="invalid-feedback d-block">
                {errors.email.message}
              </div>
            )}
          </div>

          <div className="mb-3 w-100">
            <label htmlFor="inputPassword" className="form-label">
              Senha
            </label>
            <input
              {...register("password")}
              type="password"
              id="inputPassword"
              className="form-control"
              aria-describedby="passwordError"
            />
            {errors.password && (
              <div id="passwordError" className="invalid-feedback d-block">
                {errors.password.message}
              </div>
            )}
          </div>

          <button
            className="btn btn-dark w-50 mb-4"
            disabled={isBtnLoginDisabled}
            type="submit"
          >
            {isLoading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            )}
            {isLoading ? "" : "Login"}
          </button>

          <div className="mb-3 d-flex justify-content-center align-items-center w-100 flex-wrap">
            <label className="form-label mb-0 me-2">
              Ainda não tem uma conta?
            </label>
            <Link to="/register">Registre-se</Link>
          </div>
        </form>

        <CalendarSVG
          className="section-login-calendar-display"
          width={400}
          height="365px"
        />
      </div>
    </div>
  );
}
