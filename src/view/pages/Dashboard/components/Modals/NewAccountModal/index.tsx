import {
  Button,
  ColorsDropdownInput,
  Input,
  InputCurrency,
  Modal,
  Select,
} from "@/view/components";
import { useNewAccountController } from "./useNewAccountController";
import { Controller } from "react-hook-form";

export function NewAccountModal() {
  const {
    isNewAccountModalOpen,
    handleCloseNewAccountModal,
    register,
    control,
    handleSubmit,
    errors,
  } = useNewAccountController();

  return (
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={handleCloseNewAccountModal}
    >
      <form onSubmit={handleSubmit}>
        <section>
          <p className="text-xs tracking-[-0.5px] text-gray-600">
            Saldo inicial
          </p>
          <div className="flex items-center gap-2">
            <span className="text-lg tracking-[-0.5px] text-gray-600">R$</span>
            <Controller
              name="initialBalance"
              control={control}
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.initialBalance?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </section>

        <section className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Nome da Conta"
            error={errors.name?.message}
            {...register("name")}
          />

          <Select
            placeholder="Tipo"
            options={[
              { value: "INVESTMENT", label: "Investimentos" },
              { value: "CHECKING", label: "Conta Corrente" },
              { value: "CASH", label: "Dinheiro Físico" },
            ]}
            error={errors.type?.message}
          />

          <ColorsDropdownInput error={errors.color?.message} />
        </section>

        <Button type="submit" className="mt-6 w-full">
          Criar
        </Button>
      </form>
    </Modal>
  );
}
