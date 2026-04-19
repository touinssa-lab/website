import { useState } from "react";
import { Plane, Car, Home, Leaf, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CarbonCalculator = () => {
  const [activeTab, setActiveTab] = useState<'flights' | 'vehicles' | 'accommodation'>('flights');
  
  // Flights state
  const [flightHours, setFlightHours] = useState(2);
  const [passengers, setPassengers] = useState(1);
  const [isRoundTrip, setIsRoundTrip] = useState(true);

  // Vehicles state
  const [carDistance, setCarDistance] = useState(100);
  const [carType, setCarType] = useState('gasoline'); // gasoline, diesel, electric

  // Accommodation state
  const [hotelNights, setHotelNights] = useState(2);
  const [rooms, setRooms] = useState(1);

  // Constants for generic estimation
  const CO2_PER_FLIGHT_HOUR = 90; // kg CO2
  const CO2_PER_KM_GASOLINE = 0.192;
  const CO2_PER_KM_DIESEL = 0.171;
  const CO2_PER_KM_EV = 0.053;
  const CO2_PER_HOTEL_NIGHT = 15; // kg CO2

  // Calculation Logic
  let emissions = 0;
  if (activeTab === 'flights') {
    emissions = flightHours * CO2_PER_FLIGHT_HOUR * passengers * (isRoundTrip ? 2 : 1);
  } else if (activeTab === 'vehicles') {
    let factor = CO2_PER_KM_GASOLINE;
    if (carType === 'diesel') factor = CO2_PER_KM_DIESEL;
    if (carType === 'electric') factor = CO2_PER_KM_EV;
    emissions = carDistance * factor;
  } else if (activeTab === 'accommodation') {
    emissions = hotelNights * CO2_PER_HOTEL_NIGHT * rooms;
  }

  const offsetTrees = Math.ceil(emissions / 22); // roughly 22kg CO2 absorbed by a tree in a year

  return (
    <div className="w-full max-w-6xl mx-auto rounded-3xl overflow-hidden glass-panel border border-border/50 bg-card/60 relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid lg:grid-cols-5 h-full relative z-10">
        
        {/* Left Side: Input Elements */}
        <div className="lg:col-span-3 p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-border/50">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-serif mb-2">Calculate Your Travel Carbon Footprint</h2>
            <p className="text-muted-foreground">여행 시 발생하는 탄소 배출량을 예측해 보세요.</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8 bg-muted/40 p-1.5 rounded-xl border border-border/50">
            {[
              { id: 'flights', label: 'Flights', icon: Plane },
              { id: 'vehicles', label: 'Vehicles', icon: Car },
              { id: 'accommodation', label: 'Hotels', icon: Home },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id 
                  ? 'bg-background shadow-md text-primary scale-[1.02]' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/80'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="min-h-[280px]">
            <AnimatePresence mode="wait">
              {activeTab === 'flights' && (
                <motion.div 
                  key="flights"
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <label className="text-sm font-semibold">비행 시간 (편도 기준)</label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="range" min="1" max="24" value={flightHours} 
                        onChange={(e) => setFlightHours(Number(e.target.value))}
                        className="flex-1 w-full accent-primary" 
                      />
                      <span className="w-16 text-right font-bold text-lg">{flightHours} 시간</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-semibold">탑승 인원</label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="range" min="1" max="10" value={passengers} 
                        onChange={(e) => setPassengers(Number(e.target.value))}
                        className="flex-1 w-full accent-primary" 
                      />
                      <span className="w-16 text-right font-bold text-lg">{passengers} 명</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border/50">
                    <label className="text-sm font-semibold mb-2 block">여행 형태</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" checked={isRoundTrip} onChange={() => setIsRoundTrip(true)} className="accent-primary w-4 h-4" />
                        <span className="text-sm font-medium">왕복 (Round Trip)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" checked={!isRoundTrip} onChange={() => setIsRoundTrip(false)} className="accent-primary w-4 h-4" />
                        <span className="text-sm font-medium">편도 (One Way)</span>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'vehicles' && (
                <motion.div 
                  key="vehicles"
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <label className="text-sm font-semibold">주행 거리 (km)</label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="range" min="10" max="2000" step="10" value={carDistance} 
                        onChange={(e) => setCarDistance(Number(e.target.value))}
                        className="flex-1 w-full accent-primary" 
                      />
                      <span className="w-20 text-right font-bold text-lg">{carDistance} km</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-4 border-t border-border/50">
                    <label className="text-sm font-semibold mb-2 block">차량 연료 타입</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['gasoline', 'diesel', 'electric'].map(type => (
                        <button
                          key={type}
                          onClick={() => setCarType(type)}
                          className={`py-3 px-2 rounded-lg text-sm font-medium transition-all border ${
                            carType === type 
                            ? 'border-primary bg-primary/10 text-primary' 
                            : 'border-border/50 bg-background/50 hover:bg-muted/50 text-muted-foreground'
                          }`}
                        >
                          {type === 'gasoline' ? '가솔린' : type === 'diesel' ? '디젤' : '전기(EV)'}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'accommodation' && (
                <motion.div 
                  key="accommodation"
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <label className="text-sm font-semibold">숙박 일수</label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="range" min="1" max="30" value={hotelNights} 
                        onChange={(e) => setHotelNights(Number(e.target.value))}
                        className="flex-1 w-full accent-primary" 
                      />
                      <span className="w-16 text-right font-bold text-lg">{hotelNights} 박</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-semibold">이용 객실 수</label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="range" min="1" max="10" value={rooms} 
                        onChange={(e) => setRooms(Number(e.target.value))}
                        className="flex-1 w-full accent-primary" 
                      />
                      <span className="w-16 text-right font-bold text-lg">{rooms} 개</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Results Display */}
        <div className="lg:col-span-2 bg-muted/20 p-6 md:p-10 flex flex-col justify-center">
          <div className="space-y-8">
            <div className="text-center">
              <p className="text-sm font-semibold text-accent mb-2 uppercase tracking-wide">Estimated Output</p>
              <h3 className="text-5xl font-bold font-serif text-foreground mb-1">
                {Math.round(emissions).toLocaleString()} <span className="text-xl font-medium text-muted-foreground">kg CO₂</span>
              </h3>
              <p className="text-sm text-muted-foreground mt-4">
                이 항목에서 발생하는 예상 이산화탄소량입니다.
              </p>
            </div>

            <div className="rounded-xl border border-accent/20 bg-accent/5 p-6 flex flex-col items-center text-center">
              <Leaf className="w-10 h-10 text-accent mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                이 배출량을 1년 동안 해소하기 위해 필요한<br/>나무의 수는 대략 아래와 같습니다.
              </p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-4xl font-bold text-accent">{offsetTrees.toLocaleString()}</span>
                <span className="font-semibold text-accent/80">그루</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-muted-foreground bg-background/50 p-4 rounded-lg">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>본 계산 결과는 일반적인 산업 평균을 기반으로 한 추정치이며, 실제 탑승 환경 및 차량 연비에 따라 달라질 수 있습니다.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CarbonCalculator;
