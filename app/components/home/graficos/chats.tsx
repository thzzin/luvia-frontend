"use client"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
export const description = "A bar chart with a label"
const chartData = [
  { month: "Janeiro", conversas: 186 },
  { month: "Fevereiro", conversas: 305 },
  { month: "Março", conversas: 237 },
  { month: "Abril", conversas: 73 },
  { month: "Maio", conversas: 209 },
  { month: "Junho", conversas: 200 },
  { month: "Julho", conversas: 123 },
  { month: "Agosto", conversas: 322 },
  { month: "Setembro", conversas: 112 },
  { month: "Outubro", conversas: 33 },
  { month: "Novembro", conversas: 231 },
  { month: "Dezembro", conversas: 450 },

]
const chartConfig = {
  conversas: {
    label: "Novas Conversas ",
    color: "#DB636F",
  },
} satisfies ChartConfig

export default function Chats() {
    return (
          <Card className="p-6 h-full">
      <CardHeader>
        <CardTitle className="bold text-2xl">Novas Conversas</CardTitle>
        <CardDescription>Janeiro - Dezembro 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="conversas" fill="var(--color-conversas)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
    )
}
