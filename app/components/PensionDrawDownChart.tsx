import formatCurrency from "@/lib/helpers/formatCurrency";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";

export interface PensionDrawdownChartProps {
  data: { age: number; balance: number }[];
}

export function PensionDrawdownChart({
  data,
}: Readonly<PensionDrawdownChartProps>): React.JSX.Element {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <XAxis dataKey="age" />
        <YAxis tickFormatter={formatCurrency} />
        <Tooltip formatter={formatCurrency} />
        <Area
          type="monotone"
          dataKey="balance"
          stroke="#ff7300"
          fill="#ffc658"
          isAnimationActive={false}
        />
        <ReferenceLine y={0} stroke="#999" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
