import { useForm, SubmitHandler } from "react-hook-form";
import { Fragment } from "react";

type Inputs = {
  user_name: string;
  user_email: string;
  user_password: string;
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

  return (
    <Fragment>
      <h1>Crie sua Conta!</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form-login">
        <div className="row">
          <input
            type="text"
            {...register("user_name")}
            placeholder="Nome do Usuário"
            required
          />
        </div>
        <div className="row">
          <input
            type="email"
            {...register("user_email")}
            placeholder="Email do Usuário"
            required
          />
        </div>
        <div className="row">
          <input
            type="password"
            {...register("user_password")}
            placeholder="Senha do usuário"
            required
          />
        </div>
        <div className="row-button">
          <button type="submit">Enviar</button>
        </div>
        <div className="signup-link">
          <a href="#">Já possui uma conta?</a>
        </div>
      </form>
    </Fragment>
  );
};

export default Signup;
