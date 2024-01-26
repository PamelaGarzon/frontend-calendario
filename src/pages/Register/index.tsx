import "./styles.modules.css";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { httpClient } from "../../lib/axios";
import { Link, useNavigate } from "react-router-dom";
import { rendeSuccessMessage } from "../../utils";

interface SignUp {
  name: string;
  email: string;
  password: string;
  confirmEmail: string;
}

const signUpFormValidationSchema = zod.object({
  name: zod.string(),
  email: zod.string().email("Informe um e-mail válido."),
  confirmEmail: zod.string().email("Informe um e-mail válido."),
  password: zod
    .string()
    .min(8, "Mínimo de 8 dígitos.")
    .max(20, "Máximo de 20 dígitos"),
});

export function Register() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState, watch } = useForm<SignUp>({
    resolver: zodResolver(signUpFormValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmEmail: "",
    },
  });

  const [email, confirmEmail] = watch(["email", "confirmEmail"]);

  async function handleCreateAccount(data: SignUp) {
    await httpClient
      .post("user/create", {
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .then(() => {
        rendeSuccessMessage("Cadastro realizado com sucesso!");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      });
  }

  const errors = formState.errors;

  const isConfirmedEmailInvalid =
    email != "" && confirmEmail !== "" && email !== confirmEmail;

  const isBtnDisabled =
    Object.keys(errors).length > 0 || isConfirmedEmailInvalid;

  return (
    <form onSubmit={handleSubmit(handleCreateAccount)}>
      <div className="container-fluid p-0" style={{ height: "100vh" }}>
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <section
            className="d-flex flex-column border align-items-center gap-2 section-register-size px-4"
            style={{ height: "auto" }}
          >
            <h3 className="mt-4">Event Calendar</h3>

            <p>Cadastra-se para gerenciar seus eventos!</p>

            <div className="mb-3 w-100">
              <label htmlFor="nameInput" className="form-label">
                Nome
              </label>
              <input
                {...register("name")}
                type="text"
                className="form-control"
                id="nameInput"
                placeholder=""
              />

              {errors?.name ? (
                <div className="invalid-feedback d-block">
                  {errors?.name?.message}
                </div>
              ) : null}
            </div>

            <div className="mb-3 w-100">
              <label htmlFor="emailInput" className="form-label">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                className="form-control"
                id="emailInput"
                placeholder="name@example.com"
              />
              {errors?.email && (
                <div className="invalid-feedback d-block">
                  {errors?.email?.message}
                </div>
              )}
            </div>

            <div className="mb-3 w-100">
              <label htmlFor="confirmEmailInput" className="form-label">
                Confirmação de Email
              </label>
              <input
                {...register("confirmEmail")}
                type="email"
                className="form-control"
                id="confirmEmailInput"
                placeholder="name@example.com"
              />
              {isConfirmedEmailInvalid ? (
                <div className="invalid-feedback d-block">
                  Preencha a confirmação do mesmo email
                </div>
              ) : null}
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
                aria-describedby="passwordHelpBlock"
              />
              {errors.password ? (
                <div className="invalid-feedback d-block">
                  {errors?.password?.message}
                </div>
              ) : null}
            </div>

            <button
              className="btn btn-dark w-50 mb-4"
              disabled={isBtnDisabled}
              type="submit"
            >
              Confirmar
            </button>
            <div className="mb-3 d-flex justify-content-center align-items-center w-100 flex-wrap">
              <label className="form-label mb-0 me-2">Já tem uma conta?</label>
              <Link to="/login">Faça o login</Link>
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
