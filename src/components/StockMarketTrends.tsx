import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Globe, TrendingUp, PlaneTakeoff, Hotel, Ship, BarChart3, Coins, MonitorSmartphone } from "lucide-react";

const MARKET_TABS = [
  {
    id: "etf",
    title: "관광 섹터 ETF",
    icon: <BarChart3 className="w-4 h-4" />,
    symbols: [
      { "s": "AMEX:JETS", "d": "글로벌 항공 ETF (JETS)" },
      { "s": "AMEX:AWAY", "d": "여행 테크 ETF (AWAY)" },
      { "s": "NASDAQ:BJK", "d": "글로벌 카지노/게이밍 ETF (BJK)" },
      { "s": "AMEX:PEJ", "d": "레저 & 엔터테인먼트 ETF (PEJ)" },
      { "s": "AMEX:EWY", "d": "MSCI 한국 ETF (KOR)" }
    ]
  },
  {
    id: "fx_oil",
    title: "환율 & 유가",
    icon: <Coins className="w-4 h-4" />,
    symbols: [
      { "s": "FX_IDC:USDKRW", "d": "원/달러 환율" },
      { "s": "FX_IDC:JPYKRW", "d": "원/엔 환율" },
      { "s": "FX_IDC:EURKRW", "d": "원/유로 환율" },
      { "s": "TVC:USOIL", "d": "WTI 원유 (항공유 직결)" },
      { "s": "TVC:GOLD", "d": "금 (안전자산)" }
    ]
  },
  {
    id: "ota",
    title: "여행 플랫폼 (OTA)",
    icon: <MonitorSmartphone className="w-4 h-4" />,
    symbols: [
      { "s": "NASDAQ:BKNG", "d": "부킹홀딩스" },
      { "s": "NASDAQ:EXPE", "d": "익스피디아" },
      { "s": "NASDAQ:ABNB", "d": "에어비앤비" },
      { "s": "NASDAQ:TCOM", "d": "트립닷컴" },
      { "s": "NASDAQ:TRIP", "d": "트립어드바이저" }
    ]
  },
  {
    id: "air",
    title: "글로벌 항공사",
    icon: <PlaneTakeoff className="w-4 h-4" />,
    symbols: [
      { "s": "NYSE:DAL", "d": "델타항공" },
      { "s": "NASDAQ:UAL", "d": "유나이티드항공" },
      { "s": "NASDAQ:AAL", "d": "아메리칸항공" },
      { "s": "NYSE:LUV", "d": "사우스웨스트항공" },
      { "s": "NASDAQ:RYAAY", "d": "라이언에어" }
    ]
  },
  {
    id: "hotel",
    title: "글로벌 호텔 체인",
    icon: <Hotel className="w-4 h-4" />,
    symbols: [
      { "s": "NASDAQ:MAR", "d": "메리어트 인터내셔널" },
      { "s": "NYSE:HLT", "d": "힐튼 월드와이드" },
      { "s": "NYSE:H", "d": "하얏트 호텔" },
      { "s": "NYSE:IHG", "d": "인터컨티넨탈 호텔" },
      { "s": "NYSE:WH", "d": "윈덤 호텔" }
    ]
  },
  {
    id: "cruise",
    title: "크루즈 & 리조트",
    icon: <Ship className="w-4 h-4" />,
    symbols: [
      { "s": "NYSE:CCL", "d": "카니발 크루즈" },
      { "s": "NYSE:RCL", "d": "로얄 캐리비안" },
      { "s": "NYSE:LVS", "d": "라스베가스 샌즈" },
      { "s": "NYSE:MGM", "d": "MGM 리조트" },
      { "s": "NASDAQ:WYNN", "d": "윈 리조트" }
    ]
  }
];

// 개별 종목의 가격/등락률을 보여주는 마이크로 위젯
const SingleQuoteWidget = ({ symbol, name, isSelected, onClick }: { symbol: string, name: string, isSelected: boolean, onClick: () => void }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbol": symbol,
      "width": "100%",
      "colorTheme": "light",
      "isTransparent": true,
      "locale": "ko"
    });
    container.current.appendChild(script);
  }, [symbol]);

  return (
    <div 
      className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${isSelected ? 'border-blue-500 bg-blue-50/50 shadow-md' : 'border-transparent hover:border-blue-200 hover:bg-slate-50'}`}
      onClick={onClick}
    >
      {/* 클릭을 가로채기 위한 투명 오버레이 */}
      <div className="absolute inset-0 z-10"></div>
      
      <div className="pointer-events-none opacity-90 min-h-[110px]" ref={container}></div>
    </div>
  );
};

// 우측 메인 차트 위젯
const MainChartWidget = ({ symbol, name }: { symbol: string, name: string }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        [name, `${symbol}|3M`] // 3개월(3M) 기본 설정
      ],
      "chartOnly": false,
      "width": "100%",
      "height": "100%",
      "locale": "ko",
      "colorTheme": "light",
      "autosize": true,
      "showVolume": false,
      "showMA": false,
      "hideDateRanges": false,
      "hideMarketStatus": false,
      "hideSymbolLogo": false,
      "scalePosition": "right",
      "scaleMode": "Normal",
      "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      "fontSize": "10",
      "noTimeScale": false,
      "valuesTracking": "1",
      "changeMode": "price-and-percent",
      "chartType": "area",
      "maLineColor": "#2962FF",
      "maLineWidth": 1,
      "maLength": 9,
      "lineWidth": 2,
      "lineType": 0,
      "dateRanges": [
        "1d|1",
        "1m|30",
        "3m|60",
        "12m|1D",
        "60m|1W",
        "all|1M"
      ]
    });
    container.current.appendChild(script);
  }, [symbol, name]);

  return <div className="w-full h-full" ref={container}></div>;
};


const StockMarketTrends = () => {
  const [activeTabId, setActiveTabId] = useState<string>(MARKET_TABS[0].id);
  const activeTabData = MARKET_TABS.find(t => t.id === activeTabId) || MARKET_TABS[0];
  
  // 첫 번째 탭의 첫 번째 종목을 초기 선택값으로
  const [selectedSymbol, setSelectedSymbol] = useState(activeTabData.symbols[0]);

  // 탭이 변경되면 선택된 종목도 해당 탭의 첫 번째 종목으로 초기화
  useEffect(() => {
    const newTabData = MARKET_TABS.find(t => t.id === activeTabId) || MARKET_TABS[0];
    setSelectedSymbol(newTabData.symbols[0]);
  }, [activeTabId]);

  const today = new Date();
  const formattedDate = `${today.getFullYear()}. ${(today.getMonth() + 1).toString().padStart(2, '0')}. ${today.getDate().toString().padStart(2, '0')}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-8"
    >
      <div className="flex flex-col items-center justify-center gap-4 mb-10 text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shadow-inner border border-blue-100">
          <TrendingUp className="w-8 h-8 text-blue-600" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold font-sans underline-accent">Global Tourism Market</h2>
          <p className="text-muted-foreground text-base max-w-2xl">
            글로벌 최고 수준의 관광, 항공, 호텔, 레저 기업들의 실시간 시장 동향을 파악하세요.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto glass-panel p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-xl bg-white/70 backdrop-blur-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] -ml-48 -mb-48 pointer-events-none"></div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 px-2 relative z-10">
          <div className="flex items-center gap-3">
            <Globe className="w-6 h-6 text-blue-500" />
            <span className="text-lg font-bold text-slate-800">글로벌 관광 산업 종합 마켓 보드</span>
          </div>
          
          <div className="sm:ml-auto flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Updates</span>
              <span className="text-slate-300 mx-1">|</span>
              <span className="text-xs font-semibold text-slate-500 font-sans tracking-tight">{formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Custom React Tabs (Buttons) */}
        <div className="flex items-center gap-2 mb-6 px-2 relative z-10 border-b border-slate-100 pb-4 overflow-x-auto scrollbar-hide flex-nowrap">
          {MARKET_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 whitespace-nowrap ${
                activeTabId === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-600/20' 
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className={`${activeTabId === tab.id ? 'text-blue-200' : 'text-slate-400'}`}>
                {tab.icon}
              </div>
              {tab.title}
            </button>
          ))}

          {/* External Link to Naver Finance */}
          <a
            href="https://finance.naver.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-all duration-300 shadow-sm group/naver whitespace-nowrap"
          >
            <TrendingUp className="w-4 h-4 text-emerald-600 group-hover/naver:scale-110 transition-transform" />
            <span>네이버 국내증시</span>
          </a>
        </div>

        {/* 2-Column Split Layout */}
        <div className="flex flex-col lg:flex-row gap-6 relative z-10 h-[550px]">
          {/* Left: Custom Symbol List */}
          <div className="w-full lg:w-1/3 flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar bg-white/50 p-3 rounded-2xl border border-slate-100 shadow-inner">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
              {activeTabData.title} 종목
            </h3>
            {activeTabData.symbols.map((sym) => (
              <SingleQuoteWidget 
                key={sym.s} 
                symbol={sym.s} 
                name={sym.d}
                isSelected={selectedSymbol.s === sym.s}
                onClick={() => setSelectedSymbol(sym)}
              />
            ))}
          </div>

          {/* Right: Main Chart */}
          <div className="w-full lg:w-2/3 h-full rounded-2xl overflow-hidden shadow-md border border-slate-100 bg-white">
            <MainChartWidget symbol={selectedSymbol.s} name={selectedSymbol.d} />
          </div>
        </div>
      </div>
      
      <div className="text-center mt-6">
        <p className="text-[12px] text-slate-500 font-medium">
          * 모든 마켓 데이터는 TradingView 플랫폼을 통해 제공되며, 글로벌 표준 실시간(또는 최소 지연) 시세를 반영합니다.
        </p>
      </div>
    </motion.div>
  );
};

export default StockMarketTrends;
