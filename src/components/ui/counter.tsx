import {
  MotionValue,
  motion,
  useMotionValue,
  useTransform,
  animate,
  useVelocity,
  useSpring,
} from "motion/react";
import type { Easing } from "motion-utils";
import type React from "react";
import { useEffect } from "react";

type PlaceValue = number | "." | ",";
type CounterEasing = Easing | Easing[];

const DEFAULT_EASING: Easing = [0.16, 1, 0.3, 1];
const getDefaultDuration = (distance: number) =>
  2 + Math.abs(distance) * 0.00005;

interface NumberProps {
  mv: MotionValue<number>;
  number: number;
  height: number;
}

function Number({ mv, number, height }: NumberProps) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });

  const baseStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return <motion.span style={{ ...baseStyle, y }}>{number}</motion.span>;
}

interface DigitProps {
  place: number;
  value: number;
  height: number;
  recoilThreshold: number;
  duration?: number;
  easing: Easing;
  recoilEasing?: CounterEasing;
  digitStyle?: React.CSSProperties;
}

function Digit({
  place,
  value,
  height,
  recoilThreshold,
  duration: durationOverride,
  easing,
  recoilEasing,
  digitStyle,
}: DigitProps) {
  const valueRoundedToPlace = Math.floor(value / place);
  const animatedValue = useMotionValue(valueRoundedToPlace);

  const velocity = useVelocity(animatedValue);

  // Optional, but makes blur less jittery
  const smoothVelocity = useSpring(velocity, {
    stiffness: 300,
    damping: 35,
  });

  const blur = useTransform(smoothVelocity, (latest) => {
    const amount = Math.min(Math.abs(latest) * 0.15, 6);
    return `blur(${amount * 0.5}px)`;
  });

  useEffect(() => {
    const currentValue = animatedValue.get();
    const distance = valueRoundedToPlace - currentValue;
    const duration = durationOverride ?? getDefaultDuration(distance);
    const recoilDuration = 0.3;
    const recoilTime = Math.min(recoilDuration / duration, 0.45);
    const shouldRecoil = Math.abs(distance) >= recoilThreshold;
    const resolvedRecoilEasing = recoilEasing ?? ["easeOut", easing];

    const controls = shouldRecoil
      ? animate(
          animatedValue,
          [
            currentValue,
            currentValue - Math.sign(distance) * 0.25,
            valueRoundedToPlace,
          ],
          {
            type: "tween",
            duration,
            times: [0, recoilTime, 1],
            ease: resolvedRecoilEasing,
          },
        )
      : animate(animatedValue, valueRoundedToPlace, {
          type: "tween",
          duration,
          ease: easing,
        });

    return () => controls.stop();
  }, [
    animatedValue,
    durationOverride,
    easing,
    recoilEasing,
    recoilThreshold,
    valueRoundedToPlace,
  ]);

  const defaultStyle: React.CSSProperties = {
    height,
    position: "relative",
    width: "1ch",
    fontVariantNumeric: "tabular-nums",
    willChange: "filter",
  };

  return (
    <motion.span
      className="relative inline-flex overflow-hidden"
      style={{
        ...defaultStyle,
        ...digitStyle,
        filter: blur,
      }}
    >
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </motion.span>
  );
}
interface CounterProps {
  value: number;
  fontSize?: number;
  padding?: number;
  places?: PlaceValue[];
  gap?: number;
  borderRadius?: number;
  horizontalPadding?: number;
  textColor?: string;
  fontWeight?: React.CSSProperties["fontWeight"];
  containerStyle?: React.CSSProperties;
  counterStyle?: React.CSSProperties;
  digitStyle?: React.CSSProperties;
  gradientHeight?: number;
  gradientFrom?: string;
  gradientTo?: string;
  topGradientStyle?: React.CSSProperties;
  bottomGradientStyle?: React.CSSProperties;
  recoilThreshold?: number;
  duration?: number;
  easing?: Easing;
  recoilEasing?: CounterEasing;
}

export default function Counter({
  value,
  fontSize = 100,
  padding = 0,
  places = [...value.toString()].map((ch, i, a) => {
    if (ch === ".") {
      return ".";
    }

    const dotIndex = a.indexOf(".");
    const isInteger = dotIndex === -1;

    const exponent = isInteger
      ? a.length - i - 1
      : i < dotIndex
        ? dotIndex - i - 1
        : -(i - dotIndex);

    return 10 ** exponent;
  }),
  gap = 8,
  borderRadius = 4,
  horizontalPadding = 8,
  textColor = "inherit",
  fontWeight = "inherit",
  containerStyle,
  counterStyle,
  digitStyle,
  gradientHeight = 16,
  gradientFrom = "black",
  gradientTo = "transparent",
  topGradientStyle,
  bottomGradientStyle,
  recoilThreshold = 5,
  duration,
  easing = DEFAULT_EASING,
  recoilEasing,
}: CounterProps) {
  const height = fontSize + padding;

  const defaultContainerStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-block",
  };

  const defaultCounterStyle: React.CSSProperties = {
    fontSize,
    display: "flex",
    gap,
    overflow: "hidden",
    borderRadius,
    paddingLeft: horizontalPadding,
    paddingRight: horizontalPadding,
    lineHeight: 1,
    color: textColor,
    fontWeight,
  };

  const gradientContainerStyle: React.CSSProperties = {
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const defaultTopGradientStyle: React.CSSProperties = {
    height: gradientHeight,
    background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
  };

  const defaultBottomGradientStyle: React.CSSProperties = {
    height: gradientHeight,
    background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
  };

  return (
    <span style={{ ...defaultContainerStyle, ...containerStyle }}>
      <span style={{ ...defaultCounterStyle, ...counterStyle }}>
        {places.map((place) =>
          place == "." || place == "," ? (
            <span
              key={place}
              className="relative inline-flex items-center justify-center"
              style={{ height, width: "fit-content", ...digitStyle }}
            >
              {place}
            </span>
          ) : (
            <Digit
              key={place}
              place={place}
              value={value}
              height={height}
              recoilThreshold={recoilThreshold}
              duration={duration}
              easing={easing}
              recoilEasing={recoilEasing}
              digitStyle={digitStyle}
            />
          ),
        )}
      </span>
      <span style={gradientContainerStyle}>
        <span style={topGradientStyle ?? defaultTopGradientStyle} />
        <span style={bottomGradientStyle ?? defaultBottomGradientStyle} />
      </span>
    </span>
  );
}
