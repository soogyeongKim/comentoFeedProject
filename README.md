📌 **반응형 웹**

- **PC**

- **Tablet/Mobile**: 768px 이하

📌 **피드 컨텐츠**

- 글자 수가 많으면 자르고 생략기호(...) 표시 (o)

- 컨텐츠 불러오기 (infinite-loading)

- 처음에 10개만 불러오기 (o)

- 스크롤이 최하단에 닿을 때마다 리스트에 10개씩 추가 (o)

📌 **정렬 (오름차순, 내림차순)**

- 선택한 정렬순으로 리스트 불러오기 (o)

- 선택된 정렬만 css 강조하기 (o)

- 기본값: 오름차순 (o)

📌 **필터 (modal)**

- 별도 컴포넌트로 분리하여 개발 (o)

- input type="checkbox" (o)

- 기본값: 모두 선택 (o)

- 저장을 클릭하면 저장되고 모달이 종료됨 (o)

📌 **광고 삽입**

- 4번째마다 광고 1개 삽입 (o)

- 광고 이미지 비율 유지 (o)

- 글자 수가 많으면 자르고 생략기호(...) 표시 (o)

📌 **디테일 페이지**

- 피드에서 카드를 클릭하면 디테일 페이지로 이동(/:id) (o)

📌 **고객센터 대응**

- 피드 시스템을 사용한 고객들이 남긴 의견을 반영하기

---

**요구 사항 리스트 요약**

1.광고

- 광고 가리기 > 유료 서비스로 제공 > 기획단 회의 (낮음)
- 광고 이미지 로딩 > 실구현 (높음)

  2.무한스크롤

- 로딩 UI > 실구현 (높음) ✅
- 리스트 더보기 버튼 구현 > 기획단 회의 필요 (낮음) ✅

  3.글

- 컨텐츠의 의미 이해 > 레이블 추가 여부 디자인 회의 필요 (낮음)
- 컨텐츠 미리보기 내용 확대 > UI 수정 디자인 회의 필요 (낮음)
- 드래그 방지 (낮음) ✅

  4.필터

- 필터 적용 후 기능 강조 > UI 수정 디자인 회의 필요 (보통)
- 필터 저장 > 캐시에 저장 (보통) ✅
- 검색 기능 개발 > 개발, 디자인 회의 필요 (보통) ✅

  5.속도

  6.브라우저 호환성 (중요) ✅

**QA**

- page : main / case : mobile safari 에서 infinite loading 실행 안됨 ✅
- page : detail, main / case : 내림차순 선택 > 컨텐츠 클릭 > 뒤로가기 > 리스트 내림차순으로 보이나
  필터 초기화 ✅
