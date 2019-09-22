import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';

import { HEX_DATA } from './hexData';
import styles from './styles';

class DiscoBall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorArray: [],
      colorHexData: HEX_DATA,
      sizeOfBall: props.sizeOfBall ? parseInt(props.sizeOfBall) : 100,
      sizeOfSquare: props.sizeOfSquare ? parseInt(props.sizeOfSquare) : 10,
      colorChangeTime: props.colorChangeTime ? props.colorChangeTime : 500
    };
  }

  componentDidMount() {
    const { colorChangeTime } = this.state;

    this.colorInterval = setInterval(
      () => this.makeColorArray(),
      colorChangeTime
    );
  }

  componentWillUnmount() {
    clearInterval(this.colorInterval);
  }

  generateRandomHexData = () => {
    const { colorHexData } = this.state;
    return colorHexData[Math.floor(Math.random() * colorHexData.length)];
  };

  makeColorArray = () => {
    const { sizeOfBall, sizeOfSquare } = this.state;
    let colorArray = [];

    for (
      let index = 0;
      index < Math.pow(sizeOfBall / sizeOfSquare, 2);
      index++
    ) {
      let newColor =
        '#' +
        this.generateRandomHexData() +
        this.generateRandomHexData() +
        this.generateRandomHexData() +
        this.generateRandomHexData() +
        this.generateRandomHexData() +
        this.generateRandomHexData();
      colorArray.push(newColor);
    }

    this.setState({ colorArray });
  };

  renderSquareAreas = (colorOfSquare, sizeOfSquare = 4) => {
    return (
      <View
        style={{
          width: sizeOfSquare,
          height: sizeOfSquare,
          backgroundColor: colorOfSquare
        }}
      />
    );
  };

  render() {
    const { colorArray, sizeOfBall, sizeOfSquare } = this.state;
    return (
      <View
        style={[
          styles.discoBallContainerStyle,
          {
            width: sizeOfBall,
            height: sizeOfBall,
            borderRadius: sizeOfBall / 2
          }
        ]}
      >
        <FlatList
          data={colorArray}
          renderItem={({ item }) => (
            <View
              style={{
                zIndex: 100,
                width: sizeOfSquare,
                height: sizeOfSquare,
                backgroundColor: item
              }}
            />
          )}
          keyExtractor={(item, index) => item + index}
          numColumns={sizeOfBall / sizeOfSquare}
        />
      </View>
    );
  }
}

export default DiscoBall;
