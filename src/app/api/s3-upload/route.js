import {S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import {NextResponse} from "next/server";


const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    }
})

async function uploadFileToS3(file, filename) {
    const fileBuffer = file
    console.log(fileName)

    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: "",
        Body: fileBuffer,
        ContentType: "image/jpg"
    }
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    return filename
}

export async function POST(req) {
    try {
        console.log("test")
        const data = await req.formData();
        const file = data.getAll("file");
        console.log(file)
        if (!file) return NextResponse.json( { error: "File is required."}, { status: 400 })

        const buffer = Buffer.from(await file.arrayBuffer())
        // const fileName = await uploadFileToS3(buffer, file.name);




        return NextResponse.json({ success: true, fileName})
    } catch (e) {
        return NextResponse.json({ error: "Error uplading file"})
    }
}