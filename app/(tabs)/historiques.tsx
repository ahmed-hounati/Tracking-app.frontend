import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { getUserHistory } from "@/services/historic";
import Colors from "@/constants/Colors";

export default function Historiques() {
  const [history, setHistory] = useState<[] | any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      const data = await getUserHistory();
      if (data) {
        setHistory(data);
      }
      setLoading(false);
    };

    fetchHistory();
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/download.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Search History</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#00ffcc" />
        ) : history.length > 0 ? (
          <FlatList
            data={history}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.historyItem}>
                <Text style={styles.name}>
                  {item.searchedUserId?.firstName}{" "}
                  {item.searchedUserId?.lastName}
                </Text>
                <Text style={styles.id}>ID: {item.searchedUserId?._id}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noHistory}>No search history found.</Text>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    color: "#443627",
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  historyItem: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
  },
  id: {
    fontSize: 14,
    color: "#666",
  },
  noHistory: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
  },
});
