import Api from "./Api";
export default class PointService {
  /**
   *
   */
  constructor(game: string) {
    this.GameName = game;
  }
  private GameName: string;
  private Id?: Number;
  SavePoints = async (points: number) => {
    try {
      const response = await Api.post("points", {
        GameName: this.GameName,
        Points: points,
        Id: this.Id,
      });
      if (!this.Id) this.Id = response.data.Id;
    } catch (error) {
      throw error;
    }
  };
}
