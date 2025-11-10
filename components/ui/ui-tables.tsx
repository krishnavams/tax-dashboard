import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "./card"
import { ChartBarLabelCustom } from "./mandate-summary"

const invoices = [
  {
    Mandate: "GST",
    Value: "25210374",
    Volume: "2053"
  },
  {
    Mandate: "CBDT",
    Value: "755984",
    Volume: "150.00"
  },
  {
    Mandate: "Telangana",
    Value: "675878",
    Volume: "350.00"
  },
  {
    Mandate: "Meghalaya",
    Value: "597498",
    Volume: "450.00"
  },
  {
    Mandate: "Assam",
    Value: "519702",
    Volume: "550.00"
  },
  {
    Mandate: "ICEGATE",
    Value: "200000",
    Volume: "200.00"
  }
]

export function TableDemo() {
  return (
    <>
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-4 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
    <Card>
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Mandate Name</TableHead>
          <TableHead>Value</TableHead>
          <TableHead className="text-right">Volume</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.Mandate}>
            <TableCell className="font-medium">{invoice.Mandate}</TableCell>
            <TableCell>{invoice.Value}</TableCell>
            <TableCell className="text-right">{invoice.Volume}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>00</TableCell>
          <TableCell className="text-right">0.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </Card>
    <Card>
        <ChartBarLabelCustom />
    </Card>
    </div>
    </>
  )}
