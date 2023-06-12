import logo from "@assets/logo_vaku.png";
import { Center } from "@chakra-ui/react";
import { motion, useCycle } from "framer-motion";
import { useEffect, useRef } from "react";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 1,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};
export default function Loading() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  // Loader bootstrap
  return (
    <motion.div
      exit={"closed"}
      animate={"open"}
      initial={false}
      custom={height}
      ref={containerRef}
    >
      <Center
        h="100vh"
        style={{
          background: "#0B79F4",
          // "linear-gradient(180deg, #0B79F4 0%, rgb(0, 153, 255) 100%)",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            background: "white",
            width: "100vw",
            height: "100vh",
          }}
          variants={sidebar}
        />

        <motion.img
          variants={variants}
          whileHover={{ scale: 1.1 }}
          src={logo}
          width={"10%"}
          onClick={() => toggleOpen()}
          style={{ position: "absolute" }}
        />
      </Center>
    </motion.div>
  );
}

export const Navigation = () => (
  <motion.div variants={variants} style={{ background: "black" }}>
    <img src={logo} width={"10%"} />
  </motion.div>
);

export const useDimensions = (ref) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth;
    dimensions.current.height = ref.current.offsetHeight;
  }, []);

  return dimensions.current;
};
