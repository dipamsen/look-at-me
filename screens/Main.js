import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Platform } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as FaceDetector from "expo-face-detector";
import * as StatusBar from "expo-status-bar";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCamPerms: null,
      faces: [],
    };
  }
  componentDidMount() {
    Permissions.askAsync(Permissions.CAMERA).then(this.onCamPerms);
  }
  onCamPerms = (status) => {
    this.setState({ hasCamPerms: status.status === "granted" });
  };
  onFacesDetected = (faces) => {
    this.setState({
      faces: faces.faces,
    });
  };
  onFaceDetectionError = (err) => {
    console.log(err);
  };
  render() {
    const { hasCamPerms } = this.state;
    if (hasCamPerms === null) {
      return <View />;
    }
    if (hasCamPerms === false) {
      return (
        <View style={styles.container}>
          <Text>No access to Camera.</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.headingContainer}>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Text style={styles.titleText1}>Look At Me!</Text>
          </View>
        </View>

        <View style={styles.cameraStyle}>
          <Camera
            style={{
              flex: 1,
            }}
            type={Camera.Constants.Type.front}
            faceDetectorSettings={{
              mode: 1,
              detectLandmarks: 2,
              runClassifications: 2,
            }}
            onFacesDetected={this.onFacesDetected}
            onFacesDetectionError={this.onFaceDetectionError}
          />
        </View>
        <View style={styles.framesContainer}></View>
        <View style={styles.filterContainer}></View>
        <View style={styles.actionContainer}></View>
      </View>
    );
  }
}

export default Main;
const styles = StyleSheet.create({
  container: { flex: 1 },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headingContainer: {
    flex: 0.15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
  },
  titleText1: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  cameraStyle: { flex: 0.65 },
  framesContainer: {
    flex: 0.2,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    backgroundColor: "orange",
  },
});
