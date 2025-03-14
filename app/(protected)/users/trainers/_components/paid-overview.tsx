import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { computeTrainerIncome } from "@/lib/utils"
import { Appointment } from "@/types/appwrite.types"

const accounts = [
    { name: "Checking", balance: 5240.23 },
    { name: "Savings", balance: 12750.89 },
    { name: "Investment", balance: 7890.45 },
]

export function PaidOverview({ earnings }: { earnings: Appointment[] }) {
    const totalBalance = earnings.reduce((sum, account) => sum + computeTrainerIncome(account), 0)

    return (
        <Card className="border border-border">
            <CardHeader>
                <CardTitle className="text-lg font-medium">Earnings Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-semibold mb-4">₱{totalBalance.toFixed(2)}</div>
                <div className="space-y-2">
                    {earnings.map((a) => {
                        const total = computeTrainerIncome(a);
                        return (
                            <div key={a.$id} className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground capitalize">{a.userProfile.name} - {new Date(a.date).toLocaleString()} - {a.paymentMethod}</span>
                                <span className="font-medium">₱{total?.toFixed(2)}</span>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}

