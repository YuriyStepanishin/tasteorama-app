export interface Recipe {
  _id: string;
  title: string;
  description: string;
  time: string;
  category: string;
  thumb: string;
  cals?: number;
}
