# SpringBoot-React-project
스프링 부트 + 리액트 - 웹페이지

## 💡 프로젝트 소개
사용자 선택에 따른 요양병원 찾기 웹 서비스

## 🕰️ 개발 기간
* 24.08.05. - 24.08.21.

## ⚙️ 개발 환경
- `Java 17.0.10`
- `JDK 17.0.10 `
- **React** : 18.2.0
- **IDE** : STS4
- **Framework** : Springboot(2.x)
- **Database** : MySQL(8.0.37)

## 📌 주요 기능

#### 로그인 
- E-mail, PW - DB값 검증
- 로그인 시 세션(Session) 담은 쿠키 생성
  
#### 회원가입 
- 주소 API 연동
- 닉네임, E-mail  중복 체크
  
#### 마이 페이지
- 주소 API 연동
- 회원 개인정보 
- 내가 찜한 병원 보기, 찜 해제 및 세부정보 바로 보기
- 내가 작성한 게시판 글

#### 병원 찾기
- 필수: 지역 선택(1차:시/도 선택, 2차:시/군/구 선택)
- 추가: 전문의 선택
- 추가: 병원 인력 선택
- 검색 후 사용자 선택에 따른 병원 리스트 출력
  
#### 병원 세부정보 페이지
- 주소 API 연동
- Kakao API 연동
- 병원 세부정보 및 지도 출력
- 찜하기 기능으로 사용자 세션에 찜 병원 저장

#### 백과사전 페이지
- 공공데이터 API -> json 변환 출력
 
#### 커뮤니티 게시판 및 QnA 게시판 
- 사용자 권한에 따른 글 작성, 읽기, 수정, 삭제(CRUD)
- 댓글 작성, 관리자만 답변 작성





 
|Home|검색|병원 리스트|병원 정보|
|---|---|---|---|
|![image](https://github.com/user-attachments/assets/9b9edf92-73c9-4a6b-b944-daa79babfd22)|![image](https://github.com/user-attachments/assets/7946195f-34f4-4349-ae17-09cc8a6caf22)|![image](https://github.com/user-attachments/assets/d7277665-9476-4182-8f4c-a78d07f37adf)|![image](https://github.com/user-attachments/assets/70c3a9a8-3d26-43ec-b0c9-edf7c2e23b54)|
|버튼 클릭 Link 연결|사용자 선택|선택에 따른 병원 리스트|세부정보, 지도, 찜하기|

|건강백과사전|커뮤니티 게시판|QnA 게시판|마이페이지|
|---|---|---|---|
|![image](https://github.com/user-attachments/assets/cbf8d215-d725-4f92-8f04-34539fa54293)|![image](https://github.com/user-attachments/assets/00504f82-c2c2-4a2b-8202-9f5f47f82fdc)|![image](https://github.com/user-attachments/assets/371ea399-2494-48f8-8f50-12a76e5eb999)|![image](https://github.com/user-attachments/assets/e6c4485e-8dd4-4aae-bc41-6d85399ea0b8)|
|건강 정보 출력|게시글 CRUD 및 댓글 작성|관리자 권한 답변 작성|개인정보 및 찜한 병원(해제) 작성글|


[![Watch the video](https://img.youtube.com/vi/ccOyTW125Is/maxresdefault.jpg)](https://www.youtube.com/watch?v=drF5rMgZzB0)
CAREFINDER 웹 페이지 시연 영상입니다.





## Project Summary

### Aug 5, 2024
- 프로젝트 리포지토리 관리 시작
- 홈 화면 구성을 위한 HTML 및 CSS 정적 페이지 구현

### Aug 6, 2024
- 홈 페이지 화면 구성 완료
- 네비게이트와 루트를 사용하여 홈에서 루트 이동 연결 구현
- `/find` 페이지에서 병원 리스트를 카드 형태로 출력 (API 연결 전 구현)
- Find, List, Card 컴포넌트 구현

### Aug 7, 2024
- `/find` 페이지: 병원 API 정보를 바탕으로 전문의 정보 추출 시도했으나
- 서버 측의 차단으로 접근 불가 확인
    => 병원의 요양 기호를 추출하여 API 접근
    => 상위 10개의 과를 추출하여 샘플링, DB에 입력
- 백엔드가 구성한 서버 주소로 클라이언트-서버-DB 연결 구성 시도
- GitHub 충돌 관리: Merge 개념으로 동시작업 상태 관리
  
### Aug 8, 2024
- `/health` 페이지: API 추출 시도
  - 파이썬 코드 작성, 병원 요양기호 추출 및 API 요청 시도했으나
  - API 제공 질병관리청의 CORS 정책-서비스 키의 호출 제한 확인
    => XML 파싱하여 구현
- 회원가입 폼 작성
- `/find` 페이지에서 전문의 부분 UI 수정
- `/find` 페이지에서 시/도 선택 시 시/군/구의 선택 옵션이 변경되도록 시도(쿼리 재작성 필요)

### Aug 9, 2024
- signup과 signbar가 생기면서 CSS의 충돌 수정
- 로그인 세션 방식으로 백엔드 서버와 연결
- 게시판 백엔드 서버와 연결

### Aug 12, 2024
- 카카오맵 API 활용하여 병원 세부정보에 출력되도록 시도
- 게시판에서 로그인 권한 확인하도록 구현
- footer, 건강백과사전 페이지 UI 수정
- `/find`의 지역 검색 시 props 수정하여 시/도 선택 시 시/군/구의 선택 옵션이 변경되도록 구현

### Aug 13, 2024
- 뉴스 클릭 시 URL 변경 대신 싱글페이지에서 상태 관리 활용하여 사용자 경험 개선
-  `/find`에서 사용자가 선택에 따른 병원 리스트 출력 구현
- 게시판에 필요한 로그인 세션 정보 저장 시도

### Aug 14, 2024
- 목업 데이터로 카드 리스트 및 카드 상세 출력 여부 테스트
- 카카오맵 API 테스트 및 충돌 발생: `fetch 8080`과의 충돌로 지도 로딩 문제
    => 카드 상태가 업데이트 될 때, initializeMap(지도 초기화) 로 의존성 순서 명시하여 해결
- 커뮤니티 및 게시판 UI 대규모 수정

### Aug 16, 2024
- 건강백과사전 페이지 XML 파싱 대신 JSON 사용으로 코드 간결화
- login 세션 확인 시 충돌로 인하여 실패

### Aug 18, 2024
- 로그인 후 새로고침 해야만 사용자 정보를 가져오던 세션 오류 해결
     => 체크세션 함수를 authUtils로 임포트해서 사용하여 해결
- 커뮤니티 게시판 글쓰기 및 댓글달기(로그인 확인) 구현

### Aug 19, 2024
- 조회수 기능 커뮤니티 게시판에 출력 추가 
- 게시판에 카테고리별 셀렉트박스 추가 및 사용자 검색 기능 개선
- 페이징 기능 추가: 10개 항목별로 페이지 이동
- 네비바에 `checkSession` 기능 추가하여 클릭 시 세션 확인하도록 개선
- 마이페이지 개발 진행 중
  
### Aug 20, 2024
- 마이페이지 구현(내가 찜한 병원, 내가 쓴 글 보기)

### Aug 21, 2024
- 찜하기, 글쓰기 버튼 클릭 시 사용자 세션 확인 과정 추가
- 카카오지도 마커 클릭 시 길찾기 팝업창 생성

