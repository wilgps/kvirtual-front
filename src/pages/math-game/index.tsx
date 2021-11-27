import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Hearts from "../../components/hearts";
import PointService from "../../services/PointsService";
import "./index.css";

interface MathGameProps {}

interface MathGameState {
  Operator: string;
  number1: number;
  number2: number;
  points: number;
  result: number;
  lifes: number;
}

enum MathOperators {
  None = "",
  Addition = "+",
  Subtraction = "-",
  Division = "/",
  Mutiplication = "x",
}

class MathGame extends React.Component<MathGameProps, MathGameState> {
  GameName = "Math";
  Session: PointService;
  constructor(props: MathGameProps) {
    super(props);
    this.state = {
      Operator: "",
      number1: 0,
      number2: 0,
      points: 0,
      result: 0,
      lifes: 5,
    };
    this.Session = new PointService(this.GameName);
  }

  getRandonNumber = (seed: number): number => {
    let num = Math.floor(Math.random() * seed);
    if (this.state.Operator === "/" && num === 0) num = 1;
    return num;
  };
  generateNextOperation = () => {
    this.setState({
      number1: this.getRandonNumber(11),
      number2: this.getRandonNumber(11),
    });
  };

  listOperations = () => {
    return Object.values(MathOperators).filter((x) => !!x);
  };
  formartClassButtonOperation = (operation: string): string => {
    switch (operation) {
      case "+":
        return "outline-primary";
      case "-":
        return "outline-success";
      case "/":
        return "outline-warning";
      case "x":
        return "outline-danger";
      default:
        return "outline-danger";
    }
  };

  setCurrentOperator = (e: React.MouseEvent, operator: string) => {
    e.preventDefault();
    this.setState({ Operator: operator });
    this.generateNextOperation();
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
  handlerCalculate = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (this.CalculateResult()) {
      alert("Parabens você acertou");
      this.addPoint();
      this.generateNextOperation();
      this.setState({ result: 0 });
    } else {
      this.removeLifes();
      if (this.state.lifes > 1) alert("Resposta erra tente novamente.");
      else {
        alert("Acabaram suas vidas 😓;");
        this.finishGame();
      }
    }
  };
  finishGame = () => {
    this.resetLifes();
    this.setState({
      result: 0,
      points: 0,
      Operator: "",
      number1: 0,
      number2: 0,
    });
    this.Session = new PointService(this.GameName);
  };
  CalculateResult = (): boolean => {
    let result = 0;
    switch (this.state.Operator) {
      case "+":
        result = this.state.number1 + this.state.number2;
        break;
      case "-":
        result = this.state.number1 - this.state.number2;
        break;
      case "/":
        result = this.state.number1 / this.state.number2;
        break;
      case "x":
        result = this.state.number1 * this.state.number2;
        break;
      default:
        result = 0;
        break;
    }
    console.log("Resposta: " + result);
    console.log("Resposta esperada: " + this.state.result);
    console.log("Operador: "+ this.state.Operator);
    console.log("________________")
    return result === this.state.result;
  };

  render() {
    return (
      <React.Fragment>
        <div className="page">
          <div className="page-container register-container">
            <Container>
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
                  <div className="btn-operator-group">
                  Operações Matemática:
                    {this.listOperations().map((x, i) => (
                      <Button
                        key={i}
                        onClick={(e) => this.setCurrentOperator(e, x)}
                        variant={this.formartClassButtonOperation(x)}
                        className=""
                      >
                        {x}
                      </Button>
                    ))}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  {!!this.state.Operator && (
                    <Form
                      onSubmit={(e) => this.handlerCalculate(e)}
                      className="question-math"
                    >
                      {`${this.state.number1} ${this.state.Operator} ${this.state.number2} = `}
                      <Form.Control
                        type="number"
                        className="result-math"
                        onChange={(e) =>
                          this.setState({ result: Number(e.target.value) })
                        }
                      ></Form.Control>
                      <Button variant="success" type="submit">
                        Calcular
                      </Button>
                    </Form>
                  )}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default MathGame;
