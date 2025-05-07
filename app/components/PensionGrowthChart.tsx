import { USER_AGE } from "@/lib/constants";
import formatCurrency, {
  formatCurrencyShort,
} from "@/lib/helpers/formatCurrency";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  Legend,
} from "recharts";

type PensionGrowthChartProps = {
  data: {
    age: number;
    balance: number;
  }[];
  desiredPensionLumpSum: number;
  startAge?: number;
  retirementAge: number;
};

export default function PensionGrowthChart({
  data,
  desiredPensionLumpSum,
  startAge = USER_AGE,
  retirementAge,
}: Readonly<PensionGrowthChartProps>): React.JSX.Element {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <XAxis dataKey="age" />
        <YAxis tickFormatter={formatCurrencyShort} />
        <Tooltip formatter={formatCurrency} />

        {/* Background shading */}
        <ReferenceArea
          x1={startAge}
          x2={retirementAge}
          fill="green"
          fillOpacity={0.1}
        />

        {/* Projected balance curve */}
        <Area
          type="monotone"
          dataKey="balance"
          name="Projected"
          stroke="#82ca9d"
          fill="#82ca9d"
        />

        {/* Flat target line */}
        <Line
          type="monotone"
          dataKey={() => desiredPensionLumpSum}
          stroke="#FFA500"
          name="Desired"
          dot={false}
          strokeDasharray="5 5"
        />

        <Legend verticalAlign="top" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
