import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  FlatList,
} from "react-native";
import { Camera } from "expo-camera";
import * as Font from "expo-font";
import {
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import Filter from "../components/Filter";
// import * as StatusBar from "expo-status-bar";
import * as FaceDetector from "expo-face-detector";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { CROWN_1, CROWN_2 } from "../FilterData";

const filters = [CROWN_1, CROWN_2];
const shutterSize = 80;
globalThis.debug = false;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCamPerms: null,
      fontsLoaded: false,
      faces: [],
      selectedFilters: new Set([CROWN_1]),
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
    const toggleFilter = (fl) => {
      // if (this.state.selectedFilters.has(fl)) {
      //   this.state.selectedFilters.delete(fl);
      // } else {
      //   this.state.selectedFilters.add(fl);
      // }
      this.setState({ selectedFilters: new Set([fl]) });
    };
    const { hasCamPerms, fontsLoaded, faces, selectedFilters } = this.state;
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
        <StatusBar barStyle="light-content" />
        <View style={styles.headingContainer}>
          <Image
            source={require("../assets/appIcon.png")}
            style={styles.logo}
          />
          <Text style={styles.titleText}>Look At Me!</Text>
        </View>
        <View style={styles.cameraStyle}>
          <Camera
            ref={(camera) => (this.cam = camera)}
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
          {faces.map((face, i) =>
            [...selectedFilters].map((filter, j) => (
              <Filter key={i + "" + j} face={face} filter={filter} />
            ))
          )}
        </View>
        {/* Uncomment for Shutter */}
        {/* <View style={styles.shutterContainer}>
          <TouchableOpacity style={styles.shutter}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome5 name="camera" size={35} />
            </View>
          </TouchableOpacity>
        </View> */}
        <View style={styles.filtersContainer}>
          {/* <ScrollView> */}
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.url}
              style={[
                styles.filter,
                this.state.selectedFilters.has(filter)
                  ? {
                      borderColor: "blue",
                      borderWidth: 2,
                      backgroundColor: "lightblue",
                    }
                  : {},
              ]}
              activeOpacity={0.9}
              onPress={() => toggleFilter(filter)}
            >
              <Image source={filter.image} />
            </TouchableOpacity>
          ))}
          {/* </ScrollView> */}
        </View>
      </SafeAreaView>
    );
  }
}

export default Main;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  headingContainer: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginRight: 10,
  },
  shutterContainer: {
    height: 5,
    backgroundColor: "white",
    zIndex: 1,
  },
  shutter: {
    width: shutterSize,
    height: shutterSize,
    borderRadius: shutterSize / 2,
    backgroundColor: "white",
    alignSelf: "center",
    transform: [{ translateY: -shutterSize / 2 }],
  },
  titleText: {
    fontSize: 30,
    color: "black",
    fontFamily: "Bold",
  },
  cameraStyle: { flex: 0.65 },
  filtersContainer: {
    flex: 0.25,
    backgroundColor: "orange",
    flexDirection: "row",
  },
  filter: {
    backgroundColor: "white",
    width: 100,
    height: 100,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 20,
  },
});
