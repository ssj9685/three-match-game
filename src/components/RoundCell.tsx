import { motion } from "framer-motion";
import { CellPart } from "../domain/Cell";

const size = "12.5%";
const margin = "2px";
const transition = "top 0.3s ease, left 0.3s ease";

type RoundCellProps = {
  backgroundColor: string;
  color: string;
  selected: boolean;
  x: number;
  y: number;
  top: number;
  left: number;
  zIndex: number;
  icon: CellPart["icon"];
  select: (x: number, y: number) => void;
};

export default function RoundCell(props: RoundCellProps) {
  const {
    backgroundColor,
    color,
    selected,
    x,
    y,
    top,
    left,
    zIndex,
    icon: Icon,
    select,
  } = props;

  return (
    <motion.div
      whileHover={{ scale: 1.1, opacity: 0.8 }}
      whileTap={{ scale: 0.8 }}
      animate={{ scale: selected ? 1.1 : 1, opacity: selected ? 0.8 : 1 }}
      style={{
        backgroundColor: backgroundColor,
        top: top + "%",
        left: left + "%",
        zIndex: zIndex,

        position: "absolute",
        cursor: "pointer",
        borderRadius: "65px",
        margin: margin,
        height: `calc(${size} - 4px)`,
        width: `calc(${size} - 4px)`,
        WebkitTransition: transition,
        msTransition: transition,
        transition,
        color: "black",
      }}
      onClick={() => {
        select(x, y);
      }}
    >
      {Icon && (
        <Icon
          style={{
            color,
            width: "50%",
            height: "50%",
            margin: "25%",
          }}
        />
      )}
    </motion.div>
  );
}
