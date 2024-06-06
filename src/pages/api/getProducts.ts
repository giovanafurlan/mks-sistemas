import { NextApiRequest, NextApiResponse } from "next";
const axios = require("axios");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=50&sortBy=id&orderBy=ASC",
    headers: {},
  };

  axios
    .request(config)
    .then((response: { data: any }) => {
      res.status(200).json(response.data);
      console.log(JSON.stringify(response.data));
    })
    .catch((error: any) => {
      console.log(error);
    });
}
