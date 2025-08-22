import type { Transaction } from "@/app/entities/Transaction";
import { httpClient } from "../httpClient";

type TransactionsResponse = Array<Transaction>;

type TransactionsFilters = {
  month: number;
  year: number;
  banckAccountId?: string;
  type?: Transaction["type"];
};

export async function getAll(filters: TransactionsFilters) {
  const { data } = await httpClient.get<TransactionsResponse>("/transactions", {
    params: filters,
  });

  return data;
}
