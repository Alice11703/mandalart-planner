Mandarat-Plans PRD (Product Requirements Document)

## 소개

만다라트 플래너 (Mandarat-Plans)는 목표 설정과 달성을 돕는 온라인 계획 도구입니다. 사용자가 핵심 목표를 중심으로 세부 목표를 체계적으로 수립하고 관리할 수 있습니다.

## 주요 기능

- 8x8 만다라트 보드 생성 및 관리
- 목표 진행 상황 트래킹
- 데이터 자동 저장
- 반응형 디자인

## 기술 스택

- Frontend: Next.js, TypeScript
- Styling: Tailwind CSS, Emotion
- Deployment: Vercel

## 문서

- [PRD (Product Requirements Document)](./docs/PRD.md)
- [Tips (만다라트 계획표 작성팁)](./docs/Tips.md)

--------------------

1. 개요

1.1 제품 설명
Mandarat-Plans는 사용자가 목표를 체계적으로 정리하고 시각화할 수 있는 만다라트 플래너 서비스입니다. 최소 기능을 갖춘 MVP를 우선 개발하며, 직관적인 UI/UX를 제공하는 것이 목표입니다.

1.2 목표

사용자 친화적인 만다라트 플래너 제공

계획 및 목표 설정을 쉽게 시각화하고 관리할 수 있도록 지원

AI 기반 계획 리뷰 기능 제공

반응형 웹 디자인으로 다양한 기기에서 원활한 사용 가능

1.3 주요 기능

중앙 코어그룹과 8개의 핵심그룹으로 구성된 만다라트 플래너 제공

localStorage를 활용한 데이터 저장

AI 리뷰 기능을 통한 실행 가능성 평가

PNG 저장 및 인쇄 기능 지원

반응형 UI 제공

별도의 로그인 기능 없음

2. 사용자 요구사항

2.1 타겟 사용자

목표 설정 및 관리가 필요한 일반 사용자

자기 계발 및 생산성을 높이고 싶은 직장인, 학생

체계적인 계획 수립이 필요한 창작자 및 기업가

2.2 사용자 시나리오

사용자는 올해의 목표를 설정하고, 세부 목표를 만다라트 플래너를 이용해 입력

작성한 계획을 AI 분석을 통해 실행 가능 여부 피드백 받음

필요에 따라 저장하거나 인쇄하여 활용

지속적으로 목표 진행 상황을 업데이트하고 관리

2.3 페인 포인트

목표 설정이 체계적으로 정리되지 않음

실행 가능한 계획인지 검토가 어려움

기존 만다라트 플래너의 디지털화된 버전 부족

모바일 및 웹에서 간편하게 접근할 수 있는 도구 부족

3. 기능 명세

3.1 핵심 기능

Mandarat Planner Core

3X3 정사각형 그리드 (총 9개 그룹)

중앙 코어그룹과 주변 8개의 핵심그룹

중앙 코어그룹 값이 각 핵심그룹 중앙과 동기화됨

각 핵심그룹의 중앙값도 중앙 코어그룹과 동기화됨

각 핵심그룹의 가운데 셀 및 코어그룹의 셀 컬러 선택 기능

코어그룹의 가운데 셀은 opacity: 0.5 적용

유저 데이터 관리

localStorage를 활용하여 새로고침 후에도 데이터 유지

헤더 및 타이틀

‘My Mandarat Plan’ 타이틀

올해의 목표 한마디 입력 필드 제공

툴바 기능

컬러 선택 Dropdown List

활용 팁 (Dialog 팝업)

전체 지우기 버튼 (초기화 기능)

PNG 저장 버튼 (이미지 변환 후 다운로드 기능)

인쇄하기 버튼 (프린트 최적화 기능 추가)

셀 입력 기능

클릭 시 active 스타일 추가 및 입력 Dialog 표시

입력 Dialog 구성: 헤더(현재 입력값), 바디(텍스트 입력), 푸터(버튼)

버튼 구성: 저장, 완료(토글 기능), 리셋

완료 시 해당 셀 스타일 변경 (비활성화 시 스타일 제거)

셀 클릭 시 입력 Dialog 내 textarea 자동 포커스 이동

textarea는 placeholder로 데이터 입력이 용이하도록 설정

ESC 키로 Dialog 닫기 가능, Enter 키로 저장 가능

아무 입력 없이 저장 버튼 클릭 시 기존 데이터 유지

3.3 기술 요구사항

모든 기능은 반응형으로 제작됨

AI API 연동을 위해 OpenAI API 활용

데이터 저장 방식으로 localStorage 사용

4. UI/UX 요구사항

4.1 디자인 가이드라인

미니멀하고 직관적인 UI 제공

사용자 친화적인 색상 및 폰트 적용

4.2 화면 구성

메인 화면: 만다라트 플래너 3X3 그리드

입력 Dialog: 셀 선택 시 나타나는 팝업

AI 리뷰 결과 화면

4.3 사용자 플로우

목표 입력 및 설정

세부 목표 추가 및 색상 지정

계획 실행 가능성 평가 (AI 리뷰)

계획 저장 및 인쇄

5. 기술 스택

5.1 프론트엔드

Next.js (App Router)

TailwindCSS

ShadCN

5.2 개발 도구

VS Code

GitHub

Figma (UI 디자인)

5.3 배포 환경

Vercel

## 프로젝트 구조

mandarat-plans/
├── public/ # 정적 파일
├── src/
├── app/
├── components/
├── styles/
└── utils/

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 연락처

- 이메일: hing9ugii@gmail.com
- 이슈: GitHub Issues를 통해 문의해주세요
