import { useRef, useState, useCallback, useEffect } from "react";
import { Animated, PanResponder, View } from "react-native";

import Card from '../Card/Index';
import Footer from "../Footer/Index";
import { ACTION_OFFSET, CARD } from "../utils/Constants";
import { pubg as pubgArray } from './Data';
import { styles } from './styles'

export default function Main() {
    const [pubg, setPubg] = useState(pubgArray);
    const swipe = useRef(new Animated.ValueXY()).current;
    const tiltSign = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (!pubg.length) {
            setPubg(pubgArray);
        }
    }, [pubg.length]);


    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, { dx, dy, y0 }) => {
            swipe.setValue({ x: dx, y: dy });
            tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1);
        },
        onPanResponderRelease: (_, { dx, dy }) => {
            const direction = Math.sign(dx);
            const isActionActive = Math.abs(dx) > ACTION_OFFSET;

            if (isActionActive) {
                Animated.timing(swipe, {
                    duration: 200,
                    toValue: {
                        x: direction * CARD.OUT_OFF_SCREEN,
                        y: dy,
                    },
                    useNativeDriver: true,
                }).start(removeTopCard);
            } else {
                Animated.spring(swipe, {
                    toValue: {
                        x: 0,
                        y: 0,
                    },
                    useNativeDriver: true,
                    friction: 5,
                }).start();
            }
        },
    });

    const removeTopCard = useCallback(() => {
        setPubg((prevState) => prevState.slice(1));
        swipe.setValue({ x: 0, y: 0 });
    },
        [swipe]
    );

    const handleChoice = useCallback(
        (direction) => {
            Animated.timing(swipe.x, {
                toValue: direction * CARD.OUT_OFF_SCREEN,
                duration: 400,
                useNativeDriver: true,
            }).start(removeTopCard);
        },
        [removeTopCard, swipe.x]
    )

    return (
        <View style={styles.container}>
            {pubg.map(({ name, source }, index) => {
                const isFirst = index === 0;
                const dragHandlers = isFirst ? panResponder.panHandlers : {};

                return (
                    <Card key={name}
                        name={name}
                        source={source}
                        isFirst={isFirst}
                        swipe={swipe}
                        tiltSign={tiltSign}
                        {...dragHandlers}
                    />
                );
            })
                .reverse()}

            <Footer handleChoice={handleChoice}/>
        </View>
    );
}