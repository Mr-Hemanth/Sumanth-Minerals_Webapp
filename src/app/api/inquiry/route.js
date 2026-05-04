import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Inquiry from '@/models/Inquiry';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();

    // Calculate Lead Score
    let leadScore = 0;
    if (data.quantity && parseInt(data.quantity) > 500) leadScore += 50;
    if (data.type === 'Sample Request') leadScore += 20;
    if (data.company) leadScore += 10;
    if (data.email && !data.email.includes('gmail.com') && !data.email.includes('yahoo.com')) leadScore += 30;

    // Create inquiry in DB
    const inquiry = await Inquiry.create({ ...data, leadScore });

    // Send Email Notification
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"Kanaka Minerals Web" <' + process.env.EMAIL_USER + '>',
      to: 'sales@kanakaminerals.com', // Admin email
      subject: `New Bulk Inquiry from ${data.name} (${data.company})`,
      html: `
        <h2>New Inquiry Received</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Company:</strong> ${data.company}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>WhatsApp:</strong> ${data.whatsapp}</p>
        <p><strong>Quantity:</strong> ${data.quantity}</p>
        <p><strong>Country:</strong> ${data.country}</p>
        <p><strong>Message:</strong> ${data.message}</p>
        <br/>
        <p>View details in admin panel: https://kanakaminerals.com/admin</p>
      `,
    };

    // Note: nodemailer might fail if env vars aren't set, but we still want to return 200 if DB save works
    try {
      if (process.env.EMAIL_USER) {
        await transporter.sendMail(mailOptions);
      }
    } catch (emailError) {
      console.error('Email failed but inquiry saved:', emailError);
    }

    return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: inquiries });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
