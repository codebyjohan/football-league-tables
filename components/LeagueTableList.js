import axios from "axios";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function LeagueTableList({ id, year }) {
  const [clubs, setClubs] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${id}&s=${year}`
      )
      .then((res) => {
        setClubs(res.data.table);
      });
  }, [id, year]);

  return (
    <>
      <View style={styles.rowContainer}>
        <View style={styles.headTable}>
          <Text style={styles.headTableText}>Pos</Text>
        </View>
        <View style={styles.headTable}>
          <Text style={styles.headTableText}>Logo</Text>
        </View>
        <View style={styles.headTableClub}>
          <Text style={styles.headTableText}>Club</Text>
        </View>
        <View style={styles.headTable}>
          <Text style={styles.headTableText}>Pts</Text>
        </View>
        <View style={styles.headTable}>
          <Text style={styles.headTableText}>+/-</Text>
        </View>
        <View style={styles.headTable}>
          <Text style={styles.headTableText}>Pl</Text>
        </View>
      </View>
      <View>
        <FlatList
          data={clubs}
          renderItem={({ item }) => (
            <View style={styles.rowContainer}>
              <View style={styles.rowTable}>
                <Text style={styles.textTable}>{item.intRank}</Text>
              </View>
              <View style={styles.rowTable}>
                <Image style={styles.tinyLogo} src={item.strTeamBadge} />
              </View>
              <View style={styles.rowTableClub}>
                <Text style={styles.textTable}>{item.strTeam}</Text>
              </View>
              <View style={styles.rowTable}>
                <Text style={styles.textTable}>{item.intPoints}</Text>
              </View>
              <View style={styles.rowTable}>
                <Text style={styles.textTable}>{item.intGoalDifference}</Text>
              </View>
              <View style={styles.rowTable}>
                <Text style={styles.textTable}>{item.intPlayed}</Text>
              </View>
            </View>
          )}
          keyExtractor={(rank) => rank.intRank}
        />
      </View>
      <View style={styles.copyrightContainer}>
        <Text style={styles.copyrightText}>
          &copy; 2023 - JÖ&#39;s Football League Tables
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
  },
  headTable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e9c46a",
    borderBottomWidth: 3,
    borderBottomColor: "#fff",
  },
  headTableClub: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e9c46a",
    borderBottomWidth: 3,
    borderBottomColor: "#fff",
  },
  headTableText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1d455e",
  },
  tinyLogo: {
    width: 40,
    height: 40,
    marginBottom: 3,
    marginTop: 3,
  },
  textTable: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e9c46a",
  },
  rowTable: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  rowTableClub: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  copyrightContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e9c46a",
  },
  copyrightText: {
    color: "#1d455e",
    padding: 20,
    fontWeight: "500",
  },
});

LeagueTableList.propTypes = {
  id: PropTypes.string,
  year: PropTypes.string,
};
