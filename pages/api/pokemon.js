import pokemon from "../../pokemon.json";

export default (req, res) => {
  if (!req.query.name) {
    res.statusCode = 400;
    res.send("Must have name!");
  } else {
    const found = pokemon.find(
      ({ name: { english } }) => english === req.query.name
    );
    console.log({ found });
    if (!found) {
      res.statusCode = 404;
      res.send("Not found!");
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(found));
    }
  }
};
