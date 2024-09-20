'use client'

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
} from "@/components/ui/chart";

export const description = "A simple pie chart";

const chartData = [
  { genero: "Masculino", visitors: 275, fill: "var(--color-chrome)" },
  { genero: "Feminino", visitors: 200, fill: "var(--color-safari)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Masculino",
    color: "#0F5FC2",
  },
  safari: {
    label: "Feminino",
    color: "#DB636F",
  },
} satisfies ChartConfig;

// Função personalizada para renderizar as legendas corretamente
const renderLegend = (props) => {
  const { payload } = props;
  return (
    <ul className="flex gap-4 justify-center items-center">
      {payload.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center gap-2">
          <span
            className="block w-4 h-4"
            style={{ backgroundColor: entry.color || entry.fill }}
          />
          {entry.value || entry.genero}
        </li>
      ))}
    </ul>
  );
};

export default function ChartChats() {
  return (
    <Card className="flex flex-col p-6">
      <CardHeader className="items-center pb-0">
        <CardTitle className="bold text-2xl">Clientes</CardTitle>
        <CardDescription>Setembro 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors" nameKey="genero" />
            {/* Customizando a legenda para mostrar nomes */}
            <ChartLegend content={renderLegend} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
