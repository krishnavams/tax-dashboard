"use client";

import * as React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ---------------- TYPES ---------------- */

type MonthData = {
  month: string;
  amount: number;
};

type SubMode = {
  label: string;
  data: MonthData[];
};

type Mandate = {
  mandate: string;
  netBanking: SubMode[];
  pg: SubMode[];
  otc: SubMode[];
};

/* ---------------- MOCK DATA ---------------- */

const DATA: Mandate[] = [{"mandate": "GST", "netBanking": [{"label": "Optimus", "data": [{"month": "Jan", "amount": 1441}, {"month": "Feb", "amount": 1132}, {"month": "Mar", "amount": 1047}, {"month": "Apr", "amount": 1058}, {"month": "May", "amount": 1046}, {"month": "Jun", "amount": 1172}, {"month": "Jul", "amount": 1303}, {"month": "Aug", "amount": 1251}, {"month": "Sep", "amount": 1424}, {"month": "Oct", "amount": 1087}, {"month": "Nov", "amount": 1324}, {"month": "Dec", "amount": 1039}]}, {"label": "BXP", "data": [{"month": "Jan", "amount": 1204}, {"month": "Feb", "amount": 1165}, {"month": "Mar", "amount": 1071}, {"month": "Apr", "amount": 1312}, {"month": "May", "amount": 1000}, {"month": "Jun", "amount": 1407}, {"month": "Jul", "amount": 1155}, {"month": "Aug", "amount": 1003}, {"month": "Sep", "amount": 1332}, {"month": "Oct", "amount": 1471}, {"month": "Nov", "amount": 1375}, {"month": "Dec", "amount": 1386}]}], "pg": [{"label": "Credit Card", "data": [{"month": "Jan", "amount": 1231}, {"month": "Feb", "amount": 1371}, {"month": "Mar", "amount": 1202}, {"month": "Apr", "amount": 1198}, {"month": "May", "amount": 1287}, {"month": "Jun", "amount": 1441}, {"month": "Jul", "amount": 1423}, {"month": "Aug", "amount": 1411}, {"month": "Sep", "amount": 1168}, {"month": "Oct", "amount": 1058}, {"month": "Nov", "amount": 1396}, {"month": "Dec", "amount": 1401}]}, {"label": "Debit Card", "data": [{"month": "Jan", "amount": 1223}, {"month": "Feb", "amount": 1494}, {"month": "Mar", "amount": 1491}, {"month": "Apr", "amount": 1157}, {"month": "May", "amount": 1175}, {"month": "Jun", "amount": 1330}, {"month": "Jul", "amount": 1140}, {"month": "Aug", "amount": 1300}, {"month": "Sep", "amount": 1198}, {"month": "Oct", "amount": 1103}, {"month": "Nov", "amount": 1243}, {"month": "Dec", "amount": 1121}]}, {"label": "UPI", "data": [{"month": "Jan", "amount": 1304}, {"month": "Feb", "amount": 1429}, {"month": "Mar", "amount": 1313}, {"month": "Apr", "amount": 1185}, {"month": "May", "amount": 1167}, {"month": "Jun", "amount": 1369}, {"month": "Jul", "amount": 1382}, {"month": "Aug", "amount": 1177}, {"month": "Sep", "amount": 1301}, {"month": "Oct", "amount": 1356}, {"month": "Nov", "amount": 1246}, {"month": "Dec", "amount": 1103}]}], "otc": [{"label": "Cash", "data": [{"month": "Jan", "amount": 1395}, {"month": "Feb", "amount": 1313}, {"month": "Mar", "amount": 1013}, {"month": "Apr", "amount": 1416}, {"month": "May", "amount": 1295}, {"month": "Jun", "amount": 1363}, {"month": "Jul", "amount": 1432}, {"month": "Aug", "amount": 1490}, {"month": "Sep", "amount": 1255}, {"month": "Oct", "amount": 1073}, {"month": "Nov", "amount": 1084}, {"month": "Dec", "amount": 1107}]}, {"label": "Transfer", "data": [{"month": "Jan", "amount": 1397}, {"month": "Feb", "amount": 1177}, {"month": "Mar", "amount": 1112}, {"month": "Apr", "amount": 1307}, {"month": "May", "amount": 1065}, {"month": "Jun", "amount": 1226}, {"month": "Jul", "amount": 1472}, {"month": "Aug", "amount": 1130}, {"month": "Sep", "amount": 1259}, {"month": "Oct", "amount": 1496}, {"month": "Nov", "amount": 1408}, {"month": "Dec", "amount": 1030}]}, {"label": "Clearing", "data": [{"month": "Jan", "amount": 1310}, {"month": "Feb", "amount": 1067}, {"month": "Mar", "amount": 1499}, {"month": "Apr", "amount": 1034}, {"month": "May", "amount": 1086}, {"month": "Jun", "amount": 1072}, {"month": "Jul", "amount": 1430}, {"month": "Aug", "amount": 1225}, {"month": "Sep", "amount": 1230}, {"month": "Oct", "amount": 1105}, {"month": "Nov", "amount": 1111}, {"month": "Dec", "amount": 1074}]}]}, {"mandate": "CBDT", "netBanking": [{"label": "Optimus", "data": [{"month": "Jan", "amount": 1003}, {"month": "Feb", "amount": 1447}, {"month": "Mar", "amount": 1412}, {"month": "Apr", "amount": 1265}, {"month": "May", "amount": 1496}, {"month": "Jun", "amount": 1069}, {"month": "Jul", "amount": 1214}, {"month": "Aug", "amount": 1429}, {"month": "Sep", "amount": 1150}, {"month": "Oct", "amount": 1133}, {"month": "Nov", "amount": 1219}, {"month": "Dec", "amount": 1375}]}, {"label": "BXP", "data": [{"month": "Jan", "amount": 1164}, {"month": "Feb", "amount": 1075}, {"month": "Mar", "amount": 1255}, {"month": "Apr", "amount": 1318}, {"month": "May", "amount": 1123}, {"month": "Jun", "amount": 1336}, {"month": "Jul", "amount": 1058}, {"month": "Aug", "amount": 1078}, {"month": "Sep", "amount": 1109}, {"month": "Oct", "amount": 1137}, {"month": "Nov", "amount": 1366}, {"month": "Dec", "amount": 1314}]}], "pg": [{"label": "Credit Card", "data": [{"month": "Jan", "amount": 1005}, {"month": "Feb", "amount": 1036}, {"month": "Mar", "amount": 1215}, {"month": "Apr", "amount": 1380}, {"month": "May", "amount": 1494}, {"month": "Jun", "amount": 1154}, {"month": "Jul", "amount": 1084}, {"month": "Aug", "amount": 1020}, {"month": "Sep", "amount": 1016}, {"month": "Oct", "amount": 1176}, {"month": "Nov", "amount": 1018}, {"month": "Dec", "amount": 1389}]}, {"label": "Debit Card", "data": [{"month": "Jan", "amount": 1325}, {"month": "Feb", "amount": 1375}, {"month": "Mar", "amount": 1353}, {"month": "Apr", "amount": 1157}, {"month": "May", "amount": 1360}, {"month": "Jun", "amount": 1491}, {"month": "Jul", "amount": 1315}, {"month": "Aug", "amount": 1469}, {"month": "Sep", "amount": 1431}, {"month": "Oct", "amount": 1468}, {"month": "Nov", "amount": 1211}, {"month": "Dec", "amount": 1026}]}, {"label": "UPI", "data": [{"month": "Jan", "amount": 1267}, {"month": "Feb", "amount": 1374}, {"month": "Mar", "amount": 1249}, {"month": "Apr", "amount": 1309}, {"month": "May", "amount": 1403}, {"month": "Jun", "amount": 1125}, {"month": "Jul", "amount": 1354}, {"month": "Aug", "amount": 1072}, {"month": "Sep", "amount": 1349}, {"month": "Oct", "amount": 1186}, {"month": "Nov", "amount": 1346}, {"month": "Dec", "amount": 1081}]}], "otc": [{"label": "Cash", "data": [{"month": "Jan", "amount": 1241}, {"month": "Feb", "amount": 1318}, {"month": "Mar", "amount": 1036}, {"month": "Apr", "amount": 1084}, {"month": "May", "amount": 1025}, {"month": "Jun", "amount": 1156}, {"month": "Jul", "amount": 1178}, {"month": "Aug", "amount": 1283}, {"month": "Sep", "amount": 1359}, {"month": "Oct", "amount": 1079}, {"month": "Nov", "amount": 1110}, {"month": "Dec", "amount": 1224}]}, {"label": "Transfer", "data": [{"month": "Jan", "amount": 1264}, {"month": "Feb", "amount": 1264}, {"month": "Mar", "amount": 1484}, {"month": "Apr", "amount": 1323}, {"month": "May", "amount": 1260}, {"month": "Jun", "amount": 1301}, {"month": "Jul", "amount": 1065}, {"month": "Aug", "amount": 1390}, {"month": "Sep", "amount": 1251}, {"month": "Oct", "amount": 1346}, {"month": "Nov", "amount": 1231}, {"month": "Dec", "amount": 1389}]}, {"label": "Clearing", "data": [{"month": "Jan", "amount": 1495}, {"month": "Feb", "amount": 1169}, {"month": "Mar", "amount": 1264}, {"month": "Apr", "amount": 1490}, {"month": "May", "amount": 1191}, {"month": "Jun", "amount": 1378}, {"month": "Jul", "amount": 1437}, {"month": "Aug", "amount": 1049}, {"month": "Sep", "amount": 1160}, {"month": "Oct", "amount": 1318}, {"month": "Nov", "amount": 1499}, {"month": "Dec", "amount": 1398}]}]}, {"mandate": "Meghalaya", "netBanking": [{"label": "Optimus", "data": [{"month": "Jan", "amount": 1051}, {"month": "Feb", "amount": 1459}, {"month": "Mar", "amount": 1137}, {"month": "Apr", "amount": 1221}, {"month": "May", "amount": 1094}, {"month": "Jun", "amount": 1009}, {"month": "Jul", "amount": 1456}, {"month": "Aug", "amount": 1198}, {"month": "Sep", "amount": 1071}, {"month": "Oct", "amount": 1121}, {"month": "Nov", "amount": 1302}, {"month": "Dec", "amount": 1275}]}, {"label": "BXP", "data": [{"month": "Jan", "amount": 1437}, {"month": "Feb", "amount": 1141}, {"month": "Mar", "amount": 1495}, {"month": "Apr", "amount": 1423}, {"month": "May", "amount": 1422}, {"month": "Jun", "amount": 1419}, {"month": "Jul", "amount": 1060}, {"month": "Aug", "amount": 1457}, {"month": "Sep", "amount": 1033}, {"month": "Oct", "amount": 1460}, {"month": "Nov", "amount": 1082}, {"month": "Dec", "amount": 1254}]}], "pg": [{"label": "Credit Card", "data": [{"month": "Jan", "amount": 1213}, {"month": "Feb", "amount": 1480}, {"month": "Mar", "amount": 1035}, {"month": "Apr", "amount": 1198}, {"month": "May", "amount": 1158}, {"month": "Jun", "amount": 1311}, {"month": "Jul", "amount": 1477}, {"month": "Aug", "amount": 1072}, {"month": "Sep", "amount": 1297}, {"month": "Oct", "amount": 1270}, {"month": "Nov", "amount": 1415}, {"month": "Dec", "amount": 1231}]}, {"label": "Debit Card", "data": [{"month": "Jan", "amount": 1167}, {"month": "Feb", "amount": 1248}, {"month": "Mar", "amount": 1491}, {"month": "Apr", "amount": 1074}, {"month": "May", "amount": 1268}, {"month": "Jun", "amount": 1445}, {"month": "Jul", "amount": 1476}, {"month": "Aug", "amount": 1303}, {"month": "Sep", "amount": 1367}, {"month": "Oct", "amount": 1280}, {"month": "Nov", "amount": 1343}, {"month": "Dec", "amount": 1490}]}, {"label": "UPI", "data": [{"month": "Jan", "amount": 1180}, {"month": "Feb", "amount": 1278}, {"month": "Mar", "amount": 1259}, {"month": "Apr", "amount": 1230}, {"month": "May", "amount": 1355}, {"month": "Jun", "amount": 1250}, {"month": "Jul", "amount": 1063}, {"month": "Aug", "amount": 1400}, {"month": "Sep", "amount": 1279}, {"month": "Oct", "amount": 1128}, {"month": "Nov", "amount": 1168}, {"month": "Dec", "amount": 1388}]}], "otc": [{"label": "Cash", "data": [{"month": "Jan", "amount": 1309}, {"month": "Feb", "amount": 1495}, {"month": "Mar", "amount": 1294}, {"month": "Apr", "amount": 1105}, {"month": "May", "amount": 1287}, {"month": "Jun", "amount": 1034}, {"month": "Jul", "amount": 1295}, {"month": "Aug", "amount": 1390}, {"month": "Sep", "amount": 1451}, {"month": "Oct", "amount": 1102}, {"month": "Nov", "amount": 1018}, {"month": "Dec", "amount": 1019}]}, {"label": "Transfer", "data": [{"month": "Jan", "amount": 1051}, {"month": "Feb", "amount": 1101}, {"month": "Mar", "amount": 1146}, {"month": "Apr", "amount": 1000}, {"month": "May", "amount": 1478}, {"month": "Jun", "amount": 1449}, {"month": "Jul", "amount": 1113}, {"month": "Aug", "amount": 1452}, {"month": "Sep", "amount": 1493}, {"month": "Oct", "amount": 1248}, {"month": "Nov", "amount": 1005}, {"month": "Dec", "amount": 1348}]}, {"label": "Clearing", "data": [{"month": "Jan", "amount": 1197}, {"month": "Feb", "amount": 1436}, {"month": "Mar", "amount": 1067}, {"month": "Apr", "amount": 1063}, {"month": "May", "amount": 1223}, {"month": "Jun", "amount": 1394}, {"month": "Jul", "amount": 1446}, {"month": "Aug", "amount": 1139}, {"month": "Sep", "amount": 1454}, {"month": "Oct", "amount": 1430}, {"month": "Nov", "amount": 1167}, {"month": "Dec", "amount": 1430}]}]}, {"mandate": "Telangana", "netBanking": [{"label": "Optimus", "data": [{"month": "Jan", "amount": 1084}, {"month": "Feb", "amount": 1267}, {"month": "Mar", "amount": 1412}, {"month": "Apr", "amount": 1302}, {"month": "May", "amount": 1284}, {"month": "Jun", "amount": 1373}, {"month": "Jul", "amount": 1269}, {"month": "Aug", "amount": 1096}, {"month": "Sep", "amount": 1036}, {"month": "Oct", "amount": 1384}, {"month": "Nov", "amount": 1278}, {"month": "Dec", "amount": 1375}]}, {"label": "BXP", "data": [{"month": "Jan", "amount": 1178}, {"month": "Feb", "amount": 1099}, {"month": "Mar", "amount": 1103}, {"month": "Apr", "amount": 1292}, {"month": "May", "amount": 1346}, {"month": "Jun", "amount": 1302}, {"month": "Jul", "amount": 1076}, {"month": "Aug", "amount": 1356}, {"month": "Sep", "amount": 1239}, {"month": "Oct", "amount": 1275}, {"month": "Nov", "amount": 1212}, {"month": "Dec", "amount": 1222}]}], "pg": [{"label": "Credit Card", "data": [{"month": "Jan", "amount": 1032}, {"month": "Feb", "amount": 1215}, {"month": "Mar", "amount": 1420}, {"month": "Apr", "amount": 1175}, {"month": "May", "amount": 1150}, {"month": "Jun", "amount": 1206}, {"month": "Jul", "amount": 1165}, {"month": "Aug", "amount": 1150}, {"month": "Sep", "amount": 1147}, {"month": "Oct", "amount": 1487}, {"month": "Nov", "amount": 1218}, {"month": "Dec", "amount": 1325}]}, {"label": "Debit Card", "data": [{"month": "Jan", "amount": 1246}, {"month": "Feb", "amount": 1412}, {"month": "Mar", "amount": 1097}, {"month": "Apr", "amount": 1302}, {"month": "May", "amount": 1487}, {"month": "Jun", "amount": 1356}, {"month": "Jul", "amount": 1403}, {"month": "Aug", "amount": 1179}, {"month": "Sep", "amount": 1312}, {"month": "Oct", "amount": 1098}, {"month": "Nov", "amount": 1403}, {"month": "Dec", "amount": 1076}]}, {"label": "UPI", "data": [{"month": "Jan", "amount": 1007}, {"month": "Feb", "amount": 1221}, {"month": "Mar", "amount": 1015}, {"month": "Apr", "amount": 1327}, {"month": "May", "amount": 1328}, {"month": "Jun", "amount": 1092}, {"month": "Jul", "amount": 1188}, {"month": "Aug", "amount": 1438}, {"month": "Sep", "amount": 1273}, {"month": "Oct", "amount": 1125}, {"month": "Nov", "amount": 1136}, {"month": "Dec", "amount": 1019}]}], "otc": [{"label": "Cash", "data": [{"month": "Jan", "amount": 1495}, {"month": "Feb", "amount": 1134}, {"month": "Mar", "amount": 1303}, {"month": "Apr", "amount": 1382}, {"month": "May", "amount": 1281}, {"month": "Jun", "amount": 1324}, {"month": "Jul", "amount": 1470}, {"month": "Aug", "amount": 1353}, {"month": "Sep", "amount": 1399}, {"month": "Oct", "amount": 1263}, {"month": "Nov", "amount": 1201}, {"month": "Dec", "amount": 1313}]}, {"label": "Transfer", "data": [{"month": "Jan", "amount": 1303}, {"month": "Feb", "amount": 1467}, {"month": "Mar", "amount": 1256}, {"month": "Apr", "amount": 1160}, {"month": "May", "amount": 1362}, {"month": "Jun", "amount": 1455}, {"month": "Jul", "amount": 1361}, {"month": "Aug", "amount": 1281}, {"month": "Sep", "amount": 1340}, {"month": "Oct", "amount": 1045}, {"month": "Nov", "amount": 1347}, {"month": "Dec", "amount": 1377}]}, {"label": "Clearing", "data": [{"month": "Jan", "amount": 1177}, {"month": "Feb", "amount": 1147}, {"month": "Mar", "amount": 1005}, {"month": "Apr", "amount": 1161}, {"month": "May", "amount": 1160}, {"month": "Jun", "amount": 1385}, {"month": "Jul", "amount": 1261}, {"month": "Aug", "amount": 1159}, {"month": "Sep", "amount": 1296}, {"month": "Oct", "amount": 1482}, {"month": "Nov", "amount": 1020}, {"month": "Dec", "amount": 1008}]}]}, {"mandate": "Assam", "netBanking": [{"label": "Optimus", "data": [{"month": "Jan", "amount": 1332}, {"month": "Feb", "amount": 1271}, {"month": "Mar", "amount": 1333}, {"month": "Apr", "amount": 1143}, {"month": "May", "amount": 1263}, {"month": "Jun", "amount": 1112}, {"month": "Jul", "amount": 1412}, {"month": "Aug", "amount": 1030}, {"month": "Sep", "amount": 1165}, {"month": "Oct", "amount": 1178}, {"month": "Nov", "amount": 1259}, {"month": "Dec", "amount": 1187}]}, {"label": "BXP", "data": [{"month": "Jan", "amount": 1373}, {"month": "Feb", "amount": 1363}, {"month": "Mar", "amount": 1387}, {"month": "Apr", "amount": 1497}, {"month": "May", "amount": 1185}, {"month": "Jun", "amount": 1159}, {"month": "Jul", "amount": 1301}, {"month": "Aug", "amount": 1245}, {"month": "Sep", "amount": 1011}, {"month": "Oct", "amount": 1170}, {"month": "Nov", "amount": 1021}, {"month": "Dec", "amount": 1331}]}], "pg": [{"label": "Credit Card", "data": [{"month": "Jan", "amount": 1306}, {"month": "Feb", "amount": 1245}, {"month": "Mar", "amount": 1311}, {"month": "Apr", "amount": 1005}, {"month": "May", "amount": 1428}, {"month": "Jun", "amount": 1425}, {"month": "Jul", "amount": 1316}, {"month": "Aug", "amount": 1288}, {"month": "Sep", "amount": 1213}, {"month": "Oct", "amount": 1066}, {"month": "Nov", "amount": 1311}, {"month": "Dec", "amount": 1275}]}, {"label": "Debit Card", "data": [{"month": "Jan", "amount": 1329}, {"month": "Feb", "amount": 1393}, {"month": "Mar", "amount": 1089}, {"month": "Apr", "amount": 1472}, {"month": "May", "amount": 1185}, {"month": "Jun", "amount": 1237}, {"month": "Jul", "amount": 1146}, {"month": "Aug", "amount": 1375}, {"month": "Sep", "amount": 1223}, {"month": "Oct", "amount": 1463}, {"month": "Nov", "amount": 1003}, {"month": "Dec", "amount": 1441}]}, {"label": "UPI", "data": [{"month": "Jan", "amount": 1084}, {"month": "Feb", "amount": 1308}, {"month": "Mar", "amount": 1266}, {"month": "Apr", "amount": 1355}, {"month": "May", "amount": 1335}, {"month": "Jun", "amount": 1171}, {"month": "Jul", "amount": 1424}, {"month": "Aug", "amount": 1464}, {"month": "Sep", "amount": 1377}, {"month": "Oct", "amount": 1289}, {"month": "Nov", "amount": 1457}, {"month": "Dec", "amount": 1423}]}], "otc": [{"label": "Cash", "data": [{"month": "Jan", "amount": 1340}, {"month": "Feb", "amount": 1232}, {"month": "Mar", "amount": 1498}, {"month": "Apr", "amount": 1260}, {"month": "May", "amount": 1484}, {"month": "Jun", "amount": 1448}, {"month": "Jul", "amount": 1464}, {"month": "Aug", "amount": 1433}, {"month": "Sep", "amount": 1246}, {"month": "Oct", "amount": 1094}, {"month": "Nov", "amount": 1346}, {"month": "Dec", "amount": 1016}]}, {"label": "Transfer", "data": [{"month": "Jan", "amount": 1294}, {"month": "Feb", "amount": 1408}, {"month": "Mar", "amount": 1108}, {"month": "Apr", "amount": 1298}, {"month": "May", "amount": 1107}, {"month": "Jun", "amount": 1478}, {"month": "Jul", "amount": 1014}, {"month": "Aug", "amount": 1448}, {"month": "Sep", "amount": 1388}, {"month": "Oct", "amount": 1197}, {"month": "Nov", "amount": 1219}, {"month": "Dec", "amount": 1246}]}, {"label": "Clearing", "data": [{"month": "Jan", "amount": 1352}, {"month": "Feb", "amount": 1210}, {"month": "Mar", "amount": 1069}, {"month": "Apr", "amount": 1224}, {"month": "May", "amount": 1380}, {"month": "Jun", "amount": 1082}, {"month": "Jul", "amount": 1463}, {"month": "Aug", "amount": 1113}, {"month": "Sep", "amount": 1222}, {"month": "Oct", "amount": 1306}, {"month": "Nov", "amount": 1247}, {"month": "Dec", "amount": 1131}]}]}];
/* ---------------- HELPERS ---------------- */

function buildChartData(
  mandate: Mandate,
  category: "netBanking" | "pg" | "otc"
) {
  if (!mandate[category].length) return [];

  const months = mandate[category][0].data.map((d) => d.month);

  return months.map((month) => {
    const row: any = { month };

    mandate[category].forEach((mode) => {
      const match = mode.data.find((d) => d.month === month);
      row[mode.label] = match?.amount ?? 0;
    });

    return row;
  });
}

/* ---------------- CHART CONFIG ---------------- */

const chartConfig = {
  amount: {
    label: "Collection",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

/* ---------------- MAIN COMPONENT ---------------- */

export default function MandatePaymentModeLineChart() {
  const [mandateName, setMandateName] = React.useState("GST");
  const [category, setCategory] =
    React.useState<"netBanking" | "pg" | "otc">("netBanking");

  const mandate =
    DATA.find((m) => m.mandate === mandateName) ?? DATA[0];

  const chartData = buildChartData(mandate, category);
  const subModes = mandate[category];

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-1">
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Mandate – Mode Wise Collection</CardTitle>
        <CardDescription>
          Monthly trend by payment sub-modes
        </CardDescription>

        {/* Filters */}
        <div className="flex gap-3 mt-3">
          <Select value={mandateName} onValueChange={setMandateName}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Mandate" />
            </SelectTrigger>
            <SelectContent>
              {DATA.map((m) => (
                <SelectItem key={m.mandate} value={m.mandate}>
                  {m.mandate}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={category}
            onValueChange={(v) =>
              setCategory(v as "netBanking" | "pg" | "otc")
            }
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Payment Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="netBanking">Net Banking</SelectItem>
              <SelectItem value="pg">Payment Gateway</SelectItem>
              <SelectItem value="otc">OTC</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[260px] w-full"
        >
          <LineChart data={chartData} margin={{ left: 20, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              interval={0}          // forces all labels (Jan included)
              tickLine={false}
              axisLine={false}
              tickMargin={1}
                          />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />

            {subModes.map((mode, index) => (
              <Line
                key={mode.label}
                dataKey={mode.label}
                type="monotone"
                stroke={`hsl(${index * 60}, 70%, 50%)`}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
    </div>
  );
}
