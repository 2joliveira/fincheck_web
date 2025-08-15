import { httpClient } from "../httpClient";

export interface CreateParams {
  name: string;
  initialBalance: string;
  color: string;
  type: "CHECKING" | "INVESTMENT" | "CASH";
}

export async function create(params: CreateParams) {
  const { data } = await httpClient.post("/bank-accounts", params);

  return data;
}
