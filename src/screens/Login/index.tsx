import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

import { AuthContext } from '../../context/AuthContext';
import './style.css'
import ModalAlert from '../../components/ModalAlert';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");

  const history = useHistory();

  const {login, cadastro} = useContext(AuthContext);

  async function signIn(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      await login(email, password);
      history.push("/");
    } catch (error: any) {
      console.log(error);

      if(error.message === 'auth/user-not-found') {
        setMessage('Falha na autenticação')
        setDescription('Credenciais inválidas, caso não tenha uma conta preencha os campos e cadastre-se!')
      } else {
        setMessage('Houve um erro inesperado')
        setDescription('Não foi possível efetuar o login, tente mais tarde!')
      }
      setOpen(true);

    }
  }

  async function signUp() {
    try {
      await cadastro(email, password);
      history.push("/");
    } catch (error: any) {
      console.log(error.message);
      if(error.message === 'auth/invalid-email') {
        setMessage('Email inválido')
        setDescription('Utilize um email válido para realizar o cadastro')
      } else if(error.message === 'auth/missing-password') {
        setMessage('Senha inválida')
        setDescription('Preencha o campo senha para realizar o cadastro')
      } else if(error.message === 'auth/weak-password'){
        setMessage('Senha inválida')
        setDescription('Sua senha precisa ter no mínimo 6 caracters')
      } else if(error.message === 'auth/email-already-in-use') {
        setMessage('Email já utilizado')
        setDescription('Esse e-mail já está cadastrado')
      } else {
        setMessage('Houve um erro inesperado')
        setDescription('Não foi possível efetuar o login, tente mais tarde!')
      }
      setOpen(true);
    }
  }

  return(
    <div className="login">
      <div className="boxLogin">
        <div className='header'>
          <button className='buttonBack' onClick={() => {history.goBack()}}>
            <ArrowBack />
          </button>
          <h1>Login</h1>
        </div>
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

        <div className="infoContent">
          <span>Não possui uma conta?</span>
          <span>
            Digite seu email e senha e confirme no botão abaixo!
          </span>
          <button type='button' onClick={signUp}>
            Cadastre-se
          </button>
        </div>

        <ModalAlert
          error={true}
          open={open}
          setOpen={setOpen}
          title={message}
          description={description}
        />

      </div>
    </div>
  )
}

export default Login;