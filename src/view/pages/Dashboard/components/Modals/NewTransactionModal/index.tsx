import { Input, InputCurrency, Modal, Select } from "@/view/components";
import { useNewTransactionController } from "./useNewTransactionController";

export function NewATransactionModal() {
  const {
    isNewTransactionModalOpen,
    newTransactionType,
    handleCloseNewTransactionModal,
  } = useNewTransactionController();

  const isExpense = newTransactionType === "EXPENSE";

  return (
    <Modal
      title={isExpense ? "Nova Despesa" : "Nova Receita"}
      open={isNewTransactionModalOpen}
      onClose={handleCloseNewTransactionModal}
    >
      <form>
        <section>
          <p className="text-xs tracking-[-0.5px] text-gray-600">
            Valor da{isExpense ? " despesa" : " receita"}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-lg tracking-[-0.5px] text-gray-600">R$</span>
            <InputCurrency />
          </div>
        </section>

        <section className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            name="name"
            placeholder={isExpense ? "Nome da Despesa" : "Nome da Receita"}
          />

          <Select
            placeholder="Categoria"
            options={[
              { value: "INVESTMENT", label: "Investimentos" },
              { value: "CHECKING", label: "Conta Corrente" },
              { value: "CASH", label: "Dinheiro Físico" },
            ]}
          />

          <Select
            placeholder={isExpense ? "Pagar com" : "Receber com"}
            options={[
              { value: "INVESTMENT", label: "Investimentos" },
              { value: "CHECKING", label: "Conta Corrente" },
              { value: "CASH", label: "Dinheiro Físico" },
            ]}
          />
        </section>
      </form>
    </Modal>
  );
}
