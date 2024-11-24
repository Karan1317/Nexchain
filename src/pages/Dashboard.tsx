"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpRight, ArrowDownRight, Package, Truck, AlertTriangle, DollarSign, TrendingUp, Users } from 'lucide-react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d')

  const inventoryData = [
    { name: 'Mon', total: 820 },
    { name: 'Tue', total: 932 },
    { name: 'Wed', total: 901 },
    { name: 'Thu', total: 934 },
    { name: 'Fri', total: 1290 },
    { name: 'Sat', total: 1330 },
    { name: 'Sun', total: 1320 },
  ]

  const orderData = [
    { name: 'Mon', total: 15 },
    { name: 'Tue', total: 22 },
    { name: 'Wed', total: 18 },
    { name: 'Thu', total: 25 },
    { name: 'Fri', total: 30 },
    { name: 'Sat', total: 12 },
    { name: 'Sun', total: 10 },
  ]

  const topSellingProducts = [
    { name: 'Microprocessor X86', units: 1250 },
    { name: 'LCD Display 24"', units: 980 },
    { name: 'Circuit Board v2', units: 875 },
    { name: 'IoT Sensor Kit', units: 750 },
    { name: 'Smart Hub v3', units: 620 },
  ]

  const recentActivities = [
    { icon: <Users className="h-5 w-5 mr-2 text-blue-500" />, text: 'New supplier onboarded: Tech Solutions Inc.' },
    { icon: <Package className="h-5 w-5 mr-2 text-green-500" />, text: 'Inventory restocked: 500 units of Microprocessor X86' },
    { icon: <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />, text: 'Low stock alert: Circuit Board v2' },
    { icon: <Truck className="h-5 w-5 mr-2 text-purple-500" />, text: 'Shipment dispatched: Order #ORD-2024-003' },
    { icon: <DollarSign className="h-5 w-5 mr-2 text-green-500" />, text: 'Payment received: ₹12,499.50 for Order #ORD-2024-003' },
  ]

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,320</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
            <div className="text-sm text-green-600 flex items-center mt-2">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              18% increase
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">
              5 orders in transit
            </p>
            <div className="text-sm text-yellow-600 flex items-center mt-2">
              <TrendingUp className="h-4 w-4 mr-1" />
              12% increase in order volume
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">8</div>
            <p className="text-xs text-muted-foreground">
              Items below reorder point
            </p>
            <div className="text-sm text-red-600 flex items-center mt-2">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              3 new alerts
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹54,231</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
            <div className="text-sm text-green-600 flex items-center mt-2">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              10% above target
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">Inventory Trends</TabsTrigger>
          <TabsTrigger value="orders">Order Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Levels</CardTitle>
              <CardDescription>
                Daily inventory levels over the past week
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={inventoryData}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Volume</CardTitle>
              <CardDescription>
                Daily order volume over the past week
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={orderData}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Bar dataKey="total" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>
              Best performing products in the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {topSellingProducts.map((product, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{product.name}</span>
                  <span className="font-semibold">{product.units} units</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              Latest updates and actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentActivities.map((activity, index) => (
                <li key={index} className="flex items-center">
                  {activity.icon}
                  <span>{activity.text}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard

