"use client"
import {TableCell, TableRow} from "@/components/ui/table";
import {Switch} from "@/components/ui/switch";
import {Button} from "@/components/ui/button";
import {BadgeX, Pencil} from "lucide-react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {useState} from "react";

export default function Dashboardtablerow({ item, index }) {
    const [isPublic, setIsPublic] = useState(item.isPublic)
    const [isSold, setIsSold] = useState(item.isSold)
    const handleChangeIsPubic = async () => {
        const prevState = isPublic
        setIsPublic(!isPublic)
        try {
            const res = await fetch(`/api/offer?id=${item.id}`, {
                method: "PUT",
                body: JSON.stringify({isPublic: !prevState})
            })
            if (!res.ok) {
                setIsPublic(prevState)
            }
            setIsPublic(!prevState)
        } catch (e) {
            console.log("błąd edytowania")
        }
    }
    const handleChangeIsSold = async () => {
        const prevState = isSold
        setIsSold(!isSold)
        try {
            const res = await fetch(`/api/offer?id=${item.id}`, {
                method: "PUT",
                body: JSON.stringify({isSold: !prevState})
            })
            if (!res.ok) {
                setIsSold(prevState)
            }
            setIsSold(!prevState)
        } catch (e) {
            console.log("błąd edytowania")
        }
    }
    return (
        <TableRow>
        <TableCell className="text-center">
            {index+1}
        </TableCell>
        <TableCell>
            {item.name}
        </TableCell>
        <TableCell className="text-center">
            {item.info.price.toLocaleString()} zł
        </TableCell>
        <TableCell className="text-center">
            <Switch  checked={isPublic} onCheckedChange={handleChangeIsPubic}/>
        </TableCell>
        <TableCell className="text-center">
            <Switch  checked={isSold} onCheckedChange={handleChangeIsSold}/>
        </TableCell>
        <TableCell className="text-center">
            <Button variant="ghost">
                <Pencil className="mr-2 h-5 w-5"/>
                <span>edytuj</span>
            </Button>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="ghost">
                        <BadgeX className="mr-2 h-5 w-5" />
                        <span>usuń</span>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        Na pewno chcesz usunąć ogłoszenie?
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                        Ogłoszenie do usunięcia {item.name}
                    </AlertDialogDescription>
                    <AlertDialogFooter className="flex gap-2 w-full justify-end">
                        <AlertDialogCancel>anuluj</AlertDialogCancel>
                        <AlertDialogAction>usuń</AlertDialogAction>
                    </AlertDialogFooter>

                </AlertDialogContent>
            </AlertDialog>
        </TableCell>
    </TableRow>
    )
}