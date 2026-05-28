# 🤖 로컬 스토리 챗봇 모델 업데이트 매뉴얼 (2026 Ver.)

이 문서는 투어리즘 인사이트 홈페이지의 챗봇 엔진(Google Gemini API) 업데이트 및 모델명 설정 규정을 정의합니다. 모델명 오설정으로 인한 서비스 중단을 방지하기 위해 아래 가이드를 엄격히 준수하십시오.

---

## 1. 모델 명칭 설정 규정 (Critical)

### 현재 표준 모델명
> **`gemini-2.5-flash`**

### 규정 배경
*   **세대 교체**: 2026년 이후 제미나이 1.5 시리즈는 레거시로 분류되며, 3.0 엔진이 표준입니다.
*   **성능 최적화**: `flash-preview` 모델은 실시간 응답에 최적화된 고속 엔진으로, 챗봇의 인터랙션에 가장 적합합니다.
*   **호환성**: 이전 모델명(`gemini-1.5-flash` 등) 사용 시 API 호출 에러가 발생할 수 있습니다.

---

## 2. 코드 업데이트 위치 및 아키텍처 (보안 강화)

챗봇 엔진 호출 시 API Key 유효성 및 보안을 위해 클라이언트에서 직접 호출하지 않고, **서버리스 API 프록시(`/api/chat`)**를 통해 호출합니다.

*   **프론트엔드 파일 경로**: `src/components/AIGuideChat.tsx`
*   **백엔드 프록시 파일 경로**: `api/chat.ts`
*   **프론트엔드 호출 방식**:
    ```typescript
    // ✅ 보안이 강화된 백엔드 프록시 호출 방식
    const response = await fetch(`/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: systemInstruction },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
          { role: 'user', content: userMessage }
        ]
      })
    });
    ```

---

## 3. 업데이트 체크리스트

챗봇 모델을 업데이트하거나 수정할 때 다음 3가지를 반드시 확인하십시오.

1.  **API Key 보안**: API Key는 클라이언트(브라우저)에 절대 노출되어서는 안 됩니다. `VITE_GOOGLE_GEMINI_API_KEY` 대신 서버 전용 환경변수인 `GEMINI_API_KEY` 또는 `GOOGLE_GEMINI_API_KEY`로 서버(Vercel 등) 환경에만 설정하십시오.
2.  **모델명 변경**: 모델명을 변경하고자 할 때는 서버 사이드 코드(`api/chat.ts`)에서 API 호출 엔드포인트를 수정하십시오. (기본 모델: `gemini-2.5-flash`)
3.  **에러 핸들링**: 클라이언트 코드(`AIGuideChat.tsx`)에서 `/api/chat`이 반환하는 JSON의 `error` 필드 및 HTTP 상태코드를 적절히 처리하고 있는지 확인하십시오.

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
