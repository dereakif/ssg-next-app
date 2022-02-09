import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const getPokemon = async (filter) => {
  const pokemonName = filter.queryKey[1];
  const { data } = await axios.get(`/api/pokemon?name=${pokemonName}`);
  return data;
};

export default () => {
  const router = useRouter();
  const { data } = useQuery(["name", router.query.name], getPokemon);
  return <div>{data && <div>{data.id}</div>}</div>;
};
