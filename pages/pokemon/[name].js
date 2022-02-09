import Head from "next/head";
import { Col, Container, Row } from "react-bootstrap";
import pokemon from "../../pokemon.json";
export async function getStaticPaths() {
  const paths = pokemon.map(({ name: { english } }) => ({
    params: { name: english },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const data = pokemon.find(
    ({ name: { english } }) => english === context.params.name
  );
  return {
    props: { data },
  };
}

const PokemonDetail = ({ data }) => {
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
export default PokemonDetail;
