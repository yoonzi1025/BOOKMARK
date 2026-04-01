import { FcReading } from "react-icons/fc";
import { FaBookReader, FaHome } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegStopCircle } from "react-icons/fa";
import { IoLibrary, IoSearch } from "react-icons/io5";
import { IoIosStats } from "react-icons/io";

export const STATUS_ICONS = {
  done: FcReading,
  reading: FaBookReader,
  want: FaHeart,
  stopped: FaRegStopCircle,
};

export const MOBILE_TAB_ICONS = {
  home: FaHome,
  search: IoSearch,
  library: IoLibrary,
  stats: IoIosStats,
};
