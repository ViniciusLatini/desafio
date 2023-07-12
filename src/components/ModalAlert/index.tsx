import { Backdrop, Fade, Modal } from '@mui/material';
import styled from '@emotion/styled';

import './style.css';
import { useHistory } from 'react-router-dom';

interface ModalAlertProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

function ModalAlert({open, setOpen} : ModalAlertProps) {
  const history = useHistory();
  const handleClose = () => setOpen(false);

  return(
    <StyledModal
      open={open}
      onClose={handleClose}
      slots={{ backdrop: StyledBackdrop }}
      keepMounted
    >
      <Fade in={open}>
        <div className='box'>
          <h1>Acesso negado!</h1>
          <span>Para realizar essa operação você precisa estar logado</span>

          <div>
            <button onClick={() => history.push('/auth')}>
              Logar
            </button>
            <button type='button' onClick={handleClose}>
              Cancelar
            </button>
          </div>

        </div>
      </Fade>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

export default ModalAlert