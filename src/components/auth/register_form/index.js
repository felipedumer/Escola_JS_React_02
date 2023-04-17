import React, { Fragment, useState } from 'react';
import { Button, Field, Control, Input, Column, Help, Label } from 'rbx';
import { Redirect } from 'react-router-dom';
import UsersService from "../../../services/users";

function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            await UsersService.register({name: name, email: email, password: password});
            setRedirectToLogin(true);
        } catch (e) {
            setError(true);
        }
    }

    if(redirectToLogin) {
        return <Redirect to={{pathname: "login"}}/>
    }

    return (
        <Fragment>
            <Column.Group centered={true}>
                <form onSubmit={handleSubmit}>
                    <Column size={12}>
                        <Field>
                            <Label size="small">Nome:</Label>
                            <Control>
                                <Input
                                    type="name"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </Control>
                        </Field>
                        <Field>
                            <Label size="small">Email:</Label>
                            <Control>
                                <Input
                                    type="email"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Control>
                        </Field>
                        <Field>
                            <Label size="small">Senha:</Label>
                            <Control>
                                <Input
                                    type="password"
                                    required
                                    name="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Control>
                        </Field>
                        <Field>
                            <Control>
                                <Column.Group breakpoint="mobile">
                                    <div>{/*<Column>
                                        <Button color="custom-purple" outlined
                                                onClick={e => setRedirectToLogin(true)}
                                        >Login</Button>
                                        </Column>
                                                                            <Column>
                                        <Button type="submit" color="custom-purple" outlined>Register</Button>
                                    </Column>*/}</div>
                                    <Column>
                                        <Button type="submit" color="custom-purple" outlined>Cadastrar</Button>
                                    </Column>
                                    <Column>
                                        <Button className="button is-white has-text-custom-purple"
                                           onClick={e => setRedirectToLogin(true)}>Entrar</Button>
                                    </Column>
                                </Column.Group>
                            </Control>
                            { error && <Help color={"danger"}>Email ou senha inválidos.</Help> }
                        </Field>
                    </Column>
                </form>
            </Column.Group>
        </Fragment>
    );
}
export default RegisterForm;