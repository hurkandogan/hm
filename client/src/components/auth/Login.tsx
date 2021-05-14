import React, {useState} from 'react';

const Login = () => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogin = () => {}

    return (
        <main className="form-signin">
            <form method="submit">
                <h1>Thönnessen Erbengemeinschaft</h1>
                <h2 className="h3 mb-3 fw-normal">Please sign in</h2>
                <div className="form-floating">
                    <input type="text" className="form-control" id="username" name="username" placeholder="name@example.com" />
                        <label htmlFor="username">Username</label>
                    </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" />
                    <label htmlFor="password">Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit" onSubmit={handleLogin}>Sign in</button>
            </form>
        </main>
    );
}
export default Login;