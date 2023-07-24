import React, { useState } from "react";
import {
    Button,
    ContentContainer,
    ErrorText,
    Form,
    Input,
    OverlayContainer,
} from "./index.styled";
import { login, signup } from "../../../services/auth";

export const LS_USER_ID = "LS_USER_ID";
export const LS_USER_NAME = "LS_USER_NAME";

const OverlayLoginSignupPage = ({ onClose }) => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginError, setLoginError] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [signUpError, setSignupError] = useState("");
    const [signUpName, setSignupName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await login(loginEmail, loginPassword);
        if (res.status === "success") {
            localStorage.setItem(LS_USER_ID, res.data._id);
            localStorage.setItem(LS_USER_NAME, res.data.name);
            onClose();
        } else {
            setLoginError(res.message);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        const res = await signup(signUpName, signupEmail, signupPassword);
        if (res.status === "success") {
            localStorage.setItem(LS_USER_ID, res.data._id);
            localStorage.setItem(LS_USER_NAME, res.data.name);
            onClose();
        } else {
            setSignupError(res.message);
        }
    };

    return (
        <OverlayContainer>
            <ContentContainer>
                <h2 className="heading">Login</h2>
                <Form onSubmit={handleLogin}>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    {loginError && <ErrorText>{loginError}</ErrorText>}
                    <Button type="submit">Login</Button>
                </Form>
                <h2 className="heading">Sign Up</h2>
                <Form onSubmit={handleSignup}>
                    <Input
                        type="name"
                        placeholder="Name"
                        value={signUpName}
                        onChange={(e) => setSignupName(e.target.value)}
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                    />
                    {signUpError && <ErrorText>{signUpError}</ErrorText>}
                    <Button type="submit">Sign Up</Button>
                </Form>
            </ContentContainer>
        </OverlayContainer>
    );
};

export default OverlayLoginSignupPage;
