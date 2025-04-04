import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import 
Animated, 
{
  useAnimatedProps, 
  useAnimatedStyle, 
  useSharedValue, 
  withDelay, 
  withSpring, 
  withTiming 
}
  from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const CIRCUMFERENCE = 1000;
const RADIUS = CIRCUMFERENCE / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const CheckMark = () => {

  const circleProgress = useSharedValue(1);
  const scale = useSharedValue(1);
  const filledCircleOpacity = useSharedValue(0);
  const checkMarkOpacity = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCUMFERENCE * circleProgress.value,
  }));

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: filledCircleOpacity.value,
    };
  });

  useEffect(() => {
    circleProgress.value = withTiming(0, { duration: 2000 });
    scale.value = withDelay(1000, withSpring(80, { duration: 1000 }));
    filledCircleOpacity.value = withDelay(1000, withTiming(1));
    checkMarkOpacity.value = withDelay(1500, withTiming(1, { duration: 500 }));
  },[]);

  return (
    <View style={styles.container}>
      <Text>Your order has been placed!!</Text>
      <Svg width={width} height={height}>
        <Circle 
          cx={width / 2} 
          cy={height / 2} 
          r={RADIUS} 
          stroke={"#404258"} 
          strokeWidth={30}
          fill={"none"}
        />
        <AnimatedCircle 
          cx={width / 2} 
          cy={height / 2} 
          r={RADIUS} 
          stroke={"#82cd47"} 
          strokeWidth={15}
          strokeDasharray={CIRCUMFERENCE}
          animatedProps={animatedProps}
          strokeLinecap={"round"}
          fill={"none"}
        />
      </Svg>
      <Animated.View 
        style={[ 
          styles.innerCircle, 
          reanimatedStyle, 
        ]}
      />
      <Svg viewBox="0 0 40 40" style={styles.checkMark}>
        <AnimatedPath 
          d="M12.5 20l5 5 9-9" 
          stroke={"#ffffff"} 
          strokeWidth={2} 
          strokeLinecap="round" 
          fill={"none"}
          animatedProps={useAnimatedProps(() => ({
            opacity: checkMarkOpacity.value,
          }))}
        />
      </Svg>
    </View>
  );
};

export default CheckMark;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "yellow",
  },
  innerCircle: {
    position: "absolute",
    width: 3,
    height: 3,
    borderRadius: 150,
    backgroundColor: "#54b325",
  },
  checkMark: {
    position: "absolute",
  }
});
