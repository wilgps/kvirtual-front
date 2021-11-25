import { IRanking } from "../models/Ranking";
import Api from "./Api";

export const GetRanking = async (game: string): Promise<IRanking[]> => {
  try {
    const response = await Api.get("points?game=" + game);
    const data = response.data as IRanking[];
    if (data.length > 0)
      for (let i = 0; i < data.length; i++) {
        data[i].Date = new Date(data[i].updatedAt);
      }

    return data;
  } catch (error) {
    throw error;
  }
};
