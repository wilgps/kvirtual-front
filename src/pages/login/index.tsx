import React, { FormEvent, Fragment } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-dom";
import Api from "../../services/Api";
import { login } from "../../services/Auth";
import "./index.css";
import logo from "../../assets/img/logo.jpeg";
import { Button, Form, Modal } from "react-bootstrap";
import api from "../../services/Api";

interface LoginProps extends RouteComponentProps {
  location: {
    pathname: string;
    search: string;
    state: { from: string };
    hash: string;
    key?: string | undefined;
  };
}

interface LoginState {
  email: string;
  password: string;
  error: string;
  modalLostPassword: boolean;
  alert: string;
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      modalLostPassword: false,
      alert: "",
    };
  }

  handleRedirect = () => {
    const { location, history } = this.props;
    let url = "/";
    if (location.state?.from) url = location.state.from;
    history.push(url);
  };
  handleShowLostPassword = () => {
    this.setState({ modalLostPassword: true });
  };
  handlerLostPassword = async (
    e: React.FormEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      await api.get("password?email=" + this.state.email);
      this.setState({
        error: "",
        alert: "sua senha foi enviada para seu email, caso seu email exista.",
      });
    } catch (error) {
      this.setState({ error: "Erro ao enviar o email." });
    }
  };
  handleSignIn = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const { email, password } = this.state;
    if (!email) {
      alert("O Email é obrigatorio.");
      return;
    } else if (!password) {
      alert("Senha é obrigatoria.");
      return;
    }
    try {
      let response = await Api.post("/auth", { email, password });
      login(response.data.token, response.data.scope as string);
      this.handleRedirect();
    } catch (error: any) {
      if (error.response.data.message)
        this.setState({ error: error.response.data.message });
      else this.setState({ error: "Ocorreu um erro inesperado." });
    }
  };
  handleCloseModal = () => {
    this.setState({ alert: "", modalLostPassword: false });
  };
  render() {
    return (
      <Fragment>
        <Modal
          show={this.state.modalLostPassword}
          onHide={() => this.handleCloseModal()}
        >
          <Modal.Header closeButton>
            <Modal.Title>Recuperação de senha</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.alert && <p className="warning">{this.state.alert}</p>}
            <Form>
              <Form.Group>
                <Form.Label htmlFor="txtLostPassword">
                  Informe seu email
                </Form.Label>
                <Form.Control
                  onChange={(e) => this.setState({ email: e.target.value })}
                  type="email"
                  id="txtLostPassword"
                ></Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={(e) => this.handleCloseModal()}
            >
              Close
            </Button>
            <Button variant="primary" onClick={this.handlerLostPassword}>
              Enviar
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="signin-container">
          <form className="form-signin" onSubmit={this.handleSignIn}>
            <img alt="Logo" src={logo} />
            {this.state.error && <p>{this.state.error}</p>}
            <div className="row g-2">
              <div className="col-md-12">
                <label className="form-label" htmlFor="txtEmail">
                  Endereço de e-mail
                </label>
                <input
                  required
                  id="txtEmail"
                  type="email"
                  name="txtEmail"
                  placeholder="Endereço de e-mail"
                  className="form-control"
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="txtSenha" className="form-label">
                  Senha
                </label>
                <input
                  name="txtSenha"
                  id="txtSenha"
                  required
                  className="form-control"
                  type="password"
                  placeholder="Senha"
                  onChange={(e) => this.setState({ password: e.target.value })}
                />

                <button
                  type="button"
                  className="link"
                  onClick={(e) => this.setState({ modalLostPassword: true })}
                >
                  Esqueceu sua senha?
                </button>
              </div>
              <div className="col-md-12">
                <button className="btn-primary " type="submit">
                  Entrar
                </button>
                <hr />
                <div className="container-form-btn">
                  <div className="wrap-form-btn">
                    <div className="form-bgbtn"></div>
                    <Link to="/signup" className="btn-color">
                      Criar conta grátis
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(Login);
