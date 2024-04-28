"use client"

import {Button} from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Tiptap from "@/components/tiptap";
import {useState} from "react";
import Moreinfocard from "@/components/moreinfocard";
import Photodropzone from "@/components/photodropzone";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

export default function page() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [year, setYear] = useState("")
    const [process, setProcess] = useState("")
    const [power, setPower] = useState("")
    const [capacity, setCapacity] = useState("")
    const [fuel, setFuel] = useState("")
    const [drive, setDrive] = useState("")
    const [description, setDescription] = useState("");
    const [moreInfo, setMoreInfo] = useState([])
    const [files, setFiles] = useState([])


    const addMoreInfo = () => {
        const demo = {name: "", value: ""}
        setMoreInfo(prevState => prevState.concat(demo))
    }

    const sendFile = async (file) => {
        const res = await fetch("/api/s3-upload", {
            method: "POST",
            body: file
        })
        if (!res.ok) {
            console.log("błąd wysyłania pliku")
            return ""
        }
        console.log("odebrano", res)
    }

    const imageDrop = async (imageFiles) => {
        if (imageFiles) {
            console.log("drop", imageFiles)
            for (const imageFile of imageFiles) {
                await sendFile(imageFile);
            }
            setFiles(files.concat(imageFiles))
            console.log("pliki", files)
        }
    }
    const send = async () => {
        const info = {
            price: parseInt(price.replace(/\s/g, '')),
            year: parseInt(year),
            process: parseInt(process.replace(/\s/g, '')),
            power: parseInt(power),
            capacity: parseInt(capacity),
            fuel: fuel,
            drive: drive
        }
        const data= {
            name: name,
            description: description,
            info: info,
            moreInfo: moreInfo,
            photos: []
        }
        console.log(data)
        try {
            const res = await fetch(`/api/offer`, {
                method: "POST",
                body: JSON.stringify(data)
            })
            if (!res.ok) {
                throw new Error(await res.text())
            }
        } catch (e) {
            console.log(e)
        }

    }
    return (
        <div>
            <div className="border-b-2 py-3 px-2 flex justify-between items-center">
                <div>
                    <p className="text-xl">
                        Opcje
                    </p>
                </div>
                <div>
                    <Button onClick={send}>
                            Stwórz
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-2 p-2 gap-2">
                <div className="flex flex-row gap-2 w-auto">
                    <Card className="p-3">
                        <CardHeader>
                            <CardTitle className="whitespace-nowrap text-center px-10">
                                Podstatowe dane
                            </CardTitle>
                        </CardHeader>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="marka">marka/model</Label>
                            <Input type="text" id="marka" placeholder="marka/model" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="price">cena</Label>
                                <div className="flex items-center gap-1"><Input type="text" id="price" placeholder="cena" value={price} onChange={(e) => {
                                    let newPriceValue = e.target.value.replace(/\D/g, '');
                                    newPriceValue = newPriceValue.replace(/\s/g, '');
                                    newPriceValue = newPriceValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                                    setPrice(newPriceValue);}}/>zł</div>
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="rok">rok produkcji</Label>
                                <Input type="number" id="rok" placeholder="rok produkcji" value={year} onChange={(e) => setYear(e.target.value)}/>
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="przebieg">przebieg</Label>
                                <div className="flex items-center gap-1"><Input type="text" id="przebieg" placeholder="przebieg" value={process} onChange={(e) => {
                                    let newPriceValue = e.target.value.replace(/\D/g, '');
                                    newPriceValue = newPriceValue.replace(/\s/g, '');
                                    newPriceValue = newPriceValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                                    setProcess(newPriceValue);}}/>km</div>
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="moc">moc silnika</Label>
                                <div className="flex items-center gap-1"><Input type="number" id="moc" placeholder="moc silnika" value={power} onChange={(e) => setPower(e.target.value)}/>KM</div>
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="pojemnosc">pojemoność silnika</Label>
                                <div className="flex items-center gap-1"><Input type="number" id="pojemnosc" placeholder="pojemoność silnika" value={capacity} onChange={(e) => setCapacity(e.target.value)}/>cm3</div>
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="paliwo">rodzaj paliwa</Label>
                                <Input type="text" id="paliwo" placeholder="rodzaj paliwa" value={fuel} onChange={(e) => setFuel(e.target.value)}/>
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="naped">napęd</Label>
                                <Input type="text" id="naped" placeholder="napęd" value={drive} onChange={(e) => setDrive(e.target.value)}/>
                            </div>
                        </div>
                    </Card>
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="text-center">
                                Dodatkowe informacje
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-1">
                            {moreInfo.map((item, index) => <Moreinfocard key={index} data={item} setInfo={setMoreInfo} index={index}/>)}
                            <Button onClick={addMoreInfo} className="w-full">dodaj informację</Button>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex flex-col gap-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center">
                                Opis
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tiptap setTextState={setDescription} />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center">
                                Zdjęcia
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Photodropzone onImageDrop={(imageFile) => imageDrop(imageFile)} type="slider"/>
                            {files.length > 0 && (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Lp.</TableHead>
                                        <TableHead>nazwa</TableHead>
                                        <TableHead>waga</TableHead>
                                        <TableHead>opcje</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {files.map((file, index) => (
                                        <TableRow>
                                            <TableCell>{index+1}</TableCell>
                                            <TableCell>{file.name}</TableCell>
                                            <TableCell>{( file.size / 8000).toFixed(2)} kb</TableCell>
                                            <TableCell>:</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}