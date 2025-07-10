import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Alert, Platform, View } from 'react-native'
import { Button } from 'react-native-paper'

interface CsvUploadProps {
    onFileSelected: (fileContent : string) => void;
}

const CsvUpload: React.FC<CsvUploadProps> = ({ onFileSelected }) => {
    const _pickDocument = async () => {
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
                onFileSelected(fileContent);
            } else {
                Alert.alert("File upload cancelled");
            }
        } catch (error) {
            const err = error as Error;
            Alert.alert("Error uploading file.", err.message);
        }
    };

    return (
        <View style={{marginLeft: 10}}>
        <Button buttonColor="lavender" onPress={_pickDocument}>Upload CSV</Button>
        </View>
    )
}

export default CsvUpload;