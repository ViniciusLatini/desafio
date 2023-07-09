import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import './style.css'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const {login} = useContext(AuthContext);

  function signIn() {
    login(email, password) // .catch
    history.push("/");
  }

  return(
    <div className="login">
      <div className="boxLogin">
        <h1>Login</h1>
        <span className='subtitle'>Realize o login para manter seus games atualizados!</span>

        <div className="inputContainer">
          <span>E-mail</span>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="inputContainer">
          <span>Senha</span>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button className='buttonSubmit' onClick={signIn}>
          Confirmar Login
        </button>

        <div className="cadastroContent">
          <span>Não possui uma conta?</span>
          <Link to="/signup">
            <span>Cadastre-se</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login;