import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Fragment } from "react";

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
        <img src="/logo.png" className="logo" alt="Logo" />
        <div className="databox">
          <h1>Crie sua Conta!</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="form-login">
            <div className="row">
              <input
                className="input"
                type="email"
                {...register("user_name")}
                placeholder="Email"
                required
              />
            </div>
            <div className="row">
              <input
                className="input"
                type="password"
                {...register("user_email")}
                placeholder="Senha"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="row">
              <input
                className="input"
                type="password"
                {...register("user_password")}
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              {!passwordMatch && <span>As senhas não coincidem</span>}
            </div>
            <div className="row-button">
              <button type="submit">Cadastrar</button>
            </div>
            <div className="signup-link">
              <a href="#">Já tem uma conta? Clique aqui</a>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Signup;
