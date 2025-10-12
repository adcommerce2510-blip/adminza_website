import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Customer from '@/models/Customer'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const body = await request.json()
    const { username, password } = body

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Find customer by username
    const customer = await Customer.findOne({ username: username.toLowerCase() })

    if (!customer) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      )
    }

    // Check if customer is blocked
    if (customer.status === 'blocked') {
      return NextResponse.json(
        { error: 'Your account has been blocked. Please contact support.' },
        { status: 403 }
      )
    }

    // Simple password verification (plain text comparison)
    if (customer.password !== password) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      )
    }

    // Update last login
    customer.lastLogin = new Date()
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
      status: customer.status
    }

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      customer: customerData
    })
  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

