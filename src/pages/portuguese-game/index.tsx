import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { Row, Container, Col, Button } from "react-bootstrap";
import Hearts from "../../components/hearts";
import { IVerb } from "../../models/verbs";
import api from "../../services/Api";
import PointService from "../../services/PointsService";
import "./index.css";
interface PortugueseGameProps {}

interface PortugueseGameState {
  verbs: IVerb[];
  points: number;
  lifes: number;
  currentVerb: string[];
  currentVerbAnswer: string;
  usedVerb: number[];
}

class PortugueseGame extends React.Component<
  PortugueseGameProps,
  PortugueseGameState
> {
  /**
   *
   */
  constructor(props: PortugueseGameProps) {
    super(props);
    this.state = {
      verbs: [],
      points: 0,
      lifes: 5,
      currentVerb: [],
      currentVerbAnswer: "",
      usedVerb: [],
    };
    this.Session = new PointService(this.GameName);
  }
  GameName = "Portuguese";
  Session: PointService;
  componentDidMount = () => {
    this.getVerbs();
  };

  shotVerb = (verb: string) => {
    var a = verb.split(""),
      n = a.length;

    for (var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a.join("");
  };

  setRandomVerb = () => {
    let nums = [];
    for (let k = 0; k < this.state.verbs.length; k++) {
      if (this.state.usedVerb.indexOf(k) < 0) nums.push(k);
    }
    const idx = Math.floor(Math.random() * nums.length);
    this.setState({
      currentVerbAnswer: this.state.verbs[idx].Verb,
      currentVerb: Array.from(this.shotVerb(this.state.verbs[idx].Verb)),
    });
  };

  getVerbs = async () => {
    try {
      const response = await api.get("/verb");
      this.setState({ verbs: response.data });
    } catch (error) {
      alert("Erro ao obter a listagem das palavras. Recarregue a Pagina");
    }
  };
  resetLifes = () => {
    this.setState({ lifes: 5 });
  };
  removeLifes = () => {
    this.setState({ lifes: this.state.lifes - 1 });
  };
  addPoint = () => {
    this.Session.SavePoints(this.state.points + 1);
    this.setState({ points: this.state.points + 1 });    
  };
  startGame = () => {
    this.resetLifes();
    this.setState({
      usedVerb: [],
      currentVerbAnswer: "",
      currentVerb: [],
    });
    this.Session = new PointService(this.GameName);
    this.setRandomVerb();
  };
  finishGame = () => {
    this.resetLifes();
    this.setState({
      usedVerb: [],
      currentVerbAnswer: "",
      currentVerb: [],
    });
    this.Session = new PointService(this.GameName);
  };

  nextVerb = () => {
    this.setRandomVerb();
  };

  reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const items = this.reorder(
      this.state.currentVerb,
      result.source.index,
      result.destination.index
    );

    this.setState({ currentVerb: items });
  };
  handleCheckVerb = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (this.state.currentVerb.join("") === this.state.currentVerbAnswer) {
      this.addPoint();
      this.nextVerb();
    } else {
      this.removeLifes();
      if (this.state.lifes > 1) alert("Resposta erra tente novamente.");
      else {
        alert("Acabaram suas vidas 😓;");
        this.finishGame();
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="page">
          <div className="page-container register-container">
            <Container>
              {this.state.currentVerb.length === 0 && (
                <Row>
                  <Col md={12}>
                    Clique em começar para iniciar o jogo.
                    <br />
                    <Button variant="primary" onClick={(e) => this.startGame()}>
                      Começar
                    </Button>
                  </Col>
                </Row>
              )}
              {this.state.currentVerb.length !== 0 && (
                <Row>
                  <Col md={12}>
                    <span>
                      Vidas:
                      <Hearts num={this.state.lifes} />{" "}
                    </span>
                    <br />
                    <br />
                    <span>Pontos: {this.state.points}</span>
                    <br />
                    <br />
                    <fieldset className="phrase-game">
                      <legend>Coloque a palavra em ordem</legend>

                      <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable
                          droppableId="usedVerb"
                          direction="horizontal"
                        >
                          {(provided) => (
                            <div
                              className="letters"
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              {this.state.currentVerb.map(
                                (item, index: any) => {
                                  return (
                                    <Draggable
                                      key={index}
                                      draggableId={item + "_" + index}
                                      index={index}
                                    >
                                      {(provided, snapshot) => (
                                        <span
                                          className="item"
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          {item}
                                        </span>
                                      )}
                                    </Draggable>
                                  );
                                }
                              )}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>

                      <br />
                      <br />
                      <Button
                        variant="outline-success"
                        onClick={this.handleCheckVerb}
                      >
                        Checar
                      </Button>
                    </fieldset>
                  </Col>
                </Row>
              )}
            </Container>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PortugueseGame;
