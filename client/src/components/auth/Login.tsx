import React, { useState } from 'react';
import AuthService from '../../services/authorization/auth.service';

const Login = () => {

    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const INITIAL_USER_DATA = {
        mail: "",
        password: ""
    }

    const [userData, setUserData] = useState(INITIAL_USER_DATA);
    
    const changeHandler = (event) => {
        const { name, value } = event.target;
        setUserData(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }
    
    const handleLogin = async (e) => {
        await e.preventDefault();
        setLoading(true);
        setButtonDisabled(true);
        await AuthService.signin(userData)
            .catch(error => console.log(error));
        setUserData(INITIAL_USER_DATA);
        setLoading(false);
        setButtonDisabled(false);
        window.location.reload();
    }

    return (
        <main className="form-signin">
            <form onSubmit={handleLogin}>
                <h1>Thönnessen Erbengemeinschaft</h1>
                <h2 className="h3 mb-3 fw-normal">Please sign in</h2>
                <div className="form-floating">
                    <input type="email"
                        className="form-control"
                        id="mail"
                        name="mail"
                        placeholder="name@example.com"
                        onChange={changeHandler}
                        autoComplete="disabled"
                    />
                        <label htmlFor="username">Username</label>
                    </div>
                <div className="form-floating">
                    <input type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Password"
                        onChange={changeHandler}
                        autoComplete="disabled"
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary"
                    type="submit"
                    onSubmit={handleLogin}
                    disabled={buttonDisabled}>
                    Log in
                    {loading && (
                        <div className="spinner-border text-light" role="status">
                            <span className="sr-only"></span>
                        </div>
                    )}
                    
                </button>
            </form>
        </main>
    );
}
export default Login;