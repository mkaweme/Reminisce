import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Defs, ClipPath, Polygon, Image } from "react-native-svg";

interface HexagonImageProps {
  source: { uri: string };
  size?: number;
  shadowOffset?: number;
  shadowColor?: string;
}

const HexagonImage: React.FC<HexagonImageProps> = ({ 
  source, 
  size = 200,
  // shadowOffset = 8,
  // shadowColor = "#00000044",
}) => {
  const points = `
    ${size * 0.5},0 
    ${size},${size * 0.25}
    ${size},${size * 0.75}
    ${size * 0.5},${size}
    0,${size * 0.75},
    0,${size * 0.25}
  `;
  
  return (
    <View style={styles.hexagonContainer}>
      <Svg width={size} height={size}>
        <Defs>
          <ClipPath id="clipHexagon">
            <Polygon points={points} />
          </ClipPath>
        </Defs>
        {/* <Polygon
          points={points} 
          fill={shadowColor} 
          x={shadowOffset / 2}
          y={shadowOffset / 2}
        /> */}
        <Image 
          href={source.uri} 
          width={size} 
          height={size} 
          preserveAspectRatio="xMidYMid slice" 
          clipPath="url(#clipHexagon)" 
        />
      </Svg>
    </View>
  );
};

export default HexagonImage;

const styles = StyleSheet.create({
  hexagonContainer : {
    alignItems: "center",
    justifyContent: "center",
  },
});
