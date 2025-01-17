import React from 'react';
import { Container, Text } from '../../atoms';


const DescriptionSwipe = ({ bio }) => {
    return (
        <Container.BasicView style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 13,
            paddingVertical: 5,
            paddingHorizontal: 10,
            boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.10)",
            shadowColor: "rgba(0, 0, 0, 0.1)", 
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 6, 
            marginHorizontal: 10,
            marginTop: 20,
        }}>
        <Text.Base style={{ fontSize: 12, color: "black" }}>{bio}</Text.Base>
        </Container.BasicView>
    );
};

export default DescriptionSwipe;