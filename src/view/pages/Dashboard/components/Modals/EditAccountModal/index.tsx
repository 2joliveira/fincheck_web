import {
  Button,
  ColorsDropdownInput,
  Input,
  InputCurrency,
  Modal,
  Select,
} from "@/view/components";
import { Controller } from "react-hook-form";
import { useEditAccountController } from "./useEditAccountController";
import { TrashIcon } from "@/view/components/icons/TrashIcon";
import { ConfirmDeleteModal } from "@/view/components/ConfirmDeleteModal";

export function EditAccountModal() {
  const {
    isEditAccountModalOpen,
    handleCloseEditAccountModal,
    register,
    control,
    handleSubmit,
    errors,
    isLoading,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    isDeleteModalOpen,
    handleDeleteAccount,
    isLoadingDelete,
  } = useEditAccountController();

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        title="Tem certeza que deseja excluir esta conta ?"
        description="Ao excluir essa conta, todos todos os registros de receita e despesa relacionados também serão excluídos"
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteAccount}
        isLoading={isLoadingDelete}
      />
    );
  }

  return (
    <Modal
      title="Editar Conta"
      open={isEditAccountModalOpen}
      onClose={handleCloseEditAccountModal}
      rightAction={
        <button
          onClick={handleOpenDeleteModal}
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full outline-none hover:bg-gray-100"
        >
          <TrashIcon className="h-5 w-5 text-red-900" />
        </button>
      }
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

          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Tipo"
                options={[
                  { value: "INVESTMENT", label: "Investimentos" },
                  { value: "CHECKING", label: "Conta Corrente" },
                  { value: "CASH", label: "Dinheiro Físico" },
                ]}
                error={errors.type?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                error={errors.color?.message}
                onChange={onChange}
                value={value}
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
