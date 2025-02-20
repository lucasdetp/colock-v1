import React, { useState, useEffect } from 'react';
import { Container, Button } from '../../atoms';
import SvgNop from "../../../assets/svg/nop";
import SvgYes from "../../../assets/svg/yes";
import SvgSave from "../../../assets/svg/save";
import SvgSaveFull from "../../../assets/svg/saveFull";
import SvgEclair from "../../../assets/svg/eclair";
import { Platform } from "react-native";

const ActionButtonSwipe = ({ simulateSwipeLeft, simulateSwipeRight, simulateSaveSwipe, swipedUserId }) => {
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setIsSaved(swipedUserId ? true : false);
    }, [swipedUserId]);

    const handleSaveSwipe = async () => {
        if (isSaved) {
            setIsSaved(false);
        } else {
            setIsSaved(true);
        }

        await simulateSaveSwipe();
    };

    return (
        <Container.BasicView
            style={{
                position: "absolute",
                bottom: Platform.OS === "ios" ? 80 : 50,
                left: 0,
                right: 0,
                flexDirection: "row",
                justifyContent: "space-around",
                paddingBottom: Platform.OS === "ios" ? 80 : 50,
            }}
        >
            <Button.SecondSwipe onPress={handleSaveSwipe}>
                {isSaved ? <SvgSaveFull /> : <SvgSave />}  
            </Button.SecondSwipe>
            <Button.Swipe onPress={simulateSwipeLeft}>
                <SvgNop />
            </Button.Swipe>
            <Button.Swipe onPress={simulateSwipeRight}>
                <SvgYes />
            </Button.Swipe>
            <Button.SecondSwipe onPress={simulateSwipeRight}>
                <SvgEclair />
            </Button.SecondSwipe>
        </Container.BasicView>
    );
};

export default ActionButtonSwipe;