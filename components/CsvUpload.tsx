import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useState, useCallback } from 'react';
import { Alert, Platform, View } from 'react-native'
import { Button } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native';

interface CsvUploadProps {
    onFileSelected: (fileContent : string) => void;
}
const CsvUpload: React.FC<CsvUploadProps> = ({ onFileSelected, }) => {
    const [clicked, setClicked] = useState(false);
    const [buttonText, setButtonText] = useState("Upload CSV Notebook");
    function resetButton() {
        setButtonText("Upload CSV Notebook");
        setClicked(false);
        return;
    }
    const _pickDocument = async () => {
        if(!clicked) {
            setClicked(true);
            setButtonText("File uploaded, please wait...");
        }
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type:'text/csv',
            });
            console.log(result);

            if(result.assets && result.assets.length > 0) {
                const fileUri = result.assets[0].uri;
                let fileContent = '';
                if (Platform.OS == 'web') {
                    const response = await fetch(fileUri);
                    fileContent = await response.text();
                } else {
                    fileContent = await FileSystem.readAsStringAsync(fileUri);
                    console.log("FILE URI: ", (fileUri));
                }
                await onFileSelected(fileContent);
                resetButton();
            } else {
                Alert.alert("File upload cancelled");
                resetButton();
            }
        } catch (error) {
            const err = error as Error;
            Alert.alert("Error uploading file.", err.message);
           resetButton();
        }
    };
    return (
        <View style={{marginLeft: 10}}>
        <Button buttonColor="#91CA91" textColor="#264F26" onPress={_pickDocument} disabled={clicked}>{buttonText}</Button>
        </View>
    )
}

export default CsvUpload;