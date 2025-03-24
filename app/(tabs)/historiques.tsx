import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  RefreshControl,
} from "react-native";
import { getUserHistory } from "@/services/historic";
import Colors from "@/constants/Colors";

export default function Historiques() {
  const [history, setHistory] = useState<[] | any>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await getUserHistory();
      if (data) {
        setHistory(data);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Function to refresh data on pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchHistory();
    setRefreshing(false);
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/download.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Search History</Text>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.black} />
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
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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
