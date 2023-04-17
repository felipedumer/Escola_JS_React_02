// Componentes
import React, { Fragment } from 'react';
import Header from '../../components/header';
import { Column, Section, Title, Container } from "rbx";
import { Link } from 'react-router-dom';

// Estilos
import presentationImage from '../../assets/images/presentation.png';
import '../../styles/home.scss'

const HomeScreen = () => (
  <Fragment>
    <Header/>
      <Section size="small" className="home">
          <Container>
              <Column.Group>
                  <Column size={5}>
                      <Title size={2} spaced className="has-text-white">
                          <br/>
                          Lembrafácil =)
                      </Title>
                      <Title size={5} spaced className="has-text-light" subtitle>
                          <br/>
                          Criando lembretes facilmente na nuvem onde quer que você esteja.
                          <br/>
                          <br/>
                          Seja no seu desktop, no seu notebook, no seu tablet ou no seu smartphone.
                          <br/>
                          <br/>
                          E o melhor, é totalmente GRÁTIS!
                      </Title>
                      <Link to="/register" className="button is-outlined is-white is-large">
                          <strong>Começar agora!</strong>
                      </Link>
                  </Column>
                  <Column size={6} offset={1}>
                    <img alt="Apresentação" src={presentationImage}/>
                  </Column>
              </Column.Group>
          </Container>
      </Section>
  </Fragment>
);

export default HomeScreen;