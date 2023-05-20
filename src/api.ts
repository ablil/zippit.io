import axios from "axios";

interface ZippitAPI {
  shorten: (url: string) => Promise<string>;
  getHits: (identifier: string) => Promise<number>;
}

export default function getZippitApi(): ZippitAPI {
  return {
    shorten: async (url) => {
      const {
        data: { identifier },
      } = await axios.post("/api/generate", { url });
      return identifier;
    },
    getHits: async (identifier: string) => {
      const {
        data: { hits },
      } = await axios.get(`/api/hits/${identifier}`);
      return hits;
    },
  };
}
