import { Link } from "react-router-dom";
import { useSignupForm } from "./useSignupForm";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function SignUp() {
  const { handleSubmit, register, errors, isLoading } = useSignupForm();

  return (
    <>
      <header className="flex flex-col items-center gap-4">
        <h1 className="tracking[-1px] text-2xl font-bold text-gray-900">
          Crie sua sua conta
        </h1>

        <p className="space-x-2">
          <span className="tracking[-0.5] text-gray-700">
            Já possui uma conta ?
          </span>

          <Link
            to="/signin"
            className="tracking[-0.5] font-medium text-green-900 hover:text-green-800"
          >
            Faça login aqui
          </Link>
        </p>
      </header>

      <form className="mt-[60px] flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Nome"
          {...register("name")}
          error={errors.name?.message}
        />

        <Input
          type="email"
          placeholder="E-mail"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          type="password"
          placeholder="Senha"
          {...register("password")}
          error={errors.password?.message}
        />
        <Button type="submit" className="mt-2" isLoading={isLoading}>
          Criar conta
        </Button>
      </form>
    </>
  );
}
