import { View } from "react-native";
import { FormField } from "../../screens/login-screen/type";
import AppText from "../app-text";
import AppInput from "../app-input";
import styles from "./style";
import { moderateSize } from "../../utils/useResponsiveness";
import { fontFamilyWeightMap } from "../../configs/ThemeSetup";
import { pallete } from "../../configs/Colors";

const FormInputField = ({ field }: { field: FormField }) => (
    <View style={styles.inputContainer}>
      <AppText 
        text={field.label} 
        fontSize={moderateSize(14)} 
        fontWeight={fontFamilyWeightMap.SemiBold}
        styles={styles.inputLabel}
      />
      <AppInput
        value={field.value}
        onChangeText={field.onChangeText}
        placeholder={field.placeholder}
        secureTextEntry={field.secureTextEntry}
        styles={styles.inputField}
      />
      {field.error ? (
        <AppText 
          text={field.error} 
          color={pallete.error}
          fontSize={moderateSize(12)} 
          styles={styles.errorText}
        />
      ) : null}
    </View>
  );

export default FormInputField;
