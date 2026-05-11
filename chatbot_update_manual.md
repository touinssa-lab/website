# 🤖 로컬 스토리 챗봇 모델 업데이트 매뉴얼 (2026 Ver.)

이 문서는 투어리즘 인사이트 홈페이지의 챗봇 엔진(Google Gemini API) 업데이트 및 모델명 설정 규정을 정의합니다. 모델명 오설정으로 인한 서비스 중단을 방지하기 위해 아래 가이드를 엄격히 준수하십시오.

---

## 1. 모델 명칭 설정 규정 (Critical)

### 현재 표준 모델명
> **`gemini-3-flash-preview`**

### 규정 배경
*   **세대 교체**: 2026년 이후 제미나이 1.5 시리즈는 레거시로 분류되며, 3.0 엔진이 표준입니다.
*   **성능 최적화**: `flash-preview` 모델은 실시간 응답에 최적화된 고속 엔진으로, 챗봇의 인터랙션에 가장 적합합니다.
*   **호환성**: 이전 모델명(`gemini-1.5-flash` 등) 사용 시 API 호출 에러가 발생할 수 있습니다.

---

## 2. 코드 업데이트 위치

챗봇 엔진 호출 로직은 아래 파일의 `handleSend` 함수 내 API Endpoint 주소에서 관리합니다.

*   **파일 경로**: `src/components/AIGuideChat.tsx`
*   **수정 코드 예시**:
    ```typescript
    // ✅ 올바른 호출 방식
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`, { ... });
    ```

---

## 3. 업데이트 체크리스트

챗봇 모델을 업데이트하거나 수정할 때 다음 3가지를 반드시 확인하십시오.

1.  **API Key 유효성**: `VITE_GOOGLE_GEMINI_API_KEY`가 환경 변수에 올바르게 설정되어 있는지 확인.
2.  **모델명 오타 확인**: `gemini-3-flash-preview` 문자열에 오타가 없는지 확인 (특히 대시`-` 위치 주의).
3.  **Endpoint 버전**: 현재 `/v1beta/` 버전의 엔드포인트를 사용 중인지 확인.

---

## 4. 장애 대응 가이드

만약 챗봇이 응답하지 않고 에러가 발생한다면:
1.  **모델명 확인**: 구글 개발자 콘솔에서 해당 모델명이 여전히 지원되는지 확인합니다.
2.  **콘솔 로그 체크**: 브라우저 개발자 도구(F12)의 Network 탭에서 API 호출 응답 코드를 확인합니다.
    *   `404 Not Found`: 모델명이 틀렸을 확률이 높습니다.
    *   `403 Forbidden`: API Key 권한 문제일 확률이 높습니다.

---
**최종 수정일**: 2026-05-12
**관리팀**: 투어리즘 인사이트 AI Lab
