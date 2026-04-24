const fs = require('fs');

const data = JSON.parse(fs.readFileSync('d:/뉴프로젝트/투어리즘인사이트/홈페이지_리뉴얼/Web/src/components/skorea_geo.json', 'utf8'));

const lonMin = 124;
const lonMax = 132;
const latMin = 33;
const latMax = 39;

const width = 500;
const height = 600;

// Central latitude of South Korea is around 36 degrees.
// 1 degree of longitude is approx cos(36) * 1 degree of latitude.
const cos36 = Math.cos(36 * Math.PI / 180);

function project(lon, lat) {
    // We want 1 unit of latitude to be 100 pixels.
    // So 1 unit of longitude should be 100 * cos36 pixels.
    const x = (lon - lonMin) * 100 * cos36;
    const y = (latMax - lat) * 100;
    return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

const regions = [];

data.features.forEach(feature => {
    const name = feature.properties.name;
    let d = "";
    
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    const geom = feature.geometry;
    if (geom.type === "Polygon") {
        geom.coordinates.forEach(ring => {
            ring.forEach((coord, i) => {
                const [x, y] = project(coord[0], coord[1]);
                d += (i === 0 ? "M" : "L") + x + "," + y;
                minX = Math.min(minX, x); minY = Math.min(minY, y);
                maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
            });
            d += "Z";
        });
    } else if (geom.type === "MultiPolygon") {
        geom.coordinates.forEach(poly => {
            poly.forEach(ring => {
                ring.forEach((coord, i) => {
                    const [x, y] = project(coord[0], coord[1]);
                    d += (i === 0 ? "M" : "L") + x + "," + y;
                    minX = Math.min(minX, x); minY = Math.min(minY, y);
                    maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
                });
                d += "Z";
            });
        });
    }

    let shortName = name;
    if (name === "제주특별자치도") shortName = "제주";
    if (name === "서울특별시") shortName = "서울";
    if (name === "인천광역시") shortName = "인천";
    if (name === "경기도") shortName = "경기";
    if (name === "강원도") shortName = "강원";
    if (name === "충청북도") shortName = "충북";
    if (name === "충청남도") shortName = "충남";
    if (name === "대전광역시") shortName = "대전";
    if (name === "세종특별자치시") shortName = "세종";
    if (name === "전라북도") shortName = "전북";
    if (name === "전라남도") shortName = "전남";
    if (name === "광주광역시") shortName = "광주";
    if (name === "경상북도") shortName = "경북";
    if (name === "경상남도") shortName = "경남";
    if (name === "대구광역시") shortName = "대구";
    if (name === "울산광역시") shortName = "울산";
    if (name === "부산광역시") shortName = "부산";

    let labelX = Math.round((minX + maxX) / 2);
    let labelY = Math.round((minY + maxY) / 2);

    // Manual label adjustments for better readability
    if (shortName === "서울") { labelX += 0; labelY -= 5; }
    if (shortName === "인천") { labelX -= 25; labelY += 5; }
    if (shortName === "대전") { labelX += 10; labelY += 10; }
    if (shortName === "세종") { labelX -= 5; labelY -= 15; }
    if (shortName === "광주") { labelX += 0; labelY += 0; }
    if (shortName === "대구") { labelX += 10; labelY += 0; }
    if (shortName === "울산") { labelX += 15; labelY -= 5; }
    if (shortName === "부산") { labelX += 15; labelY += 10; }
    if (shortName === "충남") { labelX -= 15; labelY -= 10; }
    if (shortName === "경기") { labelX += 20; labelY -= 10; }
    if (shortName === "전남") { labelX -= 10; labelY += 20; }
    if (shortName === "전북") { labelX -= 10; labelY -= 10; }

    regions.push({
        id: shortName,
        name: shortName,
        path: d,
        labelPos: { x: labelX, y: labelY }
    });
});

const content = `import React from 'react';
import { motion } from 'framer-motion';

interface RegionData {
  id: string;
  name: string;
  path: string;
  labelPos: { x: number; y: number };
}

const REGIONS: RegionData[] = ${JSON.stringify(regions, null, 2)};

interface SouthKoreaMapProps {
  data: { region: string; count: number }[];
  color: string;
  selectedRegion?: string;
  onRegionClick?: (region: string) => void;
}

const SouthKoreaMap: React.FC<SouthKoreaMapProps> = ({ data, color, selectedRegion, onRegionClick }) => {
  const maxCount = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="relative w-full aspect-[11/12] max-h-[600px] mx-auto">
      <svg
        viewBox="0 0 550 600"
        className="w-full h-full drop-shadow-2xl"
        style={{ filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.2))' }}
      >
        <g>
          {REGIONS.map((region) => {
            const regionData = data.find(d => d.region === region.id);
            const count = regionData ? regionData.count : 0;
            const opacity = 0.1 + (count / maxCount) * 0.8;
            const isSelected = selectedRegion === region.id;

            return (
              <motion.g
                key={region.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                onClick={() => onRegionClick?.(region.id)}
                className="cursor-pointer group"
              >
                <motion.path
                  d={region.path}
                  fill={color}
                  initial={{ fillOpacity: opacity }}
                  animate={{ 
                    fillOpacity: opacity,
                    stroke: isSelected ? 'white' : 'rgba(255,255,255,0.15)',
                    strokeWidth: isSelected ? 2 : 0.5
                  }}
                  whileHover={{ 
                    fillOpacity: Math.min(opacity + 0.2, 1),
                    stroke: 'white',
                    strokeWidth: 1.5,
                    transition: { duration: 0.2 }
                  }}
                  className="transition-colors duration-200"
                />
                
                {/* Region Label */}
                <text
                  x={region.labelPos.x}
                  y={region.labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="pointer-events-none select-none fill-foreground font-bold"
                  style={{ fontSize: '9px', textShadow: '0 0 3px rgba(0,0,0,0.8)' }}
                >
                  {region.name}
                </text>
              </motion.g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default SouthKoreaMap;
`;

fs.writeFileSync('d:/뉴프로젝트/투어리즘인사이트/홈페이지_리뉴얼/Web/src/components/SouthKoreaMap.tsx', content);
