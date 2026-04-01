import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { AuthContext } from "../auth/AuthProvider";

export const RecordStateContext = createContext();
export const RecordDispatchContext = createContext();

function recordReducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.data;

    case "CREATE":
      return [action.data, ...state];

    case "UPDATE":
      return state.map((record) =>
        record.id === action.data.id ? { ...record, ...action.data } : record
      );

    case "DELETE":
      return state.filter((record) => record.id !== action.id);

    case "RESET":
      return [];

    default:
      return state;
  }
}

export default function RecordProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [records, dispatch] = useReducer(recordReducer, []);
  const { user, authLoading } = useContext(AuthContext);
  const idRef = useRef(1);

  const STORAGE_KEY = user ? `records_${user.uid}` : null;

  // 로드
  useEffect(() => {
    if (authLoading) return;

    if (!user || !STORAGE_KEY) {
      dispatch({ type: "RESET" });
      idRef.current = 1;
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const legacyData = localStorage.getItem("records");

    if (legacyData && STORAGE_KEY && !localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, legacyData);
    }

    const storedData = localStorage.getItem(STORAGE_KEY);

    if (!storedData) {
      dispatch({ type: "INIT", data: [] });
      idRef.current = 1;
      setIsLoading(false);
      return;
    }

    let parsedData;
    try {
      parsedData = JSON.parse(storedData);

      // 예전 bookId 데이터도 호환
      parsedData = parsedData.map((item) => ({
        ...item,
        isbn13: item.isbn13,
      }));
    } catch {
      setIsLoading(false);
      return;
    }

    if (!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });
    idRef.current = maxId + 1;

    dispatch({ type: "INIT", data: parsedData });
    setIsLoading(false);
  }, [user, authLoading, STORAGE_KEY]);

  // 저장
  useEffect(() => {
    if (isLoading) return;
    if (authLoading) return;
    if (!user || !STORAGE_KEY) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records, isLoading, user, authLoading, STORAGE_KEY]);

  const onCreate = ({
    isbn13,
    title,
    author,
    cover,
    categoryName,
    description,
    readingStatus,
    rating,
    comment,
    startDate,
    endDate,
  }) => {
    if (!user) return;

    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isbn13,
        title,
        author,
        cover,
        categoryName,
        description,
        readingStatus,
        rating,
        comment,
        startDate,
        endDate,
        createdDate: new Date().toISOString(),
      },
    });
  };

  const onUpdate = ({
    id,
    isbn13,
    title,
    author,
    cover,
    categoryName,
    description,
    readingStatus,
    rating,
    comment,
    startDate,
    endDate,
    createdDate,
  }) => {
    if (!user) return;

    dispatch({
      type: "UPDATE",
      data: {
        id,
        isbn13,
        title,
        author,
        cover,
        categoryName,
        description,
        readingStatus,
        rating,
        comment,
        startDate,
        endDate,
        createdDate,
      },
    });
  };

  const onDelete = (id) => {
    if (!user) return;
    dispatch({ type: "DELETE", id });
  };

  if (authLoading || isLoading) return <div>데이터 로딩중입니다...</div>;

  return (
    <RecordStateContext.Provider value={records}>
      <RecordDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
        {children}
      </RecordDispatchContext.Provider>
    </RecordStateContext.Provider>
  );
}
