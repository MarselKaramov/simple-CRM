export interface IDeal {
  id: number;
  title: string;
  description: string;
  budget: number;
  priority: string;
  client_id: number;
  expected_close_date: Date;
  stage: string;
}

export interface ITransformedDeal {
  new: IDeal[];
  talk: IDeal[];
  done: IDeal[];
  cancel: IDeal[];
}
