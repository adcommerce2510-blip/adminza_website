import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Customer from '@/models/Customer'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const body = await request.json()
    const { name, username, email, phone, password, address, city, state, zipCode, country } = body

    // Validate required fields
    if (!name || !username || !email || !phone || !password) {
      return NextResponse.json(
        { error: 'Name, username, email, phone, and password are required' },
        { status: 400 }
      )
    }

    // Check if customer already exists (by email or username)
    const existingCustomer = await Customer.findOne({ 
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() }
      ]
    })

    if (existingCustomer) {
      if (existingCustomer.email === email.toLowerCase()) {
        return NextResponse.json(
          { error: 'An account with this email already exists' },
          { status: 409 }
        )
      } else {
        return NextResponse.json(
          { error: 'This username is already taken' },
          { status: 409 }
        )
      }
    }

    // Create new customer
    const customer = await Customer.create({
      name,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      phone,
      password, // Storing plain text password as per requirement
      address: address || '',
      city: city || '',
      state: state || '',
      zipCode: zipCode || '',
      country: country || 'India',
      status: 'active',
      lastLogin: new Date()
    })

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
      message: 'Registration successful',
      customer: customerData
    }, { status: 201 })
  } catch (error: any) {
    console.error('Registration error:', error)
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

