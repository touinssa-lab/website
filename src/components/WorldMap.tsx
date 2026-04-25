import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    Plotly: any;
  }
}

const REGION_MAPPING: Record<string, string[]> = {
  'Europe': [
    'ALB', 'AND', 'AUT', 'BEL', 'BGR', 'BIH', 'BLR', 'CHE', 'CYP', 'CZE', 'DEU', 'DNK', 'ESP', 'EST', 'FIN', 'FRA', 
    'GBR', 'GRC', 'HRV', 'HUN', 'IRL', 'ISL', 'ITA', 'LIE', 'LTU', 'LUX', 'LVA', 'MCO', 'MDA', 'MKD', 'MLT', 'MNE', 
    'NLD', 'NOR', 'POL', 'PRT', 'ROU', 'RUS', 'SMR', 'SRB', 'SVK', 'SVN', 'SWE', 'UKR', 'VAT'
  ],
  'Asia': [
    'AFG', 'ARM', 'AZE', 'BGD', 'BHR', 'BRN', 'BTN', 'CHN', 'GEO', 'IDN', 'IND', 'IRN', 'IRQ', 'ISR', 'JOR', 'JPN', 
    'KAZ', 'KGZ', 'KHM', 'KOR', 'KWT', 'LAO', 'LBN', 'LKA', 'MDV', 'MNG', 'MMR', 'MYS', 'NPL', 'OMN', 'PAK', 'PHL', 
    'PRK', 'PSE', 'QAT', 'SAU', 'SGP', 'SYR', 'THA', 'TJK', 'TKM', 'TLS', 'TUR', 'UZB', 'VNM', 'YEM',
    'AUS', 'FJI', 'KIR', 'MHL', 'FSM', 'NRU', 'NZL', 'PLW', 'PNG', 'WSM', 'SLB', 'TON', 'TUV', 'VUT'
  ],
  'Americas': [
    'ARG', 'ATG', 'BHS', 'BLZ', 'BOL', 'BRA', 'BRB', 'CAN', 'CHL', 'COL', 'CRI', 'CUB', 'DMA', 'DOM', 'ECU', 'GRD', 
    'GTM', 'GUY', 'HND', 'HTI', 'JAM', 'KNA', 'LCA', 'MEX', 'NIC', 'PAN', 'PER', 'PRY', 'SLV', 'SUR', 'TTO', 'URY', 
    'USA', 'VCT', 'VEN'
  ],
  'AfricaMiddleEast': [
    'DZA', 'AGO', 'BEN', 'BWA', 'BFA', 'BDI', 'CPV', 'CMR', 'CAF', 'TCD', 'COM', 'COG', 'COD', 'DJI', 'EGY', 'GNQ', 
    'ERI', 'SWZ', 'ETH', 'GAB', 'GMB', 'GHA', 'GIN', 'GNB', 'CIV', 'KEN', 'LSO', 'LBR', 'LBY', 'MDG', 'MWI', 'MLI', 
    'MRT', 'MUS', 'MAR', 'MOZ', 'NAM', 'NER', 'NGA', 'RWA', 'STP', 'SEN', 'SYC', 'SLE', 'SOM', 'ZAF', 'SSD', 'SDN', 
    'TZA', 'TGO', 'TUN', 'UGA', 'ZMB', 'ZWE'
  ]
};

interface WorldMapProps {
  data: {
    europe: number;
    asia: number;
    americas: number;
    others: number;
  };
}

const WorldMap: React.FC<WorldMapProps> = ({ data }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isPlotlyLoaded, setIsPlotlyLoaded] = useState(false);

  useEffect(() => {
    // Check if Plotly is already loaded
    if (window.Plotly) {
      setIsPlotlyLoaded(true);
      return;
    }

    // Dynamically load Plotly CDN
    const script = document.createElement('script');
    script.src = "https://cdn.plot.ly/plotly-2.27.0.min.js";
    script.async = true;
    script.onload = () => setIsPlotlyLoaded(true);
    document.head.appendChild(script);

    return () => {
      // We don't necessarily want to remove the script as other components might use it
    };
  }, []);

  useEffect(() => {
    if (!isPlotlyLoaded || !mapRef.current || !window.Plotly) return;

    const locations: string[] = [];
    const z: number[] = [];
    const text: string[] = [];

    // Map region data to countries
    Object.entries(REGION_MAPPING).forEach(([region, codes]) => {
      let val = 0;
      let label = '';
      if (region === 'Europe') { val = data.europe; label = '유럽 지역'; }
      if (region === 'Asia') { val = data.asia; label = '아시아 지역'; }
      if (region === 'Americas') { val = data.americas; label = '미주 지역'; }
      if (region === 'AfricaMiddleEast') { val = data.others; label = '기타(중동/아프리카)'; }

      codes.forEach(code => {
        locations.push(code);
        z.push(val);
        text.push(`${label}: ${val}개 국가 분석 중`);
      });
    });

    const plotData = [{
      type: 'choropleth',
      locationmode: 'ISO-3',
      locations: locations,
      z: z,
      text: text,
      colorscale: [
        [0, 'rgba(59, 130, 246, 0.2)'],   // Light blue for low/background
        [0.2, '#3b82f6'],                // Europe blue
        [0.5, '#10b981'],                // Asia green
        [0.8, '#f59e0b'],                // Americas amber
        [1, '#ef4444']                  // Others red
      ],
      autocolorscale: false,
      showscale: false,
      marker: {
        line: {
          color: 'rgba(255,255,255,0.2)',
          width: 0.5
        }
      },
      hoverinfo: 'text',
      hovertemplate: '<b>%{text}</b><extra></extra>'
    }];

    const layout = {
      geo: {
        projection: { 
          type: 'mercator',
          scale: 1.0 
        },
        showframe: false,
        showcoastlines: true,
        coastlinecolor: 'rgba(255,255,255,0.1)',
        bgcolor: 'rgba(0,0,0,0)',
        lakecolor: 'rgba(59, 130, 246, 0.05)',
        showocean: true,
        oceancolor: 'rgba(15, 23, 42, 0)', // Transparent ocean to blend with glass panel
        landcolor: 'rgba(30, 41, 59, 0.3)',
        countrycolor: 'rgba(255,255,255,0.1)',
        fitbounds: 'locations'
      },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      margin: { t: 0, b: 0, l: 0, r: 0 },
      dragmode: false,
      autosize: true
    };

    const config = {
      responsive: true,
      displayModeBar: false
    };

    window.Plotly.newPlot(mapRef.current, plotData, layout, config);

    // Cleanup on unmount or re-render
    return () => {
      if (mapRef.current) {
        // window.Plotly.purge(mapRef.current); // Use purge instead of manually clearing
      }
    };
  }, [isPlotlyLoaded, data]);

  return (
    <div className="w-full h-full min-h-[300px] relative">
      {!isPlotlyLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground animate-pulse">
          지도를 불러오는 중...
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default WorldMap;
