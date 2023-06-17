import {
  TextInput,
  View,
  StyleSheet,
  Pressable,
  Text,
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export function LessonInfoScreen({ route, navigation }) {
  let [link, setLink] = useState("");
  const { id } = route.params;
  useEffect(() => {
    const lessonInfo = async (id) => {
      try {
        const token =
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbXlzZWxlbmEub3JnIiwiaWF0IjoxNjg3MDMwMDg1LCJuYmYiOjE2ODcwMzAwODUsImV4cCI6MTY4NzYzNDg4NSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMTc4In19fQ.jh43WyXsS7uGLTQCEIJS-AcbJafwCVpK4Sv-OaVFFMI";
        const response = await axios.get(
          `https://myselena.org/wp-json/learnpress/v1/lessons/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const response_data = response.data.content;
        const link_regex = /href="([^"]*)"/;
        const link_match = response_data.match(link_regex);
        if (link_match) {
          const thelink = link_match[1];
          console.log(thelink);
          setLink(thelink);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    lessonInfo(id);
  }, []);

  return (
    <View>
      <Text style={{ textAlign: "center", marginVertical: 80 }}>{link}</Text>
      <Button
        title="Go to Lessons"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}
