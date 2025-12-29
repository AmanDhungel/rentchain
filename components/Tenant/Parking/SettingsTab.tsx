import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit2, MapPin } from "lucide-react";
import * as z from "zod";

export const pricingSchema = z.object({
  markup: z.string().optional(),
  fixedAmount: z.string().optional(),
});

export type PricingFormValues = z.infer<typeof pricingSchema>;
export function SettingsTab() {
  const form = useForm<PricingFormValues>({
    resolver: zodResolver(pricingSchema),
  });

  const onSubmit = (data: PricingFormValues) => console.log(data);

  const pricingSpots = [
    {
      id: "P1-A-001",
      loc: "Level 1, Section A",
      cost: 150,
      price: 200,
      profit: 50,
    },
    {
      id: "P1-A-002",
      loc: "Level 1, Section A",
      cost: 150,
      price: 200,
      profit: 50,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold">Pricing Configuration</h3>
        <p className="text-sm text-muted-foreground">
          Set custom sublease prices for each parking spot
        </p>
      </div>

      <div className="space-y-4">
        {pricingSpots.map((spot) => (
          <Card key={spot.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between mb-4">
                <div>
                  <p className="font-bold text-sm">{spot.id}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin size={12} /> {spot.loc}
                  </p>
                </div>
                <Edit2
                  size={16}
                  className="text-muted-foreground cursor-pointer"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-red-50 border border-red-100 p-3 rounded-md">
                  <p className="text-[10px] text-red-600 uppercase font-bold">
                    Your Cost
                  </p>
                  <p className="text-lg font-bold text-red-600">${spot.cost}</p>
                </div>
                <div className="bg-green-50 border border-green-100 p-3 rounded-md">
                  <p className="text-[10px] text-green-600 uppercase font-bold">
                    Sublease Price
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    ${spot.price}
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-100 p-3 rounded-md">
                  <p className="text-[10px] text-blue-600 uppercase font-bold">
                    Profit
                  </p>
                  <p className="text-lg font-bold text-blue-600">
                    ${spot.profit}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Bulk Pricing Actions</CardTitle>
          <p className="text-xs text-muted-foreground">
            Apply pricing changes to multiple spots
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium">Apply Markup to All Spots</p>
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="markup"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="Markup %" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="button" className="bg-orange-500">
                    Apply
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Example: 30% markup will set sublease prices at 30% above your
                  costs
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Set Fixed Amount Above Cost
                </p>
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="fixedAmount"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="Amount ($)" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="button" className="bg-orange-500">
                    Apply
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Example: $50 will add $50 to each spot`s cost for sublease
                  pricing
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
