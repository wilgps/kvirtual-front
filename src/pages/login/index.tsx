import React, { FormEvent, Fragment } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-dom";
import Api from "../../services/Api";
import { login } from "../../services/Auth";
import "./index.css";

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
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  handleRedirect = () => {
    const { location, history } = this.props;
    let url = "/";
    if (location.state?.from) url = location.state.from;
    history.push(url);
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

  render() {
    return (
      <Fragment>
        <div className="signin-container">
          <form className="form-signin" onSubmit={this.handleSignIn}>
            <img alt="Logo" />
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
              </div>
              <div className="col-md-12">
                <button className="btn-primary " type="submit">
                  Entrar
                </button>
                <hr />
                <Link to="/signup">Criar conta grátis</Link>
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(Login);
