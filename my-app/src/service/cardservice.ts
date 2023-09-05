import axios from "axios";
import { Card } from "../model/model";

axios.defaults.baseURL = "http://localhost:5000/";

export const cardService = {
  findAllCards: async (name: String): Promise<Card[]> => {
    const response = await axios.get(`password-cards?name=${name}`);
    return response.data;
  },

  persistCard: async (card: Card): Promise<void> => {
    await axios.post("password-cards", card);
  },

  deleteCard: async(id: Number): Promise<void> => {
    await axios.delete(`password-cards/${id}`);
  },
};
