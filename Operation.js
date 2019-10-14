import React, { Component } from "react";
import {
  TouchableOpacity,
  TouchableHighlight,
  Text,
  StyleSheet
} from "react-native";

class Operation extends Component {
  state = {
    backgroundColor: "rgb(248, 180, 53)",
    modBack: "rgb(225, 229, 233)",
    modCheck: false,
    textColor: "white"
  };

  render() {
    if (this.props.operator === "%") {
      return (
        <TouchableHighlight
          onPress={() => this.props.onPress(this.props.operator)}
          style={{
            alignItems: "center",
            backgroundColor: this.state.modBack,
            borderRadius: 80,
            height: 90,
            width: 90,
            // padding: 5,
            paddingTop: 15,
            margin: 5
          }}
          onHideUnderlay={() => {
            this.setState({ modBack: "rgb(225, 229, 233)" });
          }}
          onShowUnderlay={() => {
            this.setState({ modBack: "rgb(250, 250, 250)" });
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: 50
            }}
          >
            {this.props.operator}
          </Text>
        </TouchableHighlight>
      );
    }
    return (
      <TouchableHighlight
        onPress={() => this.props.onPress(this.props.operator)}
        style={{
          alignItems: "center",
          backgroundColor: this.props.class,
          borderRadius: 80,
          height: 90,
          width: 90,
          // padding: 5,
          paddingTop: 15,
          margin: 5
        }}
        onHideUnderlay={() => {
          this.setState({ backgroundColor: "rgb(248, 180, 53)" });
        }}
        onShowUnderlay={() => {
          this.setState({ backgroundColor: "white" });
        }}
      >
        <Text
          style={{
            color: this.props.class === "white" ? "rgb(248, 180, 53)" : "white",
            fontWeight: "bold",
            fontSize: 50
          }}
        >
          {this.props.operator}
        </Text>
      </TouchableHighlight>
    );
  }
}
// const styles = StyleSheet.create({
//   mod: {
//     alignItems: "center",
//     backgroundColor: "rgb(225, 229, 233)",
//     borderRadius: 80,
//     height: 30,
//     width: 30,
//     padding: 5,
//     margin: 5
//   }
// });

export default Operation;
