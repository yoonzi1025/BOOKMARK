import { MOBILE_TAB_ICONS } from "./optionIcon";

export const STATUS_OPTIONS = [
  { key: "done", label: "읽은 책", sub: "다 읽었어요" },
  { key: "reading", label: "읽는 중", sub: "읽고 있어요" },
  { key: "want", label: "읽고 싶은 책", sub: "보고싶어요" },
  { key: "stopped", label: "중단한 책", sub: "멈춘 책" },
];

export const MOBILE_TAB_OPTIONS = [
  {
    key: "home",
    label: "홈",
    path: "/",
    icon: MOBILE_TAB_ICONS.home,
  },
  {
    key: "search",
    label: "검색",
    path: "/search",
    icon: MOBILE_TAB_ICONS.search,
  },
  {
    key: "library",
    label: "내 서재",
    path: "/library",
    icon: MOBILE_TAB_ICONS.library,
  },
  {
    key: "stats",
    label: "기록",
    path: "/stats",
    icon: MOBILE_TAB_ICONS.stats,
  },
];
