// shared/helpers/transformDealsData.ts
import type {IDeal, ITransformedDeal} from "../types/deals.types";

export function transformDealsData(data: IDeal[]): ITransformedDeal {
  if (!data || data.length === 0) {
    return {
      new: [],
      talk: [],
      done: [],
      cancel: [],
    };
  }

  const result = {
    new: data.filter((deal) => deal.stage === "Новые"),
    talk: data.filter((deal) => deal.stage === "Переговоры"),
    done: data.filter((deal) => deal.stage === "Выполнено"),
    cancel: data.filter((deal) => deal.stage === "Отменено"),
  };

  return result;
}
