import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import './style.css'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const {login, cadastro} = useContext(AuthContext);

  async function signIn(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      await login(email, password);
      history.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  }

  async function signUp() {
    try {
      await cadastro(email, password);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <div className="login">
      <div className="boxLogin">
        <h1>Login</h1>
        <span className='subtitle'>Realize o login para manter seus games atualizados!</span>

        <form action="" onSubmit={ (e : React.SyntheticEvent) => signIn(e)}>
          <div className="inputContainer">
            <span>E-mail</span>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="inputContainer">
            <span>Senha</span>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type='submit' className='buttonSubmit'>
            Confirmar Login
          </button>
        </form>

        {error === 'auth/user-not-found' && (
          <div className="infoContent">
            <span>Credenciais inválidas!</span>
            <button type='button' onClick={signUp}>
              Clique aqui para criar uma nova conta com essas credencias!
            </button>
          </div>
        )}


      </div>
    </div>
  )
}

export default Login;