import { formatCurrencyShort } from "@/lib/helpers/formatCurrency";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

type CurrentPotsFutureValueChartProps = {
  data: { name: string; value: number }[];
};

// Pick random colors for the pie chart segments
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};

export default function CurrentPotsFutureValueChart({
  data,
}: Readonly<CurrentPotsFutureValueChartProps>) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          label={({ name, value }) => `${name}: ${formatCurrencyShort(value)}`}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={getRandomColor()} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
