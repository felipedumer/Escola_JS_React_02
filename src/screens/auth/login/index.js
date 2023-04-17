import React, { Fragment } from "react";
import Header from "../../../components/header";
import { Column, Section, Title, Container, Card} from "rbx";
import logoImage from '../../../assets/images/logo_no_name_color.png';
import "../../../styles/auth.scss";
import LoginForm from '../../../components/auth/login_form';

const LoginScreen = () => (
    <Fragment>
        <Header/>
        <Section size="small" className="auth">
            <Container>
                <Column.Group centered>
                    <Column size={4}>
                        <Card>
                            <Card.Content>
                                <Section size={"small"}>
                                    <Column.Group centered={true}>
                                        <Column size={4}>
                                            <img alt="logo" src={logoImage}/>
                                        </Column>
                                    </Column.Group>

                                    <Column.Group centered={true}>
                                        <Column size={12}>
                                            <Title size={6} className="has-text-grey has-text-centered">
                                                Suas anotações na nuvem
                                            </Title>
                                        </Column>
                                    </Column.Group>
                                    <LoginForm/>
                                </Section>

                            </Card.Content>
                        </Card>
                    </Column>
                </Column.Group>
            </Container>
        </Section>
    </Fragment>
);

export default LoginScreen;