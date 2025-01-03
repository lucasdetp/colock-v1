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
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AccountPictureName;