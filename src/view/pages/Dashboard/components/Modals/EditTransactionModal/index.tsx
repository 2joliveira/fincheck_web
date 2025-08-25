import {
  Button,
  DatePickerInput,
  Input,
  InputCurrency,
  Modal,
  Select,
} from "@/view/components";
import { Controller } from "react-hook-form";
import { useEditTransactionController } from "./useEditTransactionController";
import type { Transaction } from "@/app/entities/Transaction";

interface EditTransactionModalProps {
  transaction: Transaction | null;
  open: boolean;
  onClose(): void;
}

export function EditTransactionModal({
  transaction,
  onClose,
  open,
}: EditTransactionModalProps) {
  const {
    register,
    control,
    handleSubmit,
    errors,
    accounts,
    categories,
    isLoading,
  } = useEditTransactionController(transaction, onClose);

  const isExpense = transaction?.type === "EXPENSE";

  return (
    <Modal
      title={isExpense ? "Editar Despesa" : "Editar Receita"}
      open={open}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <section>
          <p className="text-xs tracking-[-0.5px] text-gray-600">
            Valor da{isExpense ? " despesa" : " receita"}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-lg tracking-[-0.5px] text-gray-600">R$</span>
            <Controller
              control={control}
              name="value"
              defaultValue="0"
              render={({ field: { value, onChange } }) => (
                <InputCurrency
                  value={value}
                  onChange={onChange}
                  error={errors.value?.message}
                />
              )}
            />
          </div>
        </section>

        <section className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={isExpense ? "Nome da Despesa" : "Nome da Receita"}
            {...register("name")}
            error={errors.name?.message}
          />

          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Select
                placeholder="Categoria"
                value={value}
                onChange={onChange}
                error={errors.categoryId?.message}
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Select
                placeholder={isExpense ? "Pagar com" : "Receber com"}
                value={value}
                onChange={onChange}
                error={errors.bankAccountId?.message}
                options={accounts.map((account) => ({
                  value: account.id,
                  label: account.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { value, onChange } }) => (
              <DatePickerInput
                value={value}
                onChange={onChange}
                error={errors.date?.message}
              />
            )}
          />
        </section>

        <Button type="submit" className="mt-6 w-full" isLoading={isLoading}>
          Salvar
        </Button>
      </form>
    </Modal>
  );
}
