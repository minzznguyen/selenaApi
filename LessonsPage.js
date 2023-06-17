import {
  TextInput,
  View,
  StyleSheet,
  Pressable,
  Text,
  Button,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export const DetailsScreen = ({ route, navigation }) => {
  const { courseName, courseSections, courseId } = route.params;
  const lessonIds = courseSections.map((section) => section.id);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{courseName}</Text>
      {courseSections.map((section) => (
        <Pressable
          key={section.id}
          style={styles.btn}
          onPress={() => { navigation.navigate("LessonInfo", {id: section.id,}) }}
        >
          <Text style={styles.btnText}>{section.title}</Text>
        </Pressable>
      ))}
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
  },
  btn: {
    width: "100%",
    height: 50,
    backgroundColor: "#eab676",
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
});
