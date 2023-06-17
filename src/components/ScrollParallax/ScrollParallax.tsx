import { useRef, FC, ReactNode } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  Variants
} from "framer-motion";
import { wrap } from "@motionone/utils";

import classes from './ScrollParallax.module.scss'

interface IParallaxProps {
  children: ReactNode;
  baseVelocity: number;
  className?: string;
}
const ScrollParallax: FC<IParallaxProps> = ({ children, baseVelocity, className }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const transformX = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((timestamp, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });
  const inParallaxView: Variants = {
    "hidden": {
      visibility: 'hidden',

    },
    "visible": {
      visibility: 'visible',
      transition: {
        staggerChildren: .07
    }
    }
  }
  const scrollerHide: Variants = {
    "hidden": {
      display: 'none',

    },
    "visible": {
      display: 'flex'

    }
  }
  return (
    <motion.div
      className={[classes.parallax, className ? className : ''].join(' ')}
      variants={inParallaxView}
      initial={"hidden"}
      whileInView={"visible"}
      
      viewport={{ margin: '350px' }}
    >
      <motion.div
        className={classes.scroller}
        style={{ x: transformX }}
        variants={scrollerHide}
      >
        {children}
        {children}
      </motion.div>
    </motion.div>
  );
}

export default ScrollParallax