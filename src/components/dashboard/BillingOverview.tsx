
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface BillingStats {
  invoicesIssued: number;
  invoicesPaid: number;
  pendingPayments: number;
  overduePayments: number;
  totalAmount: string;
  collectedAmount: string;
  collectionRate: number;
}

const billingData: BillingStats = {
  invoicesIssued: 398,
  invoicesPaid: 352,
  pendingPayments: 28,
  overduePayments: 18,
  totalAmount: "$25,870,000",
  collectedAmount: "$22,880,000",
  collectionRate: 88.4,
};

export function BillingOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Facturación del mes</CardTitle>
        <CardDescription>
          Resumen del estado de facturación y cobranza
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-sm font-medium">Estado de pagos</p>
              <h3 className="text-2xl font-bold">{billingData.collectionRate}%</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {billingData.invoicesPaid} pagadas de {billingData.invoicesIssued} facturas
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <PaymentStatusCard
                count={billingData.pendingPayments}
                label="Pendientes"
                variant="pending"
              />
              <PaymentStatusCard
                count={billingData.overduePayments}
                label="Vencidas"
                variant="overdue"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Tasa de cobranza</span>
              <span>{billingData.collectionRate}%</span>
            </div>
            <Progress value={billingData.collectionRate} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Recaudado: {billingData.collectedAmount}</span>
              <span>Total: {billingData.totalAmount}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface PaymentStatusCardProps {
  count: number;
  label: string;
  variant: "pending" | "overdue";
}

function PaymentStatusCard({ count, label, variant }: PaymentStatusCardProps) {
  const bgClass = variant === "pending" ? "bg-yellow-100" : "bg-red-100";
  const textClass = variant === "pending" ? "text-yellow-800" : "text-red-800";

  return (
    <div className={`${bgClass} ${textClass} p-2 rounded-md`}>
      <p className="text-lg font-bold">{count}</p>
      <p className="text-xs">{label}</p>
    </div>
  );
}
