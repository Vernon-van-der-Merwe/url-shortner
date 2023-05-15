export default async function api(req, res) {
  const url = "https://2ech9xuwu0.execute-api.us-east-1.amazonaws.com/Prod/";
  let result = await fetch(url, {
    method: "GET",
    headers: {
      "X-Auth-Token": "yH0Im1q7X29wDOuPHyhwO3Liw4FFrDAk4g1VyHAm"
    }
  })
  res.status(500).json(result)
}
