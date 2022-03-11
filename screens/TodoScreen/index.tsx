import React, { useState } from "react";
import { View, Text, FlatList, ListRenderItem, StyleSheet } from "react-native";
import { RootTabScreenProps } from "../../types";
import AddInput from "./AddInput";

export interface ITask {
    title: string,
    key: string,
}

const TodoScreen = ({ navigation }: RootTabScreenProps<'Todo'>) => {
 const [tasks, setTasks] = useState<ITask[]>([]);

 const Item = ({data}: {data: ITask}) => (
    <View style={styles.task}>
        <Text>{data.title}</Text>
    </View>
  );

const renderItem: ListRenderItem<ITask> = ({item}) => <Item data={item} />;

 return (
      <View style={styles.container}>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.key}
            renderItem={renderItem}
          />
          <AddInput tasks={tasks} setTasks={setTasks} />
      </View>
    );
}

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  task: {
    padding: 10,
  }
});