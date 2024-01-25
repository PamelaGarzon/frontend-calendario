import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CalendarSVG } from "../../assets/Calendar";
import { Navbar } from "../../components/Navbar";
import { httpClient } from "../../lib/axios";
import "./styles.modules.css";
import * as zod from "zod";
import { useContext } from "react";
import { AuthUserContext } from "../../context";
import { toast } from "react-toastify";

interface LoginForm {
  email: string;
  password: string;
}
const LoginFormValidationSchema = zod.object({
  email: zod.string().email("Informe um e-mail válido."),
  password: zod
    .string()
    .min(6, "Mínimo de 6 dígitos.")
    .max(20, "Máximo de 16 dígitos"),
});

export function Login() {
  const navigate = useNavigate();
  const { setUserId } = useContext(AuthUserContext);

  const { register, handleSubmit, formState } = useForm<LoginForm>({
    resolver: zodResolver(LoginFormValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function renderErrorMessage(errorMessage: string) {
    toast(errorMessage, {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      type: "error",
      position: "top-right",
      style: {
        borderBottomColor: "red",
      },
    });
  }

  async function handleLogin(data: LoginForm) {
    await httpClient
      .post("user/auth", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        setUserId(res?.data?.userId);
        localStorage.setItem("token-user", res.data.access_token);
        localStorage.setItem("user-id", res.data.userId);

        // executa uma ação depois de x segundos 1000 milisegundos = 1s no caso 2s
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        if (err?.response?.data && err?.response?.status === 401) {
          renderErrorMessage(err.response.data);
        }
        console.error(err);
      });
  }
  const errors = formState.errors;

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
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="mb-3 w-100">
            <label htmlFor="inputPassword5" className="form-label">
              Senha
            </label>
            <input
              {...register("password")}
              type="password"
              id="inputPassword5"
              className="form-control"
              aria-describedby="passwordHelpBlock"
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <button
            className="btn btn-dark w-50 mb-4"
            disabled={Object.keys(errors).length > 0}
            type="submit"
          >
            Login
          </button>
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
