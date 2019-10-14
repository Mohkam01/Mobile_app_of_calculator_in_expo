import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

class Button extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    pressStatus: false,
    backgroundColor: "grey"
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPress(this.props.number)}
        style={styles.button}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 50
          }}
        >
          {this.props.number}
        </Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "grey",
    borderRadius: 80,
    height: 90,
    width: 90,
    // padding: 5,
    paddingTop: 15,
    margin: 5
  }
});
export default Button;
