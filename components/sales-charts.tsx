"use client"

import { useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for sales by channel
const salesByChannel = [
  { name: "Website", value: 4200 },
  { name: "Mobile App", value: 3800 },
  { name: "Marketplace", value: 2500 },
  { name: "Social Media", value: 1500 },
  { name: "In-store", value: 2000 },
]

// Mock data for sales by category
const salesByCategory = [
  { name: "Electronics", value: 5200 },
  { name: "Clothing", value: 4100 },
  { name: "Home & Kitchen", value: 3200 },
  { name: "Beauty", value: 2400 },
  { name: "Sports", value: 1800 },
]

// Mock data for monthly sales
const monthlySales = [
  { name: "Jan", website: 4000, app: 2400, marketplace: 1800 },
  { name: "Feb", website: 3000, app: 1398, marketplace: 2000 },
  { name: "Mar", website: 2000, app: 9800, marketplace: 2200 },
  { name: "Apr", website: 2780, app: 3908, marketplace: 2500 },
  { name: "May", website: 1890, app: 4800, marketplace: 2300 },
  { name: "Jun", website: 2390, app: 3800, marketplace: 2100 },
  { name: "Jul", website: 3490, app: 4300, marketplace: 2400 },
  { name: "Aug", website: 4000, app: 2400, marketplace: 2800 },
  { name: "Sep", website: 3300, app: 2900, marketplace: 2600 },
  { name: "Oct", website: 2900, app: 3100, marketplace: 2500 },
  { name: "Nov", website: 3800, app: 4200, marketplace: 2700 },
  { name: "Dec", website: 4300, app: 5000, marketplace: 3000 },
]

// Mock data for daily sales
const dailySales = [
  { name: "Mon", sales: 1200 },
  { name: "Tue", sales: 1400 },
  { name: "Wed", sales: 1800 },
  { name: "Thu", sales: 1600 },
  { name: "Fri", sales: 2000 },
  { name: "Sat", sales: 2400 },
  { name: "Sun", sales: 1900 },
]

// Colors for pie charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function SalesCharts() {
  const [timeRange, setTimeRange] = useState("year")

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Sales Performance</h2>
        <Select defaultValue={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="quarter">Last Quarter</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
            <CardDescription>Monthly sales across all channels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Sales"]} />
                  <Legend />
                  <Line type="monotone" dataKey="website" stroke="#8884d8" activeDot={{ r: 8 }} name="Website" />
                  <Line type="monotone" dataKey="app" stroke="#82ca9d" name="Mobile App" />
                  <Line type="monotone" dataKey="marketplace" stroke="#ffc658" name="Marketplace" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Channel</CardTitle>
            <CardDescription>Distribution across sales channels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesByChannel}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {salesByChannel.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, "Sales"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Product category performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {salesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, "Sales"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Sales</CardTitle>
            <CardDescription>Sales performance by day of week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Sales"]} />
                  <Bar dataKey="sales" fill="#adfa1d" name="Daily Sales" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
