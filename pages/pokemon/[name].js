import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";

const getPokemon = async (filter) => {
  const pokemonName = filter.queryKey[1];
  const { data } = await axios.get(`/api/pokemon?name=${pokemonName}`);
  return data;
};

export default () => {
  const router = useRouter();
  const { data } = useQuery(["name", router.query.name], getPokemon);
  return (
    <div>
      <Head>
        <title>{data && data.name.english}</title>
      </Head>
      <Container>
        {data && (
          <>
            <h1>{data.name.english}</h1>
            <Row>
              <Col xs={4}>
                <img
                  src={`/pokemon/${data.name.english
                    .toLowerCase()
                    .replace(" ", "-")}.jpg`}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col xs={8}>
                {Object.entries(data.base).map(([key, value]) => (
                  <Row key={key}>
                    <Col xs={2}>{key}</Col>
                    <Col xs={10}>{value}</Col>
                  </Row>
                ))}
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};
