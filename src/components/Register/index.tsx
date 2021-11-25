import React, { FormEvent } from "react";
import { IUser } from "../../models/user";
import api from "../../services/Api";

interface RegisterComponentProps {
  user?: IUser;
  finished?: () => void;
}

interface RegisterComponentState {
  Name: string;
  Email: string;
  Password: string;
  isInload: boolean;
  error: string;
}

class RegisterComponent extends React.Component<
  RegisterComponentProps,
  RegisterComponentState
> {
  isLoadedUser = false;
  constructor(props: RegisterComponentProps) {
    super(props);
    console.log(props);
    if (!!this.props.user?.Id) {
      this.setState({
        Name: this.props.user.Name,
        Email: this.props.user.Email,
        Password: this.props.user.Password,
      });
    } else
      this.state = {
        Name: "",
        Email: "",
        Password: "",
        isInload: false,
        error: "",
      };
  }

  handleRedirect = () => {
    this.props.finished?.call(null);
  };
  ValidateUser = (): boolean => {
    let isValid = true;
    let msg: string[] = [];

    if (!this.state.Name) {
      msg.push("O nome é obrigatorio.");
      isValid = isValid && false;
    }
    if (!this.state.Email) {
      isValid = isValid && false;
      msg.push("O e-mail é obrigatorio.");
    }

    if (!this.state.Password) {
      isValid = isValid && false;
      msg.push("O senha é obrigatorio.");
    } else {
      if (this.state.Password.length < 6) {
        msg.push("O senha deve ter pelo menos 6 caracters.");
        isValid = isValid && false;
      }
    }
    if (msg.length > 0) this.setState({ error: msg.join("<br/>") });
    return isValid;
  };

  handlerOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!this.ValidateUser()) return;

    try {
      this.setState({ isInload: true });
      await api.post("/user", this.createObject());
      this.handleRedirect();
    } catch (error: any) {
      if (error.response.data.message)
        this.setState({ error: error.response.data.message });
      else this.setState({ error: "Ocorreu um erro inesperado." });
    }
    this.setState({ isInload: true });
  };
  createObject = (): IUser => {
    let user: IUser = {
      Id: this.props.user?.Id,
      Name: this.state.Name,
      Email: this.state.Email,
      Password: this.state.Password,
    };
    return user;
  };
  componentDidUpdate = () => {
    if (!this.isLoadedUser && !!this.props.user?.Id) {
      this.isLoadedUser = true;
      this.setState({
        Name: this.props.user.Name,
        Email: this.props.user.Email,
        Password: this.props.user.Password,
      });
    }
  };
  render() {
    return (
      <form onSubmit={this.handlerOnSubmit}>
        <div className="row g-2">
          <div className="col-md-12">
            {this.state.error && (
              <p
                className="error-box"
                dangerouslySetInnerHTML={{ __html: this.state.error }}
              ></p>
            )}
          </div>
          <div className="col-md-12">
            <label htmlFor="txtEmail" className="form-label">
              Email
            </label>
            <input
              name={"email_" + (this.props.user?.Id ? "edit" : "create")}
              type="email"
              className="form-control"
              id="txtEmail"
              key="email"
              defaultValue={this.props.user?.Email}
              placeholder="name@example.com"
              onChange={(e) => {
                this.setState({ Email: e.target.value });
              }}
            />
          </div>
          <div className="col-12">
            <label htmlFor="txtNome" className="form-label">
              Nome
            </label>
            <input
              name={"nome_" + (this.props.user?.Id ? "edit" : "create")}
              type="text"
              className="form-control"
              id="txtNome"
              defaultValue={this.props.user?.Name}
              placeholder="Elesio da Silva"
              onChange={(e) => this.setState({ Name: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="txtPassword" className="form-label">
              Password
            </label>
            <input
              name={"senha_" + (this.props.user?.Id ? "edit" : "create")}
              type="password"
              className="form-control"
              id="txtPassword"
              defaultValue={this.props.user?.Password}
              onChange={(e) => this.setState({ Password: e.target.value })}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Salvar
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default RegisterComponent;
