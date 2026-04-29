// @ts-nocheck
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import {
  Card, SectionHeader, ProgressBar, NavButtons,
  RadioGroup, CheckboxPills, RankSelect,
  LikertTable, AmountInput, TotalRow,
} from './ui';
import {
  REGIONS, STAY_TYPES, ACTIVITIES, OVERSEAS_ACTIVITIES,
  INFO_SOURCES, WEB_CHANNELS, DEST_REASONS, COMPANION_TYPES,
  SATISF_ITEMS, POSITIVE_EFFECTS, NO_TRAVEL_REASONS,
  SATISFACTION_LABELS, AGREE_LABELS, INTENT_LABELS,
  INCOME_BANDS, OCCUPATIONS,
} from './data';

/* ─────────────────────────────────────────────────────────
   라우팅 계산
   ───────────────────────────────────────────────────────── */
function getFlow(travelTypes = []) {
  const hasDomestic = travelTypes.includes('domestic_tourism');
  const hasOverseas = travelTypes.includes('overseas');
  const hasNone     = travelTypes.includes('none');

  let flow = ['screening'];
  if (hasDomestic) flow = [...flow, 'd1', 'd2', 'd3', 'd4', 'd5'];
  if (hasOverseas)  flow = [...flow, 'overseas'];
  if (!hasDomestic && travelTypes.length > 0) flow = [...flow, 'notravel'];
  flow = [...flow, 'demo', 'complete'];
  return flow;
}

/* ─────────────────────────────────────────────────────────
   메인 컴포넌트
   ───────────────────────────────────────────────────────── */
export default function TravelSurvey({ surveyMonth = "2026년 4월" }) {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [ans, setAns] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [stepIndex]);

  const set = useCallback((key, val) => setAns(prev => ({ ...prev, [key]: val })), []);

  const travelTypes = ans.travelTypes || [];
  const flow = getFlow(travelTypes);
  const currentKey = flow[stepIndex] || 'complete';

  // 스텝 표시용 (screening 제외, complete 제외)
  const contentSteps = flow.filter(k => k !== 'screening' && k !== 'complete');
  const displayStepIndex = contentSteps.indexOf(currentKey) + 1;
  const totalDisplaySteps = contentSteps.length;

  const next = () => setStepIndex(i => Math.min(i + 1, flow.length - 1));
  const prev = () => setStepIndex(i => Math.max(i - 1, 0));

  const nowDate = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' });

  /* ── 제출 ────────────────────────────────────────────── */
  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id || null;

      const { error } = await supabase.from('survey_responses').insert({
        survey_id: 'national-travel-2026-04',
        user_id: userId,
        responses: { travelTypes, ...ans }
      });

      if (error) throw error;
      
      navigate('/survey/thank-you');
    } catch (err: any) {
      setSubmitError(err.message || '서버 오류가 발생했습니다. 다시 시도해 주세요.');
      setSubmitting(false);
    }
  }

  /* ══════════════════════════════════════════════════════
     SCREEN: 스크리닝
     ══════════════════════════════════════════════════════ */
  if (currentKey === 'screening') {
    const types = [
      { key: 'domestic_tourism', label: '국내 관광·휴양 여행',  desc: '관광, 레저, 휴식 등을 주목적으로 한 국내 여행' },
      { key: 'domestic_business', label: '국내 출장·업무 여행',  desc: '출장, 업무를 주목적으로 한 국내 여행' },
      { key: 'domestic_visit',    label: '국내 귀성·친지 방문', desc: '귀성, 단순 친구·친지 방문을 주목적으로 한 국내 여행' },
      { key: 'overseas',          label: '해외 여행',           desc: '관광·출장 등 목적의 해외 여행' },
      { key: 'none',              label: '여행 없음',           desc: '이번 달 현 거주지역을 벗어난 여행 경험이 없음' },
    ];
    const sel = travelTypes;
    const toggle = (k) => {
      if (k === 'none') {
        set('travelTypes', sel.includes('none') ? [] : ['none']);
        return;
      }
      const filtered = sel.filter(v => v !== 'none');
      set('travelTypes', filtered.includes(k) ? filtered.filter(v => v !== k) : [...filtered, k]);
    };

    return (
      <div>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 19, fontWeight: 700, color: '#1a1a2e', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
            이번 달 여행 경험
          </h2>
          <p style={{ fontSize: 13, color: '#718096' }}>
            {nowDate} 동안 현 거주지역을 벗어나 다른 지역으로 다녀오신 여행을 모두 선택해 주세요.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {types.map(({ key, label, desc }) => {
            const s = sel.includes(key);
            return (
              <label key={key} style={{
                display: 'flex', alignItems: 'flex-start', gap: 14, cursor: 'pointer',
                padding: '14px 16px', borderRadius: 12,
                border: `1.5px solid ${s ? '#1B4FA8' : '#e2e8f0'}`,
                background: s ? '#EEF3FC' : '#fff',
                transition: 'all 0.15s',
              }}>
                <input
                  type="checkbox"
                  checked={s}
                  onChange={() => toggle(key)}
                  style={{ marginTop: 3, width: 17, height: 17, flexShrink: 0 }}
                />
                <div>
                  <p style={{ margin: '0 0 3px', fontSize: 14, fontWeight: s ? 700 : 400, color: s ? '#1B4FA8' : '#1a1a2e' }}>{label}</p>
                  <p style={{ margin: 0, fontSize: 12, color: '#718096' }}>{desc}</p>
                </div>
              </label>
            );
          })}
        </div>

        <NavButtons showPrev={false} onNext={next} nextLabel="다음 →" disabled={sel.length === 0} />
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════
     SCREEN: 국내 관광여행 — 기본 정보 (D1)
     ══════════════════════════════════════════════════════ */
  if (currentKey === 'd1') {
    return (
      <div>
        <ProgressBar current={displayStepIndex} total={totalDisplaySteps} />
        <SectionHeader step={displayStepIndex} total={totalDisplaySteps}
          title="국내 관광여행 — 기본 정보"
          subtitle="최근 다녀오신 국내 관광·휴양 여행에 대해 응답해 주세요." />

        <Card title="방문 지역 (시·도)">
          <RadioGroup
            name="dest"
            options={REGIONS}
            value={ans.domestic_dest}
            onChange={v => set('domestic_dest', v)}
          />
        </Card>

        <Card title="Q1. 여행사 패키지 상품 구매 여부"
              note="출발 이전에 여행사에서 판매하는 패키지 상품을 구매하셨습니까?">
          <RadioGroup name="q1" value={ans.q1_package} onChange={v => set('q1_package', v)} options={[
            { value: 'full',    label: '전체 패키지 상품 구매 (숙박·교통·식사 등 전 일정 포함)' },
            { value: 'partial', label: '부분 패키지 상품 구매 (숙박·교통 등 일부 묶음 상품)' },
            { value: 'none',    label: '패키지 상품 구매 안 함 (개별 여행)' },
          ]} />
          {(ans.q1_package === 'full' || ans.q1_package === 'partial') && (
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #f1f5f9' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e', marginBottom: 10 }}>Q1-1. 구매 시점</p>
              <RadioGroup name="q1t" value={ans.q1_timing} onChange={v => set('q1_timing', v)}
                options={['6개월 이상 전','4~6개월 전','2~3개월 전','1개월 전','2~3주 전','4~7일 전','2~3일 전','하루 전','당일']} />
            </div>
          )}
        </Card>

        <Card title="Q2. 사전 예약 서비스" note="출발 전 직접 개별 예약하신 서비스를 모두 선택해 주세요.">
          <CheckboxPills
            options={['숙박시설','식당','교통수단(항공·선박·철도·버스 등)','차량대여/렌트','관광명소(유적지·국립공원 등)','레저시설(스파·스키장·골프장 등)','체험 프로그램','사전 예약하지 않음']}
            value={ans.q2_prereserve || []}
            onChange={v => set('q2_prereserve', v)}
          />
        </Card>

        <Card title="Q3. 여행지 선택 이유" note="이 여행지를 선택한 주요 이유를 중요한 순서대로 3순위까지 선택해 주세요.">
          <RankSelect options={DEST_REASONS} ranks={3} value={ans.q3_reasons || {}} onChange={v => set('q3_reasons', v)} />
        </Card>

        <Card title="숙박 형태" note="이번 여행에서 이용하신 숙박시설을 선택해 주세요.">
          <RadioGroup name="stay" options={STAY_TYPES} value={ans.domestic_stay} onChange={v => set('domestic_stay', v)} />
        </Card>

        <Card title="여행 기간">
          <div style={{ display: 'flex', gap: 16 }}>
            {[['출발일', 'domestic_start'], ['귀가일', 'domestic_end']].map(([label, key]) => (
              <div key={key} style={{ flex: 1 }}>
                <p style={{ fontSize: 13, color: '#718096', marginBottom: 6 }}>{label}</p>
                <input type="date" value={ans[key] || ''} onChange={e => set(key, e.target.value)} />
              </div>
            ))}
          </div>
        </Card>

        <NavButtons onPrev={prev} onNext={next} />
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════
     SCREEN: 국내 관광여행 — 활동 및 정보 경로 (D2)
     ══════════════════════════════════════════════════════ */
  if (currentKey === 'd2') {
    return (
      <div>
        <ProgressBar current={displayStepIndex} total={totalDisplaySteps} />
        <SectionHeader step={displayStepIndex} total={totalDisplaySteps}
          title="국내 관광여행 — 활동 및 정보 경로" />

        <Card title="Q4. 여행지에서의 활동" note="여행 중 참여하신 활동을 모두 선택해 주세요.">
          <CheckboxPills options={ACTIVITIES} value={ans.q4_activities || []} onChange={v => set('q4_activities', v)} />
        </Card>

        {(ans.q4_activities || []).length > 0 && (
          <Card title="Q4-1. 가장 주된 활동" note="위에서 선택하신 활동 중 가장 주된 것을 하나만 선택해 주세요.">
            <RadioGroup name="q4m" options={ans.q4_activities} value={ans.q4_main} onChange={v => set('q4_main', v)} />
          </Card>
        )}

        <Card title="Q5. 여행 정보 획득 경로" note="여행 정보를 주로 어디서 얻으셨습니까? 많이 얻은 순서대로 3순위까지 선택해 주세요.">
          <RankSelect options={INFO_SOURCES} ranks={3} value={ans.q5_info || {}} onChange={v => set('q5_info', v)} />
        </Card>

        {Object.values(ans.q5_info || {}).includes('인터넷 사이트/모바일 앱(PC/스마트폰)') && (
          <Card title="Q5-1. 이용 온라인 채널" note="많이 이용한 순서대로 3순위까지 선택해 주세요.">
            <RankSelect options={WEB_CHANNELS} ranks={3} value={ans.q5_web || {}} onChange={v => set('q5_web', v)} />
          </Card>
        )}

        <NavButtons onPrev={prev} onNext={next} />
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════
     SCREEN: 국내 관광여행 — 동반자 (D3)
     ══════════════════════════════════════════════════════ */
  if (currentKey === 'd3') {
    const compCount = parseInt(ans.q6_count) || 0;
    return (
      <div>
        <ProgressBar current={displayStepIndex} total={totalDisplaySteps} />
        <SectionHeader step={displayStepIndex} total={totalDisplaySteps}
          title="국내 관광여행 — 여행 동반자" />

        <Card title="Q6. 동반 일행 수" note="귀하를 포함한 총 일행 수를 입력해 주세요. (혼자 여행 = 1명)">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input type="number" value={ans.q6_count || ''} min="1"
              onChange={e => set('q6_count', e.target.value)}
              placeholder="1"
              style={{ width: 90, textAlign: 'center', fontSize: 16, padding: '9px 12px' }} />
            <span style={{ fontSize: 14, color: '#718096' }}>명 (본인 포함)</span>
          </div>
        </Card>

        {compCount >= 2 && (
          <>
            <Card title="Q6-1. 15세 미만 동반 인원" note="일행 중 만 15세 미만은 몇 명입니까? (없으면 0)">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <input type="number" value={ans.q6_under15 || ''} min="0"
                  onChange={e => set('q6_under15', e.target.value)}
                  placeholder="0"
                  style={{ width: 90, textAlign: 'center', fontSize: 16, padding: '9px 12px' }} />
                <span style={{ fontSize: 14, color: '#718096' }}>명</span>
              </div>
            </Card>
            <Card title="Q6-2. 동반자 유형" note="함께 여행한 분들을 모두 선택해 주세요.">
              <CheckboxPills options={COMPANION_TYPES} value={ans.q6_companion_types || []} onChange={v => set('q6_companion_types', v)} />
            </Card>
          </>
        )}

        <Card title="Q6-3. 반려동물 동반 여부">
          <RadioGroup name="q6p" value={ans.q6_pet} onChange={v => set('q6_pet', v)} options={[
            '반려동물을 키우지 않는다',
            '반려동물을 키우지만 여행은 함께 하지 않았다',
            '반려동물과 함께 여행을 다녀왔다',
          ]} />
        </Card>

        <NavButtons onPrev={prev} onNext={next} />
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════
     SCREEN: 국내 관광여행 — 지출 (D4)
     ══════════════════════════════════════════════════════ */
  if (currentKey === 'd4') {
    const travelTotal = [
      'q8_package','q8_lodging','q8_restaurant','q8_grocery',
      'q8_transport','q8_car','q8_entrance','q8_sports','q8_spa','q8_shopping','q8_other',
    ].reduce((s, k) => s + (Number(ans[k]) || 0), 0);

    return (
      <div>
        <ProgressBar current={displayStepIndex} total={totalDisplaySteps} />
        <SectionHeader step={displayStepIndex} total={totalDisplaySteps}
          title="국내 관광여행 — 여행 지출"
          subtitle="1인 기준 금액으로 입력해 주세요. 해당 없으면 0을 입력하세요." />

        <Card title="Q7. 출발 전 사전 지출" note="거주지에서 출발 전 구입·결제한 비용 (여행지에서의 지출은 Q8에 기재)">
          <AmountInput label="식음료비 (출발 전 구입)" value={ans.q7_food} onChange={v => set('q7_food', v)} />
          <AmountInput label="화장품·향수" value={ans.q7_cosmetics} onChange={v => set('q7_cosmetics', v)} />
          <AmountInput label="의류·신발·가방" value={ans.q7_clothes} onChange={v => set('q7_clothes', v)} />
          <AmountInput label="건강식품·의약품·위생용품" value={ans.q7_health} onChange={v => set('q7_health', v)} />
          <AmountInput label="여행 관련 용품 대여료" value={ans.q7_rental} onChange={v => set('q7_rental', v)} />
          <AmountInput label="기타" value={ans.q7_other} onChange={v => set('q7_other', v)} />
        </Card>

        <Card title="Q8. 여행지 지출 — 숙박·교통·음식">
          <AmountInput label="여행사 상품 구입비·회비" value={ans.q8_package} onChange={v => set('q8_package', v)} />
          <AmountInput label="숙박비 총액" value={ans.q8_lodging} onChange={v => set('q8_lodging', v)} />
          <AmountInput label="음식점비 (일반음식점·카페 등)" value={ans.q8_restaurant} onChange={v => set('q8_restaurant', v)} />
          <AmountInput label="식음료 구입비 (편의점·마트·시장 등)" value={ans.q8_grocery} onChange={v => set('q8_grocery', v)} />
          <AmountInput label="교통비 총액 (철도·항공·버스·택시 등)" value={ans.q8_transport} onChange={v => set('q8_transport', v)} />
          <AmountInput label="렌트카·자가용 비용 (임대료·연료·통행료·주차)" value={ans.q8_car} onChange={v => set('q8_car', v)} />
        </Card>

        <Card title="Q8. 여행지 지출 — 활동·쇼핑">
          <AmountInput label="입장료·관람비 (유적지·박물관·공연 등)" value={ans.q8_entrance} onChange={v => set('q8_entrance', v)} />
          <AmountInput label="스포츠·레포츠·오락 비용" value={ans.q8_sports} onChange={v => set('q8_sports', v)} />
          <AmountInput label="온천·스파·마사지·뷰티 비용" value={ans.q8_spa} onChange={v => set('q8_spa', v)} />
          <AmountInput label="쇼핑비 (기념품·특산물·의류 등)" value={ans.q8_shopping} onChange={v => set('q8_shopping', v)} />
          <AmountInput label="기타" value={ans.q8_other} onChange={v => set('q8_other', v)} />
          <TotalRow label="여행지 지출 합계" amount={travelTotal} />
        </Card>

        <NavButtons onPrev={prev} onNext={next} />
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════
     SCREEN: 국내 관광여행 — 평가 (D5)
     ══════════════════════════════════════════════════════ */
  if (currentKey === 'd5') {
    return (
      <div>
        <ProgressBar current={displayStepIndex} total={totalDisplaySteps} />
        <SectionHeader step={displayStepIndex} total={totalDisplaySteps}
          title="국내 관광여행 — 여행 평가" />

        <Card title="Q10. 전반적 만족도" note="다녀오신 여행지에 대해 전반적으로 얼마나 만족하셨습니까?">
          <RadioGroup name="q10o" value={ans.q10_overall}
            onChange={v => set('q10_overall', parseInt(v))}
            options={SATISFACTION_LABELS.map((l, i) => ({ value: String(i + 1), label: l }))} />
        </Card>

        <Card title="Q10-1. 항목별 만족도"
              note="각 항목에 대한 만족도를 평가해 주세요. 경험하지 않으신 항목은 '해당없음'을 선택해 주세요.">
          <LikertTable
            items={SATISF_ITEMS}
            labels={SATISFACTION_LABELS}
            value={ans.q10_detail || {}}
            onChange={v => set('q10_detail', v)}
            extraLabel="해당없음"
          />
        </Card>

        <Card title="Q11. 재방문 의도" note="다녀오신 여행지를 다시 방문하고 싶은 의향은 얼마나 되십니까?">
          <RadioGroup name="q11" value={ans.q11}
            onChange={v => set('q11', parseInt(v))}
            options={INTENT_LABELS.map((l, i) => ({ value: String(i + 1), label: l }))} />
        </Card>

        <Card title="Q12. 타인 추천 의도" note="다녀오신 여행지를 다른 사람에게 추천하고 싶은 의향은 얼마나 되십니까?">
          <RadioGroup name="q12" value={ans.q12}
            onChange={v => set('q12', parseInt(v))}
            options={INTENT_LABELS.map((l, i) => ({ value: String(i + 1), label: l }))} />
        </Card>

        <Card title="Q13. 여행의 긍정적 효과" note="여행을 통해 어떤 영향을 받으셨습니까?">
          <LikertTable
            items={POSITIVE_EFFECTS}
            labels={AGREE_LABELS}
            value={ans.q13 || {}}
            onChange={v => set('q13', v)}
          />
        </Card>

        <NavButtons onPrev={prev} onNext={next} />
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════
     SCREEN: 해외 여행
     ══════════════════════════════════════════════════════ */
  if (currentKey === 'overseas') {
    const qqTotal = ['qq8_package','qq8_lodging','qq8_flight','qq8_transport','qq8_food','qq8_activity','qq8_shopping','qq8_other']
      .reduce((s, k) => s + (Number(ans[k]) || 0), 0);

    return (
      <div>
        <ProgressBar current={displayStepIndex} total={totalDisplaySteps} />
        <SectionHeader step={displayStepIndex} total={totalDisplaySteps}
          title="해외 여행"
          subtitle="최근 다녀오신 해외 여행에 대해 응답해 주세요." />

        <Card title="방문 국가/지역">
          <input type="text" value={ans.overseas_country || ''} onChange={e => set('overseas_country', e.target.value)}
            placeholder="예: 일본, 베트남, 태국 등" />
        </Card>

        <Card title="여행 기간">
          <div style={{ display: 'flex', gap: 16 }}>
            {[['출발일', 'overseas_start'], ['귀국일', 'overseas_end']].map(([label, key]) => (
              <div key={key} style={{ flex: 1 }}>
                <p style={{ fontSize: 13, color: '#718096', marginBottom: 6 }}>{label}</p>
                <input type="date" value={ans[key] || ''} onChange={e => set(key, e.target.value)} />
              </div>
            ))}
          </div>
        </Card>

        <Card title="QQ1. 여행사 패키지 상품 구매 여부">
          <RadioGroup name="qq1" value={ans.qq1_package} onChange={v => set('qq1_package', v)} options={[
            { value: 'full',    label: '전체 패키지 상품 구매' },
            { value: 'partial', label: '부분 패키지 상품 구매' },
            { value: 'none',    label: '패키지 상품 구매 안 함 (개별 여행)' },
          ]} />
        </Card>

        <Card title="QQ2. 사전 예약 서비스" note="출발 전 개별 예약하신 서비스를 모두 선택해 주세요.">
          <CheckboxPills
            options={['숙박시설','식당','교통수단(항공·선박 등)','차량대여/렌트','관광명소','레저시설','체험 프로그램','해외 문화·공연 상품','현지 가이드 투어','사전 예약하지 않음']}
            value={ans.qq2_prereserve || []}
            onChange={v => set('qq2_prereserve', v)}
          />
        </Card>

        <Card title="QQ0. 목적지 선택 시 고려한 주요 관광활동" note="이 국가/지역을 선택할 때 고려한 관광활동을 중요한 순서대로 3순위까지 선택해 주세요.">
          <RankSelect options={OVERSEAS_ACTIVITIES} ranks={3} value={ans.qq0_activities || {}} onChange={v => set('qq0_activities', v)} />
        </Card>

        <Card title="QQ3. 여행지 선택 이유" note="중요한 순서대로 3순위까지 선택해 주세요.">
          <RankSelect options={DEST_REASONS} ranks={3} value={ans.qq3_reasons || {}} onChange={v => set('qq3_reasons', v)} />
        </Card>

        <Card title="QQ4. 여행지에서의 활동" note="여행 중 참여하신 활동을 모두 선택해 주세요.">
          <CheckboxPills options={ACTIVITIES} value={ans.qq4_activities || []} onChange={v => set('qq4_activities', v)} />
        </Card>

        <Card title="QQ5. 여행 정보 획득 경로" note="많이 얻은 순서대로 3순위까지 선택해 주세요.">
          <RankSelect options={INFO_SOURCES} ranks={3} value={ans.qq5_info || {}} onChange={v => set('qq5_info', v)} />
        </Card>

        <Card title="QQ6. 동반 일행 수">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input type="number" value={ans.qq6_count || ''} min="1"
              onChange={e => set('qq6_count', e.target.value)} placeholder="1"
              style={{ width: 90, textAlign: 'center', fontSize: 16, padding: '9px 12px' }} />
            <span style={{ fontSize: 14, color: '#718096' }}>명 (본인 포함)</span>
          </div>
        </Card>

        <Card title="QQ8. 해외여행 총 지출" note="국제 여객비 포함, 여행지에서 지출하신 총 비용 (1인 기준)">
          <AmountInput label="여행사 상품 구입비·가이드 경비" value={ans.qq8_package} onChange={v => set('qq8_package', v)} />
          <AmountInput label="숙박비 총액" value={ans.qq8_lodging} onChange={v => set('qq8_lodging', v)} />
          <AmountInput label="항공·선박 비용" value={ans.qq8_flight} onChange={v => set('qq8_flight', v)} />
          <AmountInput label="현지 교통비 (버스·지하철·택시 등)" value={ans.qq8_transport} onChange={v => set('qq8_transport', v)} />
          <AmountInput label="음식점·식음료비 총액" value={ans.qq8_food} onChange={v => set('qq8_food', v)} />
          <AmountInput label="여행 활동비 (입장료·공연·스포츠 등)" value={ans.qq8_activity} onChange={v => set('qq8_activity', v)} />
          <AmountInput label="쇼핑비 (화장품·의류·기념품·전자제품 등)" value={ans.qq8_shopping} onChange={v => set('qq8_shopping', v)} />
          <AmountInput label="기타" value={ans.qq8_other} onChange={v => set('qq8_other', v)} />
          <TotalRow label="해외여행 총 지출" amount={qqTotal} />
        </Card>

        <Card title="QQ10. 전반적 만족도">
          <RadioGroup name="qq10" value={ans.qq10} onChange={v => set('qq10', parseInt(v))}
            options={SATISFACTION_LABELS.map((l, i) => ({ value: String(i + 1), label: l }))} />
        </Card>

        <Card title="QQ10-1. 항목별 만족도" note="경험하지 않은 항목은 '해당없음'을 선택해 주세요.">
          <LikertTable items={SATISF_ITEMS} labels={SATISFACTION_LABELS}
            value={ans.qq10_detail || {}} onChange={v => set('qq10_detail', v)} extraLabel="해당없음" />
        </Card>

        <Card title="QQ11. 재방문 의도">
          <RadioGroup name="qq11" value={ans.qq11} onChange={v => set('qq11', parseInt(v))}
            options={INTENT_LABELS.map((l, i) => ({ value: String(i + 1), label: l }))} />
        </Card>

        <Card title="QQ12. 타인 추천 의도">
          <RadioGroup name="qq12" value={ans.qq12} onChange={v => set('qq12', parseInt(v))}
            options={INTENT_LABELS.map((l, i) => ({ value: String(i + 1), label: l }))} />
        </Card>

        <Card title="QQ13. 여행의 긍정적 효과">
          <LikertTable items={POSITIVE_EFFECTS} labels={AGREE_LABELS}
            value={ans.qq13 || {}} onChange={v => set('qq13', v)} />
        </Card>

        <NavButtons onPrev={prev} onNext={next} />
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════
     SCREEN: 관광여행 미경험 이유
     ══════════════════════════════════════════════════════ */
  if (currentKey === 'notravel') {
    return (
      <div>
        <ProgressBar current={displayStepIndex} total={totalDisplaySteps} />
        <SectionHeader step={displayStepIndex} total={totalDisplaySteps}
          title="관광여행 미경험 이유"
          subtitle="이번 달 관광·휴양을 목적으로 한 여행을 다녀오지 않으신 이유는 무엇입니까?" />
        <Card note="중요한 순서대로 3순위까지 선택해 주세요.">
          <RankSelect options={NO_TRAVEL_REASONS} ranks={3} value={ans.d_notravel || {}} onChange={v => set('d_notravel', v)} />
        </Card>
        <NavButtons onPrev={prev} onNext={next} />
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════
     SCREEN: 인구통계 (DQ)
     ══════════════════════════════════════════════════════ */
  if (currentKey === 'demo') {
    const isEmployed = ans.dq_employed === '취업';
    return (
      <div>
        <ProgressBar current={displayStepIndex} total={totalDisplaySteps} />
        <SectionHeader step={displayStepIndex} total={totalDisplaySteps}
          title="인구통계" subtitle="통계 분석을 위한 기본 정보를 입력해 주세요." />

        <Card title="DQ1. 최종 학력">
          <RadioGroup name="dq1" value={ans.dq_edu} onChange={v => set('dq_edu', v)} options={[
            '무학','초등학교 졸업','중학교 졸업','고등학교 졸업',
            '대학(4년제 미만) 졸업','대학교(4년제 이상) 졸업','대학원 석사','대학원 박사',
          ]} />
        </Card>

        <Card title="DQ2. 가구원 수" note="현재 함께 살고 있는 가구원 수 (본인 포함)">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input type="number" value={ans.dq_household || ''} min="1"
              onChange={e => set('dq_household', e.target.value)} placeholder="1"
              style={{ width: 90, textAlign: 'center', fontSize: 16, padding: '9px 12px' }} />
            <span style={{ fontSize: 14, color: '#718096' }}>명</span>
          </div>
        </Card>

        <Card title="DQ3. 혼인 상태">
          <RadioGroup name="dq3" value={ans.dq_marital} onChange={v => set('dq_marital', v)}
            options={['미혼','배우자 있음','사별','이혼','기타']} />
        </Card>

        <Card title="DQ4. 가구주 여부">
          <RadioGroup name="dq4" value={ans.dq_head} onChange={v => set('dq_head', v)}
            options={['가구주','가구주 아님']} />
        </Card>

        <Card title="DQ5. 취업 상태" note="지난 1주일 동안 수입을 목적으로 1시간 이상 일하셨습니까?">
          <RadioGroup name="dq5" value={ans.dq_employed} onChange={v => set('dq_employed', v)}
            options={['취업','미취업 — 전업주부','미취업 — 학생','미취업 — 기타']} />
        </Card>

        {isEmployed && (
          <>
            <Card title="DQ5-1. 직종">
              <RadioGroup name="dq5o" value={ans.dq_occ} onChange={v => set('dq_occ', v)} options={OCCUPATIONS} />
            </Card>
            <Card title="DQ5-2. 종사상 지위">
              <RadioGroup name="dq5p" value={ans.dq_pos} onChange={v => set('dq_pos', v)} options={[
                '임금·봉급 근로자','고용원을 둔 사업주',
                '고용원이 없는 자영자(프리랜서 포함)','무급 가족 종사자',
              ]} />
            </Card>
            <Card title="DQ5-3. 주5일 근무제 여부">
              <RadioGroup name="dq5w" value={ans.dq_5day} onChange={v => set('dq_5day', v)}
                options={['주5일 근무 실시','주5일 근무 미실시']} />
            </Card>
          </>
        )}

        <Card title="DQ6. 월평균 소득 — 가구 전체" note="세금 공제 전 월평균 소득을 선택해 주세요.">
          <RadioGroup name="dq6h" value={ans.dq_income_hh} onChange={v => set('dq_income_hh', v)} options={INCOME_BANDS} />
        </Card>

        <Card title="DQ6. 월평균 소득 — 본인">
          <RadioGroup name="dq6m" value={ans.dq_income_me} onChange={v => set('dq_income_me', v)} options={INCOME_BANDS} />
        </Card>

        <Card title="DQ7. 차량 보유 여부">
          <RadioGroup name="dq7" value={ans.dq_car} onChange={v => set('dq_car', v)}
            options={['차량 보유','차량 미보유']} />
        </Card>

        <Card title="DQ8. 주관적 건강 상태">
          <RadioGroup name="dq8" value={ans.dq_health} onChange={v => set('dq_health', v)} options={[
            '매우 건강하다','건강한 편이다','보통이다','건강하지 않은 편이다','매우 건강하지 않다',
          ]} />
        </Card>

        {submitError && (
          <div style={{ background: '#fff5f5', border: '1px solid #fed7d7', borderRadius: 10, padding: '12px 16px', marginTop: 16 }}>
            <p style={{ color: '#c53030', fontSize: 13, margin: 0 }}>⚠ {submitError}</p>
          </div>
        )}

        <NavButtons onPrev={prev} onNext={handleSubmit}
          nextLabel={submitting ? '제출 중...' : '제출하기 ✓'}
          disabled={submitting} />
      </div>
    );
  }

  return null;
}
