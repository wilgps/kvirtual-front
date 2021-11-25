import React from "react";
import FooterComponent from "../../components/footer";
import HeaderComponent from "../../components/header";
interface DefaultThemeProps {}

interface DefaultThemeState {}

class DefaultTheme extends React.Component<
  DefaultThemeProps,
  DefaultThemeState
> {
  // constructor(props: DefaultThemeProps) {
  //   super(props);
  // }
  render() {
    return (
      <React.Fragment>
        <HeaderComponent />
        {this.props.children}
        <FooterComponent></FooterComponent>{" "}
      </React.Fragment>
    );
  }
}

export default DefaultTheme;
