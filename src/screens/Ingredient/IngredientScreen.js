import React, { Component } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import styles from "./styles";
import {
  getIngredientUrl,
  getRecipesByIngredient,
  getCategoryName,
} from "../../data/MockDataAPI";
import BackButton from "../../components/BackButton/BackButton";

export default class IngredientScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("name"),
      headerTransparent: "true",
      headerLeft: (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    };
  };

  constructor(props) {
    super(props);
  }

  onPressRecipe = (item) => {
    this.props.navigation.navigate("Recipe", { item });
  };

  renderRecipes = ({ item }) => (
    <TouchableHighlight
      underlayColor="#fff"
      onPress={() => this.onPressRecipe(item)}
    >
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    const { navigation } = this.props;
    const ingredientId = navigation.getParam("ingredient");
    const ingredientUrl = getIngredientUrl(ingredientId);
    const ingredientName = navigation.getParam("name");
    return (
      <ScrollView style={styles.mainContainer}>
        <View
          style={{
            borderBottomWidth: 0.4,
            marginBottom: 10,
            borderBottomColor: "grey",
          }}
        >
          <Image
            style={styles.photoIngredient}
            source={{ uri: "" + ingredientUrl }}
          />
        </View>
        <Text style={styles.ingredientInfo}>
          Recipes with {ingredientName}:
        </Text>
        <View>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={getRecipesByIngredient(ingredientId)}
            renderItem={this.renderRecipes}
            keyExtractor={(item) => `${item.recipeId}`}
          />
        </View>
      </ScrollView>
    );
  }
}
