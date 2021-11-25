import React, { FormEvent } from "react";
import { Form, Button } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router";
import { IVerb } from "../../models/verbs";
import api from "../../services/Api";
import { isAdmin } from "../../services/Auth";
import "./index.css";

interface AdminProps extends RouteComponentProps {}

interface AdminState {
  verb: string;
  verbId?: number;
  verbs: IVerb[];
}

class Admin extends React.Component<AdminProps, AdminState> {
  constructor(props: AdminProps) {
    super(props);
    this.state = { verb: "", verbs: [] };
  }

  componentDidMount = () => {
    this.verifyAcess();
  };

  getVerbs = async () => {
    try {
      const response = await api.get("/verb");
      this.setState({ verbs: response.data });
    } catch (error) {
      alert("Erro ao obter a listagem das palavras.");
    }
  };

  verifyAcess = () => {
    if (!isAdmin) {
      alert("Apenas administradores podem acessar essa pagina");
      this.props.history.push("/");
    } else {
      this.getVerbs();
    }
  };
  editVerb = (verb: IVerb) => {
    const verbs = this.state.verbs.filter((x) => x.Verb !== verb.Verb);
    this.setState({ verbs, verbId: verb.Id, verb: verb.Verb });
  };

  removeVerb = (verb: IVerb) => {
    const verbs = this.state.verbs.filter((x) => x.Verb !== verb.Verb);
    this.setState({ verbs });
  };

  addVerb = (e: FormEvent) => {
    e.preventDefault();
    if (
      !!this.state.verb &&
      this.state.verbs.filter(
        (x: IVerb) => x.Verb.toLocaleLowerCase().trim() === this.state.verb.trim()
      ).length === 0
    ) {
      const verbs = this.state.verbs;
      verbs.push({ Id: this.state.verbId, Verb: this.state.verb.trim() });
      this.setState({ verbs, verbId: undefined, verb: "" });
    }
  };
  handlerSalveVerbs = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await api.post("/verb", this.state.verbs);
      alert("Dados salvos com sucesso");
      this.getVerbs();
    } catch (error) {
      console.log(error);
      alert("Erro ao salvar.");
    }
  };
  render() {
    return (
      <div className="page">
        <div className="page-container register-container">
          <div className="container">
            <div className="verbs">
              <fieldset>
                <legend>Jogo de palavras</legend>
                <div className="row">
                  <div className="col-12">
                    <Button
                      variant="primary"
                      className="mb-3"
                      onClick={this.handlerSalveVerbs}
                    >
                      Salvar
                    </Button>
                  </div>
                  <div className="col-12">
                    <Form onSubmit={this.addVerb}>
                      <div className="row mb-3">
                        <div className="col-8">
                          <Form.Control
                            value={this.state.verb}
                            placeholder="Palavra"
                            onChange={(x) =>
                              this.setState({ verb: x.target.value })
                            }
                          ></Form.Control>
                        </div>
                        <div className="col-3">
                          <Button type="submit" variant="outline-success">
                            Adicionar
                          </Button>
                        </div>
                      </div>
                    </Form>
                  </div>
                  {this.state.verbs.map((x, i) => (
                    <React.Fragment key={i}>
                      <div className="col-4 scroll-x mb-3">{x.Verb}</div>
                      <div className="col-2 mb-3">
                        <Button
                          variant="outline-success"
                          onClick={(e) => this.editVerb(x)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </Button>
                        {"  "}
                        <Button
                          variant="outline-danger"
                          onClick={(e) => this.removeVerb(x)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Admin);
