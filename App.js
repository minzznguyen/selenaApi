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
import { DetailsScreen } from "./LessonsPage";
import { LessonInfoScreen } from "./LessonInfoPage";
const Stack = createStackNavigator();

export default LoginPage = () => {
  let [username, setUsername] = useState("rubyanhminh");
  let [password, setPassword] = useState("Ruby12032004!");
  let [allCourses, setAllCourses] = useState([]);

  let finalToken = "";

  const authenticateUser = async (user, pass) => {
    // console.log('Button has been pressed!' + `${user}` + `${pass}`);
    try {
      const response = await axios.post(
        "https://myselena.org/wp-json/learnpress/v1/token",
        {
          username: user, //SelenaContent
          password: pass, //eattheredpizza
        }
      );
      const resToken = response.data.token;
      const validationStatus = await validateToken(resToken);
      if (validationStatus === 200) {
        finalToken = resToken;
        console.log(finalToken);
        const temp = await getAllCourses(finalToken);
        setAllCourses(temp);
        // console.log(allCourses[0].sections[0].items);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const validateToken = async (token) => {
    try {
      const response = await axios.post(
        "https://myselena.org/wp-json/learnpress/v1/token/validate",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let resStatus = response.data.data.status;
      return resStatus;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getAllCourses = async (finalToken) => {
    let courses = [];
    let page = 1;
    let perPage = 10;
    while (true) {
      try {
        const response = await axios.get(
          "https://myselena.org/wp-json/learnpress/v1/courses",
          {
            params: {
              page,
              per_page: perPage,
            },
            headers: {
              Authorization: `Bearer ${finalToken}`,
            },
          }
        );
        courses.push(...response.data);
        if (
          response.headers.link &&
          response.headers.link.includes('rel="next"')
        ) {
          // There are more pages of results
          page++;
        } else {
          // No more pages of results
          break;
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
    return courses;
  };

  function HomeScreen({ navigation }) {
    return (
      <View>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <Pressable
          style={styles.btn}
          onPress={() => authenticateUser(username, password)}
        >
          <Text style={styles.btnText}>Log In</Text>
        </Pressable>
        {allCourses.length > 0 ? (
          allCourses.map((course) => (
            <Pressable
              key={course.id}
              style={styles.btn}
              onPress={() => {
                navigation.navigate("Details", {
                  courseName: course.name,
                  courseSections: course.sections[0].items,
                  courseId: course.id,
                });
              }}
            >
              <Text style={styles.btnText}>{course.name}</Text>
            </Pressable>
          ))
        ) : (
          <Text>No courses found</Text>
        )}
        {/* <LessonsList allCourses={allCourses}></LessonsList> */}
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="LessonInfo" component={LessonInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

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
