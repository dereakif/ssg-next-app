import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { Card, Col, Container, FormControl, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import styles from "../styles/Home.module.css";

const getPokemon = async (filter) => {
  const pokemonName = filter.queryKey[1];
  const { data } = await axios.get(`/api/search?q=${pokemonName}`);
  return data.map((pokemon) => ({
    ...pokemon,
    image: `/pokemon/${pokemon.name.english
      .toLowerCase()
      .replace(" ", "-")}.jpg`,
  }));
};
export default function Home() {
  const [query, setQuery] = useState("");
  const { data } = useQuery(["q", query], getPokemon);
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <FormControl
          placeholder="search"
          aria-label="Search"
          value={query}
          onChange={(evt) => setQuery(evt.target.value)}
        />
        {data && (
          <Row>
            {data.map(({ id, name, type, image }) => (
              <Col xs={4} key={id} style={{ padding: 5 }}>
                <Card>
                  <Card.Img
                    variant="top"
                    style={{ maxHeight: 300 }}
                    src={image}
                  />
                  <Card.Body>
                    <Card.Title>{name.english}</Card.Title>
                    <Card.Subtitle>{type.join(", ")}</Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}
