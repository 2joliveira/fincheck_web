import { Link } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useSigninForm } from "../hooks/useSigninForm";

export function Signin() {
  const { register, handleSubmit, errors } = useSigninForm();

  return (
    <>
      <header className="flex flex-col items-center gap-4">
        <h1 className="tracking[-1px] text-2xl font-bold text-gray-900">
          Entre em sua conta
        </h1>

        <p className="space-x-2">
          <span className="tracking[-0.5] text-gray-700">Novo por aqui?</span>

          <Link
            to="/signup"
            className="tracking[-0.5] font-medium text-green-900 hover:text-green-800"
          >
            Crie uma conta
          </Link>
        </p>
      </header>

      <form className="mt-[60px] flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="E-mail"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          type="password"
          placeholder="Senha"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit" className="mt-2">
          Entrar
        </Button>
      </form>
    </>
  );
}
