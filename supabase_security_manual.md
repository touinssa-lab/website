# Supabase DB 보안 및 운영 매뉴얼 (v1.0)

본 매뉴얼은 2026년 10월 30일부터 시행되는 Supabase의 명시적 권한 부여(Explicit Grant) 정책을 준수하기 위한 가이드입니다.

## 1. 신규 테이블 생성 시 필수 프로세스
새로운 테이블을 생성할 때는 `CREATE TABLE` 이후 반드시 아래 권한 부여(GRANT) 과정을 거쳐야 합니다. 명시적 권한이 없으면 `supabase-js` 등 API를 통한 접근 시 **42501 에러**가 발생합니다.

### [Step 1] 테이블 생성 (예시)
```sql
CREATE TABLE public.my_new_table (
  id bigint primary key generated always as identity,
  title text not null,
  user_id uuid references auth.users(id),
  created_at timestamptz default now()
);
```

### [Step 2] 권한 부여 (필수)
테이블의 성격에 따라 필요한 권한을 부여합니다.

| 대상 (Role) | 용도 | 필수 SQL 명령 |
| :--- | :--- | :--- |
| **anon** | 로그인 전 방문자 | `GRANT SELECT ON ... TO anon;` |
| **authenticated** | 로그인 완료된 회원 | `GRANT SELECT, INSERT, UPDATE ON ... TO authenticated;` |
| **service_role** | 관리자/서버 스크립트 | `GRANT ALL ON ... TO service_role;` |

### [Step 3] 자동 증가 ID(Sequence) 권한 부여
ID가 자동 증가하는 테이블의 경우, 데이터 입력을 위해 시퀀스 권한도 함께 주어야 합니다.
```sql
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
```

### [Step 4] RLS 활성화 및 정책 추가
권한(GRANT)을 주었더라도 행 단위 보안(RLS)을 통해 실제 접근을 세밀하게 제어해야 합니다.
```sql
-- RLS 활성화
ALTER TABLE public.my_new_table ENABLE ROW LEVEL SECURITY;

-- 정책 예시: 누구나 읽기 가능
CREATE POLICY "Public read access" ON public.my_new_table FOR SELECT USING (true);

-- 정책 예시: 본인 데이터만 수정 가능
CREATE POLICY "User update access" ON public.my_new_table FOR UPDATE 
TO authenticated USING (auth.uid() = user_id);
```

## 2. 정기 점검 가이드
1.  **Security Advisor 활용**: Supabase 대시보드 > 사이드바 하단 'Advisors' > **Security Advisor**를 클릭하여 "Missing Grants" 항목이 있는지 수시로 확인합니다.
2.  **API 에러 체크**: 웹사이트에서 데이터를 불러오지 못할 때 브라우저 콘솔(F12)에 `42501` 에러 코드가 보인다면 권한 부여(`GRANT`)가 누락된 것입니다.

---
최종 업데이트: 2026-05-14
작성자: Antigravity AI Assistant
