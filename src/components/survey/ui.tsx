// @ts-nocheck
/* ============================================================
   공통 UI 컴포넌트
   ============================================================ */

export function Card({ title, note, children, style }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e2e8f0',
      borderRadius: 14,
      padding: '1.2rem 1.4rem 1rem',
      marginBottom: '1rem',
      boxShadow: '0 1px 3px rgba(0,0,0,.05)',
      ...style,
    }}>
      {title && (
        <p style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700, color: '#1a1a2e' }}>{title}</p>
      )}
      {note && (
        <p style={{ margin: '0 0 14px', fontSize: 12, color: '#718096', lineHeight: 1.6 }}>{note}</p>
      )}
      {children}
    </div>
  );
}

export function SectionHeader({ step, total, title, subtitle }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ marginBottom: 8 }}>
        <span style={{
          fontSize: 11,
          background: '#1B4FA8',
          color: '#fff',
          padding: '3px 12px',
          borderRadius: 12,
          fontWeight: 700,
          letterSpacing: '0.03em',
        }}>
          STEP {step} / {total}
        </span>
      </div>
      <h2 style={{ margin: '0 0 4px', fontSize: 19, fontWeight: 700, color: '#1a1a2e', letterSpacing: '-0.02em' }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ margin: 0, fontSize: 13, color: '#718096', lineHeight: 1.6 }}>{subtitle}</p>
      )}
    </div>
  );
}

export function ProgressBar({ current, total }) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: '#718096' }}>진행률</span>
        <span style={{ fontSize: 12, color: '#1B4FA8', fontWeight: 700 }}>{pct}%</span>
      </div>
      <div style={{ height: 5, background: '#e2e8f0', borderRadius: 3 }}>
        <div style={{
          width: `${pct}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #1B4FA8, #3b82f6)',
          borderRadius: 3,
          transition: 'width 0.4s ease',
        }} />
      </div>
    </div>
  );
}

export function NavButtons({ onPrev, onNext, nextLabel = '다음 →', disabled = false, showPrev = true }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, alignItems: 'center' }}>
      {showPrev ? (
        <button onClick={onPrev} style={{
          padding: '10px 22px',
          background: 'transparent',
          color: '#718096',
          border: '1px solid #e2e8f0',
          borderRadius: 9,
          fontSize: 13,
          cursor: 'pointer',
          fontWeight: 500,
        }}>
          ← 이전
        </button>
      ) : <div />}
      <button onClick={onNext} disabled={disabled} style={{
        padding: '11px 30px',
        background: disabled ? '#e2e8f0' : '#1B4FA8',
        color: disabled ? '#718096' : '#fff',
        border: 'none',
        borderRadius: 9,
        fontSize: 14,
        fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer',
        letterSpacing: '-0.01em',
      }}>
        {nextLabel}
      </button>
    </div>
  );
}

export function RadioGroup({ options, value, onChange, name }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {options.map((opt, i) => {
        const v = typeof opt === 'object' ? opt.value : opt;
        const l = typeof opt === 'object' ? opt.label : opt;
        const sel = value == v;
        return (
          <label key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
            padding: '10px 13px',
            borderRadius: 9,
            border: `1.5px solid ${sel ? '#1B4FA8' : '#e2e8f0'}`,
            background: sel ? '#EEF3FC' : '#fff',
            transition: 'all 0.15s',
          }}>
            <input
              type="radio"
              name={name || `rg_${i}`}
              value={v}
              checked={sel}
              onChange={() => onChange(v)}
              style={{ width: 16, height: 16, flexShrink: 0 }}
            />
            <span style={{ fontSize: 13, color: sel ? '#1B4FA8' : '#1a1a2e', fontWeight: sel ? 700 : 400 }}>
              {l}
            </span>
          </label>
        );
      })}
    </div>
  );
}

export function CheckboxPills({ options, value = [], onChange, max }) {
  const toggle = (opt) => {
    if (value.includes(opt)) {
      onChange(value.filter(v => v !== opt));
    } else if (!max || value.length < max) {
      onChange([...value, opt]);
    }
  };
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {options.map((opt, i) => {
        const sel = value.includes(opt);
        return (
          <label key={i} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            cursor: max && !sel && value.length >= max ? 'not-allowed' : 'pointer',
            border: `1.5px solid ${sel ? '#1B4FA8' : '#e2e8f0'}`,
            background: sel ? '#EEF3FC' : '#fff',
            padding: '6px 14px',
            borderRadius: 20,
            fontSize: 13,
            color: sel ? '#1B4FA8' : '#4a5568',
            fontWeight: sel ? 700 : 400,
            transition: 'all 0.12s',
            opacity: max && !sel && value.length >= max ? 0.5 : 1,
          }}>
            <input
              type="checkbox"
              checked={sel}
              onChange={() => toggle(opt)}
              style={{ display: 'none' }}
            />
            {sel && <span style={{ fontSize: 11 }}>✓</span>}
            {opt}
          </label>
        );
      })}
    </div>
  );
}

export function RankSelect({ options, ranks = 3, value = {}, onChange }) {
  const ordinals = ['1순위', '2순위', '3순위'];
  const usedByOther = (rank) =>
    Object.entries(value)
      .filter(([k]) => parseInt(k) !== rank)
      .map(([, v]) => v);

  const handleChange = (rank, opt) => {
    const next = { ...value };
    Object.keys(next).forEach(k => { if (next[k] === opt) delete next[k]; });
    if (opt) next[rank] = opt;
    else delete next[rank];
    onChange(next);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {Array.from({ length: ranks }, (_, i) => i + 1).map(rank => (
        <div key={rank} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            fontSize: 12,
            fontWeight: 700,
            color: '#1B4FA8',
            minWidth: 50,
            background: '#EEF3FC',
            padding: '4px 8px',
            borderRadius: 12,
            textAlign: 'center',
          }}>
            {ordinals[rank - 1]}
          </span>
          <select
            value={value[rank] || ''}
            onChange={e => handleChange(rank, e.target.value)}
            style={{ flex: 1, fontSize: 13, padding: '8px 10px', borderRadius: 8, border: '1px solid #e2e8f0' }}
          >
            <option value="">-- 선택 --</option>
            {options
              .filter(opt => !usedByOther(rank).includes(opt))
              .map((opt, i) => <option key={i} value={opt}>{opt}</option>)
            }
          </select>
        </div>
      ))}
    </div>
  );
}

export function LikertTable({ items, labels, value = {}, onChange, extraLabel }) {
  return (
    <div style={{ overflowX: 'auto', marginTop: 4 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px 10px', borderBottom: '1px solid #f1f5f9', color: '#718096', fontWeight: 400, minWidth: 140, fontSize: 12 }}>항목</th>
            {labels.map((l, i) => (
              <th key={i} style={{ padding: '8px 4px', textAlign: 'center', borderBottom: '1px solid #f1f5f9', color: '#718096', fontWeight: 400, fontSize: 11, minWidth: 56 }}>{l}</th>
            ))}
            {extraLabel && (
              <th style={{ padding: '8px 4px', textAlign: 'center', borderBottom: '1px solid #f1f5f9', color: '#718096', fontWeight: 400, fontSize: 11, minWidth: 56 }}>{extraLabel}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {items.map((item, ri) => (
            <tr key={ri} style={{ background: ri % 2 === 0 ? '#fff' : '#f9fafb' }}>
              <td style={{ padding: '10px 10px', color: '#1a1a2e', lineHeight: 1.4, fontSize: 13 }}>{item}</td>
              {labels.map((_, ci) => (
                <td key={ci} style={{ textAlign: 'center', padding: '10px 4px' }}>
                  <input
                    type="radio"
                    name={`lkrt_${ri}`}
                    value={ci + 1}
                    checked={value[item] === ci + 1}
                    onChange={() => onChange({ ...value, [item]: ci + 1 })}
                    style={{ width: 16, height: 16, cursor: 'pointer' }}
                  />
                </td>
              ))}
              {extraLabel && (
                <td style={{ textAlign: 'center', padding: '10px 4px' }}>
                  <input
                    type="radio"
                    name={`lkrt_${ri}`}
                    value={9}
                    checked={value[item] === 9}
                    onChange={() => onChange({ ...value, [item]: 9 })}
                    style={{ width: 16, height: 16, cursor: 'pointer', accentColor: '#718096' }}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AmountInput({ label, value, onChange, indent = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 0', borderBottom: '1px solid #f1f5f9' }}>
      <span style={{ flex: 1, fontSize: 13, color: '#1a1a2e', paddingLeft: indent ? 16 : 0 }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <input
          type="number"
          value={value || ''}
          onChange={e => onChange(Number(e.target.value) || 0)}
          placeholder="0"
          min="0"
          style={{ width: 120, textAlign: 'right', fontSize: 13, padding: '5px 8px', borderRadius: 6, border: '1px solid #e2e8f0' }}
        />
        <span style={{ fontSize: 13, color: '#718096', flexShrink: 0 }}>원</span>
      </div>
    </div>
  );
}

export function TotalRow({ label, amount }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 12, gap: 16, alignItems: 'center' }}>
      <span style={{ fontSize: 13, color: '#718096' }}>{label}</span>
      <span style={{ fontSize: 15, fontWeight: 700, color: '#1B4FA8' }}>
        {(amount || 0).toLocaleString()}원
      </span>
    </div>
  );
}
