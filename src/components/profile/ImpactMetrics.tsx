// src/components/profile/ImpactMetrics.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChartData } from "@/types/profile";
import { Bar, BarChart, CartesianGrid, Pie, PieChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const ImpactMetrics = ({ charts }: { charts: ChartData }) => (
  <Card>
    <CardHeader>
      <CardTitle>Impact Visualization</CardTitle>
      <CardDescription>Your donation trends over the last 12 months.</CardDescription>
    </CardHeader>
    <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
            <h3 className="text-lg font-semibold mb-4 text-center">Monthly Donations</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={charts.donationTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="donations" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
        <div>
            <h3 className="text-lg font-semibold mb-4 text-center">Category Breakdown</h3>
             <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={charts.categoryBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                         {charts.categoryBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
             </ResponsiveContainer>
        </div>
    </CardContent>
  </Card>
);