import axios from "axios";

export default function handler(req, res) {
  const { urlString } = req.query;

  const options = {
    method: 'GET',
    url: urlString,
  };

  axios.request(options).then(function (response) {
    response = response.data;

    res.status(200).json({ success : true  , data : response});

  }).catch(function (error) {
    return res.status(200).json({ error , success : false });
  });

  return;
}

