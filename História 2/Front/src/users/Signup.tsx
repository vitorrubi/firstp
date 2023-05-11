import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Fragment } from "react";
import logo from "/logo.png";
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Roboto"],
  },
});

type Inputs = {
  user_name: string;
  user_email: string;
  user_password: string;
  confirm_password: string;
};
type User = any;

interface Props {
  setUser?: (user: User) => void;
}

const Signup = ({ setUser }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch("/api/kanboom/users", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      const parseResponse = await response.json();
      if (setUser) {
        setUser(parseResponse);
      }
    } catch (error) {
      console.error("Erro ao enviar formulário", error);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const passwordMatch = password === confirmPassword;

  return (
    <Fragment>
      <div className="top">
        <div className="databox">
          <img src={logo} alt="Logo" />
          <div id="title">
            <h3> Crie sua conta! </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="form-login">
            <input
              className="input"
              type="string"
              {...register("user_name")}
              placeholder="Nome"
              required
            />
            <div className="row">
              <input
                className="input"
                type="email"
                {...register("user_email")}
                placeholder="E-mail"
                required
              />
            </div>
            <div>
              <input
                className="input"
                type="password"
                {...register("user_password")}
                placeholder="Senha"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div>
              <input
                className="input"
                type="password"
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              {!passwordMatch && <span>As senhas não coincidem</span>}
            </div>
            <div>
              <button className="button" type="submit">
                Entrar
              </button>
            </div>
            <div className="footer">
              <p> Já tem uma conta? Clique </p> <a href="#">aqui</a>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Signup;
