import { useForm, SubmitHandler } from "react-hook-form";
import { Fragment } from "react";

type Inputs = {
  userName: string;
  userEmail: string;
  userPassword: string;
};

type Props = {
  users: Array<Object>;
  setUser: Function;
};

const Signup = ({ users, setUser }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(JSON.stringify(data));
    const response = await fetch("/api/users/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    const parseResponse = await response.json();
    setUser([
      ...users,
      {
        user_id: parseResponse.data.beat_id,
        user_name: data.userName,
        user_email: data.userEmail,
        user_password: data.userPassword,
      },
    ]);
  };

  return (
    <Fragment>
      <h1>Crie sua Conta!</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form-login">
        <div className="row">
          <i className="fa-solid fa-user"></i>
          <input
            type="text"
            {...register("userName")}
            placeholder="Nome do Usuário"
            required
          />
        </div>
        <div className="row">
          <i className="fa-solid fa-envelope"></i>
          <input
            type="email"
            {...register("userEmail")}
            placeholder="Email do Usuário"
            required
          />
        </div>
        <div className="row">
          <i className="fa-solid fa-lock"></i>
          <input
            type="password"
            {...register("userPassword")}
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
