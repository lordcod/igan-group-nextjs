import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { TabsContent } from "@/components/ui/tabs"

export default function ManagementSection({
    type,
    title,
    icon,
    description,
    isOpen,
    setIsOpen,
    data,
    formComponent: FormComponent,
    renderItems,
    onAdd,
}: {
    type: string
    title: string
    icon: React.ReactNode
    description: string
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    data: any[]
    formComponent: React.ComponentType<{ onSave: (item: any) => void; onCancel: () => void }>
    renderItems: () => React.ReactNode
    onAdd: (type: string, item: any) => void
}) {
    return (
        <TabsContent value={type}>
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader className="flex md:flex-row md:items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center">
                            {icon}
                            {title} ({data.length})
                        </CardTitle>
                        <p className="text-sm text-gray-600">{description}</p>
                    </div>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Добавить
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Добавить новый элемент</DialogTitle>
                            </DialogHeader>
                            <FormComponent
                                onSave={(item) => onAdd(type, item)}
                                onCancel={() => setIsOpen(false)}
                            />
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {renderItems()}
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    )
}
