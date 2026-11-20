import React from 'react';
import Svg, { Path, Line, Circle, Rect, Text as SvgText } from 'react-native-svg';
import { useApp } from '../store';

export default function SeasonChart({ counts, highlight, width, height = 110 }: {
  counts: number[]; highlight: number; width: number; height?: number;
}) {
  const { colors } = useApp();
  const max = Math.max(1, ...counts);
  const top = 32;
  const bottom = 8;
  const span = width - 24;
  const xs = counts.map((_, i) => 12 + (i * span) / 11);
  const ys = counts.map((v) => height - bottom - (v / max) * (height - top - bottom));
  const pts: Array<[number, number]> = [[0, ys[0]], ...xs.map((x, i): [number, number] => [x, ys[i]]), [width, ys[11]]];
  const line = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const area = `${line} L${width},${height} L0,${height} Z`;
  const hasMarker = highlight >= 1 && highlight <= 12;
  const hx = hasMarker ? xs[highlight - 1] : 0;
  const hy = hasMarker ? ys[highlight - 1] : 0;
  return (
    <Svg width={width} height={height}>
      {[0.25, 0.5, 0.75].map((f) => (
        <Line key={f} x1={0} x2={width} y1={top + (height - top - bottom) * f} y2={top + (height - top - bottom) * f} stroke={colors.grid} strokeWidth={1} />
      ))}
      <Path d={area} fill={colors.chartFill} />
      <Path d={line} fill="none" stroke={colors.ink} strokeWidth={2} strokeLinejoin="round" />
      {hasMarker ? (
        <>
          <Circle cx={hx} cy={hy} r={11} fill={colors.warnBg} />
          <Rect x={hx - 1.5} y={hy - 8} width={3} height={16} rx={1.5} fill={colors.accent} />
          <SvgText x={hx} y={Math.max(14, hy - 18)} fontSize={12} fontWeight="600" fill={colors.warnText} textAnchor="middle">
            {String(counts[highlight - 1])}
          </SvgText>
        </>
      ) : null}
    </Svg>
  );
}
