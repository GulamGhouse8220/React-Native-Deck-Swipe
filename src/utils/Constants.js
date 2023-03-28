import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('screen');


export const CARD = {
    WIDTH: width * 0.9,
    HEIGHT: height * 0.78,
    BORDER_RADIUS: 20,
    OUT_OFF_SCREEN: width + 0.5 * width,
};

export const COLORS = {
    like: '#08eda6',
    nope: '#ff006f',
};

export const ACTION_OFFSET = 100;