import axios from "axios";
import Dropdown from "react-native-input-select";
import { Image, StyleSheet, Text, View } from "react-native";
import LeagueTableList from "./LeagueTableList";
import Logo from "../assets/logo.png";
import { ScrollView } from "react-native-virtualized-view";
import SelectArrow from "../assets/selectarrow.png";
import { useEffect, useState } from "react";

export default function LeagueTables() {
  const [leagues, setLeagues] = useState(null);
  const [id, setId] = useState("4328");
  const [year, setYear] = useState("2022-2023");

  useEffect(() => {
    axios
      .get("https://www.thesportsdb.com/api/v1/json/3/all_leagues.php")
      .then((res) => {
        setLeagues(res.data.leagues);
      });
  }, []);

  const seasons = [
    { season: "2022-2023" },
    { season: "2021-2022" },
    { season: "2020-2021" },
  ];

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <View>
        <Dropdown
          options={leagues}
          optionLabel={"strLeague"}
          optionValue={"idLeague"}
          selectedValue={id}
          onValueChange={(value) => setId(value)}
          primaryColor={"#1d455e"}
          dropdownStyle={styles.styleDropdown}
          dropdownContainerStyle={styles.styleContainerDropdown}
          modalBackgroundStyle={styles.styleBackgroundModal}
          modalOptionsContainerStyle={styles.styleContainerOptionsModal}
          checkboxStyle={styles.styleCheckbox}
          checkboxLabelStyle={styles.styleLabel}
          selectedItemStyle={styles.styleLabel}
          dropdownIcon={<Image source={SelectArrow} />}
          dropdownIconStyle={styles.styleIconDropdown}
        />

        <Dropdown
          options={seasons}
          optionLabel={"season"}
          optionValue={"season"}
          selectedValue={year}
          onValueChange={(value) => setYear(value)}
          primaryColor={"#1d455e"}
          dropdownStyle={styles.styleDropdown}
          dropdownContainerStyle={styles.styleContainerDropdown}
          modalBackgroundStyle={styles.styleBackgroundModal}
          modalOptionsContainerStyle={styles.styleContainerOptionsModal}
          checkboxStyle={styles.styleCheckbox}
          checkboxLabelStyle={styles.styleLabel}
          selectedItemStyle={styles.styleLabel}
          dropdownIcon={<Image source={SelectArrow} />}
          dropdownIconStyle={styles.styleIconDropdown}
        />
      </View>
      <View>
        <Text style={styles.seasonHeading}>Season {year}</Text>
        <LeagueTableList id={id} year={year} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  logo: {
    width: 260,
    height: 70,
  },
  styleDropdown: {
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#e9c46a",
  },
  styleContainerDropdown: {
    marginHorizontal: 10,
    width: "95%",
  },
  styleBackgroundModal: {
    backgroundColor: "rgba(196, 198, 246, 0.5)",
  },
  styleContainerOptionsModal: {
    backgroundColor: "#e9c46a",
  },
  styleCheckbox: {
    backgroundColor: "#1d455e",
  },
  styleLabel: {
    color: "#1d455e",
    fontWeight: "500",
  },
  styleIconDropdown: {
    top: 22,
    right: 25,
  },
  seasonHeading: {
    color: "#e9c46a",
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
    paddingBottom: 5,
  },
});
