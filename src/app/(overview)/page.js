import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Image} from "@nextui-org/react";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between h-[2000px]">
                <h1>pojazdy</h1>
            <Card>
                <CardHeader>
                    <Image src="https://www.carscollection.pl/wp-content/uploads/elementor/thumbs/IMG_6170-qlhjeovoaaxqfnh25bkz12bvxcqcb1qgh89g5lfav8.jpg" className="w-full"/>
                </CardHeader>
                <CardContent>
                    test
                </CardContent>
            </Card>
        </main>
    );
}