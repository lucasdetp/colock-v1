import React from 'react';
import { Container } from '../../atoms';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const ImageSwipe = ({ profilePic }) => {
    return (
        <Container.BasicView style={{ alignItems: "center", marginTop: 10, marginBottom: 10 }}>
            <LinearGradient
            colors={['#7790ED', '#B635FF']}
            start={[0, 0]} 
            end={[1, 1]} 
            style={{
                width: 305,
                height: 305,
                borderRadius: 150,
                justifyContent: 'center', 
                alignItems: 'center',
                padding: 4 
            }}
            >
            <Image
                source={{ uri: profilePic }} 
                style={{
                width: 300, 
                height: 300, 
                borderRadius: 150, 
                }} 
                resizeMode="cover"
            />
            </LinearGradient>
        </Container.BasicView>
    );
};

export default ImageSwipe;