import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { Camera } from "expo-camera";
import * as Font from "expo-font";
import {
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import Filter from "../components/Filter";
import { StatusBar } from "expo-status-bar";
import * as FaceDetector from "expo-face-detector";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCamPerms: null,
      fontsLoaded: false,
      faces: [],
    };
  }
  async loadFonts() {
    await Font.loadAsync({
      Regular: Montserrat_400Regular,
      Bold: Montserrat_700Bold,
    });
    this.setState({ fontsLoaded: true });
  }
  componentDidMount() {
    Camera.requestCameraPermissionsAsync().then((status) => {
      this.setState({ hasCamPerms: status.granted });
    });
    this.loadFonts();
  }
  render() {
    const { hasCamPerms, fontsLoaded, faces } = this.state;
    if (hasCamPerms === null || !fontsLoaded) {
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
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.headingContainer}>
          <Image
            source={require("../assets/appIcon.png")}
            style={styles.logo}
          />
          <Text style={styles.titleText}>Look At Me!</Text>
        </View>
        <View style={styles.cameraStyle}>
          <Camera
            style={{
              flex: 1,
            }}
            type={Camera.Constants.Type.front}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
              runClassifications: FaceDetector.FaceDetectorClassifications.none,
              tracking: true,
              // minDetectionInterval: 2000,
            }}
            onMountError={console.log}
            onFacesDetected={(faces) => {
              // console.log(faces);
              this.setState({
                faces: faces.faces,
              });
            }}
            onFacesDetectionError={console.log}
          ></Camera>
          {faces.map((face, i) => (
            <Filter key={i} face={face} />
          ))}
        </View>

        <View style={styles.framesContainer}></View>
      </SafeAreaView>
    );
  }
}

export default Main;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  backgroundColor: "black"
  },
  headingContainer: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
    marginTop: 30,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginRight: 10,
  },
  titleText: {
    fontSize: 30,
    color: "black",
    fontFamily: "Bold",
  },
  cameraStyle: { flex: 0.7 },
  framesContainer: {
    flex: 0.2,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    backgroundColor: "orange",
  },
});
