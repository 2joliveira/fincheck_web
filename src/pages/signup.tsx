import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function SignUp() {
  return (
    <>
      <header className="flex flex-col items-center gap-4">
        <h1 className="tracking[-1px] text-2xl font-bold text-gray-900">
          Crie sua sua conta
        </h1>

        <p className="space-x-2">
          <span className="tracking[-0.5] text-gray-700">Já possui uma conta ?</span>

          <Link
            to="/signin"
            className="tracking[-0.5] font-medium text-green-900 hover:text-green-800"
          >
            Faça login aqui
          </Link>
        </p>
      </header>

      <form className="mt-[60px] flex flex-col gap-4">
        <Input placeholder="Nome" name="name" />
        <Input type="email" placeholder="E-mail" name="email" />
        <Input type="password" placeholder="Senha" name="password" />
        <Button type="submit" className="mt-2">
          Criar conta
        </Button>
      </form>
    </>
  );
}
