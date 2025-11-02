import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase.from("burnin").select();

    if (error) {
      return NextResponse.json(
        {
          type: "FAILED",
          message: "Cannot get data from db.",
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { type: "SUCCESS", message: "Success get data from db.", data },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { type: "ERROR", message: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { serialnumber } = await req.json();

    if (!serialnumber) {
      return NextResponse.json(
        { type: "FAILED", message: "Serial number is required." },
        { status: 400 }
      );
    }

    const { data: existing, error: checkError } = await supabase
      .from("burnin")
      .select()
      .eq("serialnumber", serialnumber)
      .maybeSingle();

    if (checkError) {
      return NextResponse.json(
        {
          type: "FAILED",
          message: "Error checking existing data.",
          error: checkError.message,
        },
        { status: 500 }
      );
    }

    if (existing) {
      return NextResponse.json(
        {
          type: "FAILED",
          message: `Data with serial number ${serialnumber} already exists.`,
          data: existing,
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("burnin")
      .insert([{ serialnumber, status: "burn" }])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          type: "FAILED",
          message: "Cannot post data to db.",
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { type: "SUCCESS", message: "Success post data to db.", data },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { type: "ERROR", message: err.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { serialnumber } = await req.json();

    if (!serialnumber) {
      return NextResponse.json(
        { type: "FAILED", message: "Serial number are required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("burnin")
      .update({ status: "reported" })
      .eq("serialnumber", serialnumber)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          type: "FAILED",
          message: "Cannot update data to db.",
          error: error.message,
        },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        {
          type: "FAILED",
          message: `Data with serial number ${serialnumber} not found.`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { type: "SUCCESS", message: "Success update data in db.", data },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { type: "ERROR", message: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { serialnumber } = body;

    if (!serialnumber) {
      return NextResponse.json(
        { type: "FAILED", message: "Serial number is required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("burnin")
      .delete()
      .eq("serialnumber", serialnumber)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          type: "FAILED",
          message: "Cannot delete data from db.",
          error: error.message,
        },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        {
          type: "FAILED",
          message: `Data with serial number ${serialnumber} not found.`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        type: "SUCCESS",
        message: `Success delete data ${serialnumber}.`,
        data,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { type: "ERROR", message: err.message },
      { status: 500 }
    );
  }
}
