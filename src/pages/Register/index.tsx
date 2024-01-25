import "./styles.modules.css";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { httpClient } from "../../lib/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
      .post("user/", {
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .then(() => navigate("/login"));
  }

  const isConfirmedEmailInvalid =
    email != "" && confirmEmail !== "" && email !== confirmEmail;
  const errors = formState.errors;

  return (
    <form action="" onSubmit={handleSubmit(handleCreateAccount)}>
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
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Nome
              </label>
              <input
                {...register("name")}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder=""
              />

              {errors?.name ? (
                <div className="invalid-feedback" style={{ display: "block" }}>
                  {errors?.name?.message}
                </div>
              ) : null}
            </div>

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
              {errors?.email && (
                <div className="invalid-feedback" style={{ display: "block" }}>
                  {errors?.email?.message}
                </div>
              )}
            </div>

            <div className="mb-3 w-100">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Confirmação de Email
              </label>
              <input
                {...register("confirmEmail")}
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
              {isConfirmedEmailInvalid ? (
                <div className="invalid-feedback" style={{ display: "block" }}>
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
                <div className="invalid-feedback" style={{ display: "block" }}>
                  {errors?.password?.message}
                </div>
              ) : null}
            </div>

            <button
              className="btn btn-dark w-50 mb-4"
              disabled={
                Object.keys(errors).length > 0 || isConfirmedEmailInvalid
              }
              type="submit"
            >
              Confirmar
            </button>
          </section>
        </div>
      </div>
    </form>
  );
}
