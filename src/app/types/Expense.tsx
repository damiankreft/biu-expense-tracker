export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  description: string;
}

export const categories = [
  "jedzenie",
  "transport",
  "rozrywka",
  "zakupy",
  "usługi",
  "rachunki",
  "zdrowie",
  "edukacja",
  "podróże",
  "dom",
  "technologia",
  "sport",
  "kultura",
  "dzieci",
  "zwierzęta",
  "hobby",
  "finanse",
  "praca",
  "społeczność",
  "wydarzenia",
  "inne",
] as const;