import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Customer from '@/models/Customer'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const body = await request.json()
    const { name, username, email, phone, password, address, city, state, zipCode, country, gstNumber } = body

    // Validate required fields
    if (!name || !username || !email || !phone || !password) {
      return NextResponse.json(
        { error: 'Name, username, email, phone, and password are required' },
        { status: 400 }
      )
    }

    // Check if username or email already exists
    const existingCustomer = await Customer.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: email.toLowerCase() }
      ]
    })

    if (existingCustomer) {
      return NextResponse.json(
        { error: 'Username or email already exists' },
        { status: 409 }
      )
    }

    // Create new customer
    const customer = new Customer({
      name,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      phone,
      password, // Stored as plain text per requirement
      address,
      city,
      state,
      zipCode,
      country: country || 'India',
      gstNumber,
      status: 'active'
    })

    await customer.save()

    // Return customer data (excluding password)
    const customerData = {
      _id: customer._id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      zipCode: customer.zipCode,
      country: customer.country,
      gstNumber: customer.gstNumber,
      status: customer.status
    }

    return NextResponse.json({
      success: true,
      message: 'Customer registered successfully',
      customer: customerData
    })
  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
