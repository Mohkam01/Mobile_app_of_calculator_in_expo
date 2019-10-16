import React, { Component } from "react";
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity
} from "react-native";
import Digit from "./Digit";
import Operation from "./Operation";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorScreen: "",
      ACback: "rgb(225, 229, 233)",
      negateBack: "rgb(225, 229, 233)",
      equalBack: "rgb(248, 180, 53)",
      integer1: 0,
      integer2: null,
      operator: "",
      mod_operator: "",
      int1_check: false,
      int2_check: false,
      int2_value_check: false,
      again_operator: "",
      again_cal_int2: 0,
      again_int1: 0,
      int1_dot: false,
      int2_dot: false,
      check_screen: 100000000,
      screen: "",
      result: [],
      int1_divide: 10,
      int2_divide: 10,
      btn1: false,
      btn2: false,
      btn3: false,
      btn4: false,
      int1_neg: false,
      int2_neg: false,
      int2_dot_val_check: false,
      zero: "",
      active: "btn btn-secondary upper-btn cal-btn clr changeColor",
      nonActive: "btn btn-secondary upper-btn cal-btn clr"
    };
  }
  set = (number) => {
    if (this.state.int2_check === false) {
      var check = this.state.integer1 / this.state.check_screen;
      console.log("checing");

      console.log(check);

      if (check < 9) {
        console.log("in first condition");
        if (this.state.int1_dot === true) {
          const int1_dot_val = number / this.state.int1_divide;
          // uncomment below for undo  ----------------------+++++++++++++++++++++++++++
          // const int1_dot_updated = this.state.integer1 + int1_dot_val;
          // console.log(int1_dot_updated);

          // testing --------------------------------------------|||||||||||||||||||||||||||||||||||||||||||||
          var int1_dot_updated = 0;
          if (this.state.int1_neg === true) {
            console.log("in true");
            int1_dot_updated = this.state.integer1 - int1_dot_val;
            console.log(int1_dot_updated);
          } else {
            int1_dot_updated = this.state.integer1 + int1_dot_val;
          }
          //testing end ---------------------------------------------||||||||||||||||||||||||||||||||||||||||||||||
          this.setState({
            integer1: int1_dot_updated,
            screen: this.state.screen + number,
            // screen: int1_dot_updated,
            int1_check: true,
            int1_divide: this.state.int1_divide * 10
          });
        } else {
          // uncomment below for undo
          // const int1Updated = this.state.integer1 * 10 + number;

          // testing -----------------------------------------||||||||||||||||||||
          var int1Updated = 0;
          if (this.state.int1_neg === true) {
            int1Updated = this.state.integer1 * 10 - number;
          } else {
            int1Updated = this.state.integer1 * 10 + number;
          }
          // testing end --------------------------------|||||||||||||||||||||||||||||||||||||||||||||

          this.setState({
            integer1: int1Updated,
            int1_check: true,
            screen: int1Updated
          });
        }
      } else {
        this.setState({ screen: this.state.integer1 });
      }
    } else {
      var check = this.state.integer2 / this.state.check_screen;
      console.log(check);
      if (check < 9) {
        if (this.state.int2_dot === true) {
          const int2_dot_val = number / this.state.int2_divide;
          // uncomment below for undo  ----------------------+++++++++++++++++++++++++++
          // const int2_dot_updated = this.state.integer2 + int2_dot_val;

          // testing --------------------------------------------|||||||||||||||||||||||||||||||||||||||||||||
          var int2_dot_updated = 0;
          if (this.state.int2_neg === true) {
            console.log("in true");
            int2_dot_updated = this.state.integer2 - int2_dot_val;
            console.log(int2_dot_updated);
          } else {
            int2_dot_updated = this.state.integer2 + int2_dot_val;
          }
          //testing end ---------------------------------------------||||||||||||||||||||||||||||||||||||||||||||||

          this.setState({
            integer2: int2_dot_updated,
            screen: this.state.screen + number,
            // screen: int2_dot_updated,
            int2_divide: this.state.int2_divide * 10,
            int2_value_check: true
          });
        } else {
          console.log("in second condition");
          // uncomment below for undo
          // const int2Updated = this.state.integer2 * 10 + number;

          // testing -----------------------------------------||||||||||||||||||||
          var int2Updated = 0;
          if (this.state.int2_neg === true) {
            int2Updated = this.state.integer2 * 10 - number;
          } else {
            int2Updated = this.state.integer2 * 10 + number;
          }
          // testing end --------------------------------|||||||||||||||||||||||||||||||||||||||||||||

          this.setState({
            integer2: int2Updated,
            screen: int2Updated,
            int2_value_check: true,
            int2_dot_val_check: true
          });
        }
      } else {
        this.setState({ screen: this.state.integer2 });
      }
    }
  };
  colorChange = (oprt) => {
    if (oprt === "/") {
      this.setState({ btn1: true, btn2: false, btn3: false, btn4: false });
    } else if (oprt === "x") {
      this.setState({ btn1: false, btn2: true, btn3: false, btn4: false });
    } else if (oprt === "-") {
      this.setState({ btn1: false, btn2: false, btn3: true, btn4: false });
    } else if (oprt === "+") {
      this.setState({ btn1: false, btn2: false, btn3: false, btn4: true });
    }
  };
  operation = (oprt) => {
    if (this.state.int1_check === false) {
      this.setState({ errorScreen: "kindly enter any number first" });
      // document.getElementById("screen").innerHTML =
      //   "kindly enter any number first";
      console.log("enter number");
    } else if (this.state.int1_check === true && oprt === "%") {
      this.colorChange(oprt);
      this.setState(
        {
          mod_operator: oprt
        },
        () => {
          this.calculate();
        }
      );
    } else if (
      this.state.int1_check === true &&
      this.state.int2_check === true &&
      this.state.int2_value_check === true &&
      this.state.operator !== ""
    ) {
      this.calculate();
      this.colorChange(oprt);
      this.setState({ operator: oprt });
    } else if (
      this.state.int2_value_check === false &&
      this.state.operator !== ""
    ) {
      this.colorChange(oprt);
      this.setState({
        operator: oprt
      });
    } else {
      this.colorChange(oprt);
      this.setState({
        operator: oprt,
        int2_check: true,
        again_int1: this.state.integer1
      });
    }
  };
  calculate = () => {
    console.log("in cal");
    if (this.state.int1_check === false) {
      this.setState({ screen: 0 });
    } else if (
      this.state.int2_value_check === false &&
      (this.state.operator !== "" || this.state.mod_operator !== "")
    ) {
      if (this.state.mod_operator === "%") {
        var result_local = this.state.integer1 / 100;
        console.log("in % ....");
        this.setState({
          screen: result_local,
          integer1: result_local,
          // again_operator: this.state.operator,
          // again_cal_int2: this.state.integer2,
          result: [...this.state.result, result_local],
          integer2: 0
        });
      } else {
        switch (this.state.operator) {
          case "+":
            var result_local = this.state.integer1 + this.state.again_int1;
            this.setState({
              screen: result_local,
              integer1: result_local,
              again_operator: this.state.operator,
              result: [...this.state.result, result_local],

              integer2: 0,
              int2_check: false
            });
            break;
          case "/":
            console.log("in again of first /");
            var result_local = this.state.integer1 / this.state.again_int1;
            this.setState({
              screen: result_local,
              integer1: result_local,
              again_operator: this.state.operator,
              result: [...this.state.result, result_local],
              integer2: 0,
              int2_check: false
            });
            break;
          case "x":
            var result_local = this.state.integer1 * this.state.again_int1;
            console.log("in again of first *");
            this.setState({
              screen: result_local,
              integer1: result_local,
              again_operator: this.state.operator,
              result: [...this.state.result, result_local],

              integer2: 0,
              int2_check: false
            });
            break;
          case "-":
            var result_local = this.state.integer1 - this.state.again_int1;
            this.setState({
              screen: result_local,
              integer1: result_local,
              again_operator: this.state.operator,
              result: [...this.state.result, result_local],

              integer2: 0,
              int2_check: false
            });
            break;
        }
      }
    } else if (
      this.state.int2_value_check === false &&
      this.state.operator === ""
    ) {
      console.log("in again calculation");
      switch (this.state.again_operator) {
        case "+":
          var result_local = this.state.integer1 + this.state.again_cal_int2;
          this.setState({
            screen: result_local,
            integer1: result_local,
            result: [...this.state.result, result_local],
            int2_check: false
          });
          break;
        case "-":
          var result_local = this.state.integer1 - this.state.again_cal_int2;
          this.setState({
            screen: result_local,
            integer1: result_local,
            result: [...this.state.result, result_local],
            int2_check: false
          });
          break;
        case "x":
          var result_local = this.state.integer1 * this.state.again_cal_int2;
          this.setState({
            screen: result_local,
            integer1: result_local,
            result: [...this.state.result, result_local],
            int2_check: false
          });
          break;
        case "/":
          console.log("in again of second");

          var result_local = this.state.integer1 / this.state.again_cal_int2;
          this.setState({
            screen: result_local,
            integer1: result_local,
            result: [...this.state.result, result_local],
            int2_check: false
          });
          break;
      }
    } else {
      console.log(this.state.operator);

      console.log("in cal");
      switch (this.state.operator) {
        case "%":
          var result_local = this.state.integer1 / 100;
          console.log("in condition of %");
          this.setState({
            screen: result_local,
            integer1: result_local,
            again_operator: this.state.operator,
            again_cal_int2: this.state.integer2,
            result: [...this.state.result, result_local],
            integer2: 0,
            int2_dot_val_check: false,
            int2_value_check: false, // this line is additional for checking
            operator: ""
          });
          console.log(this.state);
          break;
        case "+":
          var result_local = this.state.integer1 + this.state.integer2;
          console.log(result_local);
          console.log("hello");
          this.setState(
            {
              screen: result_local,
              integer1: result_local,
              again_operator: this.state.operator,
              again_cal_int2: this.state.integer2,
              result: [...this.state.result, result_local],
              int2_divide: 10,
              int2_dot: false,
              integer2: 0,
              int2_dot_val_check: false,
              int2_value_check: false,
              operator: ""
            },
            () => {
              console.log(this.state);
            }
          );

          break;
        case "-":
          console.log("there");
          console.log(this.state.integer1);
          console.log(this.state.integer2);
          var result_local = this.state.integer1 - this.state.integer2;
          console.log(result_local);
          this.setState({
            screen: result_local,
            integer1: result_local,
            again_operator: this.state.operator,
            again_cal_int2: this.state.integer2,
            result: [...this.state.result, result_local],
            int2_divide: 10,
            int2_dot: false,
            integer2: 0,
            int2_dot_val_check: false,
            int2_value_check: false, // this line is additional for checking
            operator: ""
          });
          console.log(this.state);
          break;
        case "x":
          console.log("in again of third *");
          var result_local = this.state.integer1 * this.state.integer2;
          console.log(result_local);
          this.setState({
            screen: result_local,
            integer1: result_local,
            again_operator: this.state.operator,
            again_cal_int2: this.state.integer2,
            result: [...this.state.result, result_local],
            int2_divide: 10,
            int2_dot: false,
            integer2: 0,
            int2_dot_val_check: false,
            int2_value_check: false,
            operator: ""
          });
          console.log(this.state);
          break;
        case "/":
          console.log("in again of third /");
          var result_local = this.state.integer1 / this.state.integer2;
          console.log(result_local);
          if (result_local === Infinity) {
            this.setState({
              screen: "Error",
              errorScreen: "your ans is in infinity"
            });

            break;
          } else {
            this.setState({
              screen: result_local,
              integer1: result_local,
              again_operator: this.state.operator,
              again_cal_int2: this.state.integer2,
              result: [...this.state.result, result_local],
              int2_divide: 10,
              int2_dot: false,
              integer2: 0,
              int2_dot_val_check: false,
              int2_value_check: false, // this line is additional for checking

              operator: ""
            });
            console.log(this.state);
            break;
          }
      }
    }
  };
  negate = () => {
    if (this.state.int2_check === false) {
      console.log("in neg");
      const neg = this.state.integer1 * -1;
      this.setState({
        int1_neg: !this.state.int1_neg,
        screen: neg,
        integer1: neg
      });

      // this.setState({ integer1: neg, screen: neg });
    } else {
      const neg = this.state.integer2 * -1;
      this.setState({
        int2_neg: !this.state.int2_neg,
        screen: neg,
        integer2: neg
      });
      // const neg = this.state.integer2 * -1;
      // this.setState({ integer2: neg, screen: neg });
    }
  };
  dot = () => {
    if (this.state.int1_dot === false && this.state.int2_check === false) {
      console.log("in dot 1");
      this.setState({ int1_dot: true, screen: this.state.screen + "." });
    } else if (
      this.state.int2_dot === false &&
      this.state.int2_check === true
    ) {
      if (this.state.int1_dot === true) {
        this.setState({ screen: this.state.integer2 });
      }
      console.log("in dot 2");
      if (this.state.int2_dot_val_check === false) {
        this.setState({ int2_dot: true, screen: "0." });
      } else {
        this.setState({ int2_dot: true, screen: this.state.screen + "." });
      }
    } else {
      console.log("in dot error");
      this.setState({
        screen: this.state.screen,
        errorScreen: "you tried to enter the second dot"
      });
    }
  };
  reset = () => {
    this.setState({
      errorScreen: "",
      ACback: "rgb(225, 229, 233)",
      negateBack: "rgb(225, 229, 233)",
      equalBack: "rgb(248, 180, 53)",
      integer1: 0,
      integer2: null,
      operator: "",
      mod_operator: "",
      int1_check: false,
      int2_check: false,
      screen: 0,
      again_int1: 0,
      int1_dot: false,
      int2_dot: false,
      result: [],
      again_cal_int2: 0,
      int2_value_check: false,
      btn1: false,
      btn2: false,
      btn3: false,
      btn4: false,
      int2_dot_val_check: false,
      int1_neg: false,
      int2_neg: false,
      zero: "",
      int1_divide: 10,
      int2_divide: 10
    });
    // this.setState(this.baseState);
    // document.getElementById("screen").innerHTML =
    //   "output screen for errors or memory";
  };
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "red",
            alignItems: "center",
            width: 420,
            height: 100,
            // marginTop: 50,
            alignSelf: "stretch",
            justifyContent: "flex-start"
          }}
        >
          <Text style={{ paddingTop: 40, fontSize: 20 }}>
            {this.state.errorScreen}
          </Text>
        </View>
        <View
          style={{
            alignItems: "flex-end",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: 420,
            height: 100,
            padding: 10
          }}
        >
          <Text style={{ color: "white", fontSize: 80 }}>
            {this.state.screen}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableHighlight
            style={{
              alignItems: "center",
              backgroundColor: this.state.ACback,
              borderRadius: 80,
              height: 90,
              width: 90,
              // padding: 5,
              paddingTop: 15,
              margin: 5
            }}
            onPress={this.reset}
            onHideUnderlay={() => {
              this.setState({ ACback: "rgb(225, 229, 233)" });
            }}
            onShowUnderlay={() => {
              this.setState({ ACback: "rgb(250, 250, 250)" });
            }}
          >
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 50
              }}
            >
              AC
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              alignItems: "center",
              backgroundColor: this.state.negateBack,
              borderRadius: 80,
              height: 90,
              width: 90,
              // padding: 5,
              paddingTop: 15,
              margin: 5
            }}
            onPress={this.negate}
            onHideUnderlay={() => {
              this.setState({ negateBack: "rgb(225, 229, 233)" });
            }}
            onShowUnderlay={() => {
              this.setState({ negateBack: "rgb(250, 250, 250)" });
            }}
          >
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 50
              }}
            >
              +/-
            </Text>
          </TouchableHighlight>
          <Operation onPress={this.operation} operator="%" />
          <Operation
            onPress={this.operation}
            operator="/"
            class={this.state.btn1 === true ? "white" : "rgb(248, 180, 53)"}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Digit onPress={this.set} number={7} />
          <Digit onPress={this.set} number={8} />
          <Digit onPress={this.set} number={9} />
          <Operation
            onPress={this.operation}
            operator="x"
            class={this.state.btn2 === true ? "white" : "rgb(248, 180, 53)"}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Digit onPress={this.set} number={4} />
          <Digit onPress={this.set} number={5} />
          <Digit onPress={this.set} number={6} />
          <Operation
            onPress={this.operation}
            operator="-"
            class={this.state.btn3 === true ? "white" : "rgb(248, 180, 53)"}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Digit onPress={this.set} number={1} />
          <Digit onPress={this.set} number={2} />
          <Digit onPress={this.set} number={3} />
          <Operation
            onPress={this.operation}
            operator="+"
            class={this.state.btn4 === true ? "white" : "rgb(248, 180, 53)"}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.button}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 50
              }}
            >
              M
            </Text>
          </TouchableOpacity>
          <Digit onPress={this.set} number={0} />
          <TouchableOpacity style={styles.button} onPress={this.dot}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 50
              }}
            >
              .
            </Text>
          </TouchableOpacity>
          <TouchableHighlight
            onPress={this.calculate}
            onHideUnderlay={() => {
              this.setState({ equalBack: "rgb(248, 180, 53)" });
            }}
            onShowUnderlay={() => {
              this.setState({ equalBack: "white" });
            }}
            style={{
              alignItems: "center",
              backgroundColor: this.state.equalBack,
              borderRadius: 80,
              height: 90,
              width: 90,
              // padding: 5,
              paddingTop: 15,
              margin: 5
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 50
              }}
            >
              =
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 3,
    flexDirection: "column",
    // marginTop: 100,
    backgroundColor: "#333030",
    alignItems: "center",
    // alignItems: "stretch",
    width: 420,
    height: 740,
    alignSelf: "stretch",
    justifyContent: "flex-start"
  },
  button: {
    // justifyContent: "center",
    // alignContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    borderRadius: 80,
    height: 90,
    width: 90,
    // padding: 5,
    paddingTop: 15,
    margin: 5
  }
  // ,
  // upperBtn: {
  //   alignItems: "center",
  //   backgroundColor: this.state.upperBack,
  //   borderRadius: 80,
  //   height: 30,
  //   width: 30,
  //   padding: 5,
  //   margin: 5
  // }
});
export default App;
