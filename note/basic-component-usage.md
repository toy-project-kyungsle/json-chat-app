React Native에서 제공하는 여러 컴포넌트들은 모바일 애플리케이션을 개발할 때 매우 유용합니다. `import` 문에서 사용된 각 컴포넌트에 대해 설명드리겠습니다.

### 1. `StyleSheet`

`StyleSheet`는 React Native에서 스타일을 정의하고 관리하기 위한 객체입니다. CSS와 유사한 방식으로 스타일을 작성할 수 있으며, 재사용 가능한 스타일 시트를 생성할 수 있습니다.

```javascript
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    text: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
});
```

### 2. `Text`

`Text` 컴포넌트는 텍스트를 렌더링하는 데 사용됩니다. 모든 텍스트 요소는 이 컴포넌트를 사용하여 렌더링할 수 있습니다.

```javascript
<Text style={styles.text}>Hello, World!</Text>
```

### 3. `View`

`View`는 가장 기본적인 컨테이너 컴포넌트로, 다른 컴포넌트나 뷰를 감싸는 역할을 합니다. 레이아웃을 구성하는 데 주로 사용됩니다.

```javascript
<View style={styles.container}>
    <Text>Hello, World!</Text>
</View>
```

### 4. `TouchableOpacity`

`TouchableOpacity`는 터치 가능한 요소를 만들기 위해 사용됩니다. 사용자가 터치할 수 있는 버튼 등을 만들 때 사용하며, 터치 시 투명도가 변경되어 시각적인 피드백을 제공합니다.

```javascript
<TouchableOpacity onPress={() => Alert.alert("Button Pressed!")}>
    <View style={styles.button}>
        <Text>Press Me</Text>
    </View>
</TouchableOpacity>
```

### 5. `TextInput`

`TextInput`은 사용자가 텍스트를 입력할 수 있는 입력 필드를 만들 때 사용됩니다. 폼이나 검색 창 등을 구현할 때 유용합니다.

```javascript
<TextInput style={styles.input} placeholder="Enter text here" onChangeText={(text) => console.log(text)} />
```

### 6. `Alert`

`Alert`는 사용자에게 알림 메시지를 표시하는 데 사용됩니다. 단순한 경고창을 표시하거나 확인 대화상자를 만들 수 있습니다.

```javascript
Alert.alert("Alert Title", "My Alert Msg", [{ text: "OK", onPress: () => console.log("OK Pressed") }]);
```

### 7. `ScrollView`

`ScrollView`는 스크롤 가능한 컨테이너를 만들 때 사용됩니다. 내용이 화면을 넘어갈 경우 스크롤하여 볼 수 있게 합니다.

```javascript
<ScrollView>
    <Text>Some long content here...</Text>
</ScrollView>
```

### 전체 예시

다음은 위의 모든 컴포넌트를 사용한 간단한 예시입니다.

```javascript
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, ScrollView } from "react-native";

const App = () => {
    const [text, setText] = useState("");

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.text}>Hello, World!</Text>
            <TextInput style={styles.input} placeholder="Enter text here" onChangeText={setText} value={text} />
            <TouchableOpacity onPress={() => Alert.alert("Button Pressed!", `You entered: ${text}`)}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Press Me</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    text: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: "100%",
    },
    button: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
});

export default App;
```

이 예시에서는 `Text`, `View`, `TouchableOpacity`, `TextInput`, `Alert`, `ScrollView`, 그리고 `StyleSheet`를 사용하여 간단한 애플리케이션을 구현했습니다. 이 코드를 통해 각 컴포넌트의 사용법을 이해할 수 있습니다.

---

React Native에서 자주 사용되는 다른 컴포넌트들도 많이 있습니다. 아래는 몇 가지 자주 사용되는 컴포넌트들을 소개합니다.

### 1. `FlatList`

`FlatList`는 긴 목록의 데이터를 효율적으로 렌더링하기 위해 사용됩니다. 스크롤 가능한 리스트를 만들 때 매우 유용합니다.

```javascript
import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";

const DATA = [
    { id: "1", title: "Item 1" },
    { id: "2", title: "Item 2" },
    { id: "3", title: "Item 3" },
];

const App = () => {
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
        </View>
    );

    return <FlatList data={DATA} renderItem={renderItem} keyExtractor={(item) => item.id} />;
};

const styles = StyleSheet.create({
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    title: {
        fontSize: 18,
    },
});

export default App;
```

### 2. `SectionList`

`SectionList`는 섹션으로 나뉜 리스트를 렌더링할 때 사용됩니다. 각 섹션에는 헤더와 데이터를 가질 수 있습니다.

```javascript
import React from "react";
import { SectionList, Text, View, StyleSheet } from "react-native";

const DATA = [
    {
        title: "Main Title 1",
        data: ["Item 1-1", "Item 1-2"],
    },
    {
        title: "Main Title 2",
        data: ["Item 2-1", "Item 2-2"],
    },
];

const App = () => {
    return (
        <SectionList
            sections={DATA}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
            renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
        />
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        backgroundColor: "#f9c2ff",
        padding: 5,
    },
    item: {
        padding: 10,
        fontSize: 18,
    },
});

export default App;
```

### 3. `Image`

`Image`는 이미지를 렌더링하는 데 사용됩니다. 로컬 이미지나 원격 URL에서 이미지를 불러올 수 있습니다.

```javascript
import React from "react";
import { Image, StyleSheet, View } from "react-native";

const App = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: "https://example.com/my-image.jpg" }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
    },
});

export default App;
```

### 4. `Modal`

`Modal`은 화면 위에 떠서 표시되는 오버레이를 만들 때 사용됩니다. 팝업창 등을 구현할 때 유용합니다.

```javascript
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";

const App = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello, World!</Text>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Show Modal</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});

export default App;
```

### 5. `ActivityIndicator`

`ActivityIndicator`는 로딩 스피너를 표시합니다. 데이터 로딩 중임을 사용자에게 알릴 때 유용합니다.

```javascript
import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const App = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default App;
```

이 외에도 React Native에서 유용하게 사용할 수 있는 많은 컴포넌트들이 있습니다. 필요에 따라 다양한 컴포넌트를 활용하여 애플리케이션을 구성할 수 있습니다.

이런 자료를 참고했어요.
[1] 인실리코젠 - 인공지능 기반 추천 시스템의 모든 것! From A to Z (https://blog.insilicogen.com/61)
[2] 티스토리 - [취업 준비] 신입 개발자 알고리즘 팁 정리 및 문제 추천 (https://mangkyu.tistory.com/181)
[3] velog - 코딩테스트 문제 유형 정리 (https://velog.io/@pppp0722/%EC%BD%94%EB%94%A9%ED%85%8C%EC%8A%A4%ED%8A%B8-%EB%AC%B8%EC%A0%9C-%EC%9C%A0%ED%98%95-%EC%A0%95%EB%A6%AC)
[4] GitHub - 개인적으로 사용했던 알고리즘 사이트들을 추천드립니다. (https://gist.github.com/shoark7/38bcff39588b528d37313a669fdfd75d)

뤼튼 사용하러 가기 > https://agent.wrtn.ai/5xb91l
