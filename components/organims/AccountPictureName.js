import React from 'react';
import { Container, Text, Image } from '../atoms';
import { StyleSheet } from 'react-native';


const AccountPictureName = ({ source, userName, style, textStyle, ...props }) => {
  return (
    <Container.BasicView>
        <Image.ImageAccount source={source} style={style} {...props} />
            <Text.Base style={styles.text}>
                {userName}
            </Text.Base>
    </Container.BasicView>
  );
};

const styles = StyleSheet.create({
    text: {
        marginTop: 10,
        fontSize: 22,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: "CustomFontBold",
    },
});

export default AccountPictureName;