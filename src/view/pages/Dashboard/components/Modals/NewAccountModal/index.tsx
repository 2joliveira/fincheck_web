import { ColorsDropdownInput, Input, InputCurrency, Modal, Select } from "@/view/components";
import { useNewAccountController } from "./useNewAccountController";

export function NewAccountModal() {
  const { isNewAccountModalOpen, handleCloseNewAccountModal } =
    useNewAccountController();

  return (
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={handleCloseNewAccountModal}
    >
      <form>
        <section>
          <p className="text-xs tracking-[-0.5px] text-gray-600">Saldo</p>
          <div className="flex items-center gap-2">
            <span className="text-lg tracking-[-0.5px] text-gray-600">R$</span>
            <InputCurrency />
          </div>
        </section>

        <section className="mt-10 flex flex-col gap-4">
          <Input type="text" name="name" placeholder="Nome da Conta" />

          <Select
            placeholder="Tipo"
            options={[
              { value: "INVESTMENT", label: "Investimentos" },
              { value: "CHECKING", label: "Conta Corrente" },
              { value: "CASH", label: "Dinheiro Físico" },
            ]}
          />

          <ColorsDropdownInput />
        </section>
      </form>
    </Modal>
  );
}
