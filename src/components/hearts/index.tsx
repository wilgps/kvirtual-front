import React from "react";

interface HeartsProps {
  num: number;
}

interface HeartsState {
  arr: [];
}
const style = {
  color: "#e30000",
  margin: "0 3px"
};

class Hearts extends React.Component<HeartsProps, HeartsState> {
 
  renderHeart = (): JSX.Element[] => {
    let items: JSX.Element[] = [];
    for (let index = 0; index < this.props.num; index++) {
      items.push(
        <React.Fragment key={index}>
          <span >
            <i className="fas fa-heart" style={style}></i>
          </span>
        </React.Fragment>
      );
    }
    return items;
  };
  render() {
    return <React.Fragment>{this.renderHeart()}</React.Fragment>;
  }
}

export default Hearts;
