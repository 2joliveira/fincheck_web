import { httpClient } from "../httpClient";

type BankAccountResponse = Array<{
  id: string;
  name: string;
  initialBalance: number;
  color: string;
  type: "CHECKING" | "INVESTMENT" | "CASH";
  currentBalance: number;
}>;

export async function getAll() {
  const { data } = await httpClient.get<BankAccountResponse>("/bank-accounts");

  return data;
}
