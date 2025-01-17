import React from 'react';
import { Container, Text } from '../../atoms';


const NameSwipe = ({ name }) => {
    return (
        <Container.BasicView style={{ alignItems: "center", marginTop: 10 }}>
            <Text.Base
            style={{
                fontSize: 24, 
                fontWeight: "bold", 
                textTransform: "uppercase", 
            }}
            >
            {name}
            </Text.Base>
        </Container.BasicView>
    );
};

export default NameSwipe;