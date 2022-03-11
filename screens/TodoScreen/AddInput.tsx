import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ITask } from ".";

interface IProps {
    tasks: ITask[];
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}


const AddInput = ({ tasks, setTasks }: IProps) => {
  const [value, setValue] = useState<string>("");

  const onChangeText = (text: string) => {
    setValue(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            placeholder="Add Task..."
            onChangeText={onChangeText}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setTasks((tasks) => [...tasks, { title: value, key: Math.random().toString() }]);
        }}
      >
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AddInput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        flex: 1,
        borderRadius: 10,
    },
    input: {
        fontSize: 20,
        backgroundColor: '#fff',
        width: '100%',
        margin: 10,
    },
    button: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
        marginTop: 10,
        marginBottom: 10,
    },
  });