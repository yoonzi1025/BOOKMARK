# 📚 Re:Book

독서 기록을 관리하고, 데이터를 시각화하여 한눈에 확인할 수 있는 웹 애플리케이션


## 🚀 주요 기능

- 책 검색 및 상세 정보 조회 (Aladin API)
- 독서 상태 관리 (읽음 / 읽는 중 / 읽고 싶음 / 중단)
- 독서 기록 작성 (평점, 한줄평, 날짜)
- 통계 페이지 (월별 독서량, 상태별 비율)
- 달력을 통한 독서 기록 확인
- 검색 기능
- 반응형 UI (모바일 / 태블릿 / PC 지원)


## 📱 주요 페이지

🏠 Home
- 독서 현황을 한눈에 확인할 수 있는 메인 페이지
- 최근 읽은 책, 추천 도서, 인기 도서 제공

🔍 Search
- 키워드를 기반으로 도서 검색
- 검색 결과에서 상세 페이지로 이동 가능
  
📖 Book Detail
- 도서 상세 정보 확인
- 독서 상태, 평점, 한줄평, 기간 기록 가능
  
📚 My Library
- 독서 기록을 상태별로 관리
- 전체 / 읽음 / 읽는 중 / 읽고 싶음 / 중단 필터 제공
  
📊 Stats
- 월별 독서량 및 상태 비율 차트 제공
- 달력을 통해 날짜별 독서 기록 확인
  
🔐 Login
- 사용자 인증 페이지 (Firebase Auth)


## 🛠 기술 스택
Frontend
- React
- React Router
- Context API
- Chart.js
- Styled-components / CSS
  
Backend / Infra
- Firebase (Authentication)
- Firebase Functions
- Vercel

API
- Aladin Open API

## 📦 프로젝트 구조
<img width="299" height="176" alt="image" src="https://github.com/user-attachments/assets/5592b8cc-50f1-4d5c-a85c-a3354d73c0f4" />


## 🚨 트러블슈팅
1. 배포 후 React Router 경로 접근 시 404 오류
- 원인: SPA 라우팅이 서버에서 처리되지 않음
- 해결: vercel.json rewrite 설정 추가
---
2. 상세 페이지에서 isbn undefined 오류
- 원인: location.state 의존
- 해결: useParams() 기반으로 데이터 처리
---
3. 반응형 레이아웃 깨짐 문제
- 원인: 분기점 혼용 및 고정 크기 사용
- 해결: 반응형 기준 통일 및 유동 레이아웃 적용


## 💡 느낀 점
- SPA 배포 시 라우팅 처리 방식의 차이를 이해하게 되었다.
- 데이터 전달 방식에 따라 안정성이 달라진다는 것을 경험했다.
- 반응형은 스타일이 아닌 구조 설계의 문제라는 것을 깨달았다.

## ✨ 개선 예정
- Firebase Auth 로그인 기능 고도화
- 추천 알고리즘 개선
- TypeScript 적용
- 성능 최적화



