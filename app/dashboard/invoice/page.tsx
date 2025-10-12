"use client"

import React, { useRef, useState, useEffect } from "react";
import { generateStandardizedPDF } from "../../../utils/pdfGenerator";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Download, Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Helper to convert number to words (simple, for INR)
function numberToWords(num: number) {
  if (isNaN(num)) return "";
  if (num === 0) return "Zero";
  if (num > 999999999) return "Amount too large";
  const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  function inWords(n: number): string {
    let str = "";
    if (n > 19) {
      str += b[Math.floor(n / 10)];
      if (n % 10) str += " " + a[n % 10];
    } else if (n > 0) {
      str += a[n];
    }
    return str;
  }
  let crore = Math.floor(num / 10000000);
  let lakh = Math.floor((num / 100000) % 100);
  let thousand = Math.floor((num / 1000) % 100);
  let hundred = Math.floor((num / 100) % 10);
  let rest = Math.floor(num % 100);
  let result = "";
  if (crore) result += inWords(crore) + " Crore ";
  if (lakh) result += inWords(lakh) + " Lakh ";
  if (thousand) result += inWords(thousand) + " Thousand ";
  if (hundred) result += a[hundred] + " Hundred ";
  if (rest) {
    if (result !== "") result += "and ";
    result += inWords(rest) + " ";
  }
  return result.trim();
}

function amountToWordsWithPaise(amount: number) {
  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);
  let words = numberToWords(rupees);
  if (words) words += ' Rupees';
  if (paise > 0) words += ' and ' + numberToWords(paise) + ' Paise';
  words += ' only';
  return words;
}

// Calculation helpers
const safeNumber = (val: any) => {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') return parseFloat(val.replace(/,/g, '')) || 0;
  return 0;
};

interface InvoiceData {
  customerId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerAddress?: string;
  customerCity?: string;
  customerState?: string;
  customerZipCode?: string;
  customerGstNumber?: string;
  invoiceNo?: string;
  invoiceDate?: string;
  items?: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  subtotal?: number;
  tax?: number;
  total?: number;
  gstType?: 'CGST/SGST' | 'IGST';
  gstRate?: number;
}

const InvoicePreview = ({ data = {} as InvoiceData, showDownloadButton = true, isPdfExport = false }) => {
  const previewRef = useRef<HTMLDivElement>(null);

  // Extract customer and invoice data
  const customerName = data?.customerName || "Customer Name";
  const customerAddress = data?.customerAddress || "";
  const customerCity = data?.customerCity || "";
  const customerState = data?.customerState || "";
  const customerZipCode = data?.customerZipCode || "";
  const customerEmail = data?.customerEmail || "";
  const customerPhone = data?.customerPhone || "";
  const customerGstNumber = data?.customerGstNumber || "";
  
  const invoiceNo = data?.invoiceNo || `INV-${Date.now()}`;
  const invoiceDate = data?.invoiceDate || new Date().toLocaleDateString('en-IN');
  
  const items = data?.items || [];
  const subtotal = safeNumber(data?.subtotal) || 0;
  const gstType = data?.gstType || 'CGST/SGST';
  const gstRate = safeNumber(data?.gstRate) || 18;
  
  // Calculate tax
  let cgst = 0, sgst = 0, igst = 0;
  if (gstType === 'IGST') {
    igst = +(subtotal * (gstRate / 100)).toFixed(2);
  } else {
    cgst = +(subtotal * (gstRate / 200)).toFixed(2);
    sgst = +(subtotal * (gstRate / 200)).toFixed(2);
  }
  
  const totalTax = cgst + sgst + igst;
  const grandTotal = +(subtotal + totalTax).toFixed(2);
  const amountInWords = amountToWordsWithPaise(grandTotal);

  // PDF Export
  const handleDownloadPDF = async () => {
    try {
      const filename = `Invoice_${invoiceNo}.pdf`;
      
      const { data: pdfData } = await generateStandardizedPDF(
        <InvoicePreview data={{ ...data, invoiceNo }} showDownloadButton={false} isPdfExport={true} />,
        filename
      );
      
      // Create blob and download
      const blob = new Blob([pdfData], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div>
      {showDownloadButton && (
        <button
          onClick={handleDownloadPDF}
          className="mb-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition font-semibold text-sm"
          type="button"
        >
          Download PDF
        </button>
      )}
      <div
        ref={previewRef}
        className="w-[800px] mx-auto bg-white shadow-lg p-4 text-black"
        style={{ 
          fontFamily: 'Arial, Helvetica, sans-serif', 
          color: isPdfExport ? '#000000' : '#000', 
          background: isPdfExport ? '#ffffff' : '#fff', 
          minHeight: '1100px',
          paddingTop: '40px',
          paddingBottom: '60px',
          // Override any modern CSS color functions for PDF export
          ...(isPdfExport && {
            color: '#000000 !important',
            backgroundColor: '#ffffff !important'
          })
        }}
      >
        {/* PDF-specific CSS overrides */}
        {isPdfExport && (
          <style>
            {`
              * {
                color: #000000 !important;
                background-color: transparent !important;
                border-color: #000000 !important;
              }
              .bg-white, .bg-gray-50, .bg-gray-100 {
                background-color: #ffffff !important;
              }
              .text-black, .text-gray-900 {
                color: #000000 !important;
              }
              .text-gray-600 {
                color: #4b5563 !important;
              }
              .border-gray-200, .border-gray-300 {
                border-color: #d1d5db !important;
              }
              .shadow-lg {
                box-shadow: none !important;
              }
            `}
          </style>
        )}
        {/* Header with Logo and Invoice Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '0.5rem', marginTop: '-10px' }}>
          <div style={{ width: '120px' }}>
            <img src="/logo.png" alt="Logo" style={{ width: '100%', height: 'auto' }} />
          </div>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontWeight: 'bold', fontSize: '28px', marginBottom: '0.25rem' }}>TAX INVOICE</div>
            <div style={{ fontSize: '10px', marginBottom: '4px' }}>
              <div style={{ marginBottom: '4px' }}>IRN: {invoiceNo.replace('INV-', 'IRN')}</div>
              <div>Invoice Number: {invoiceNo}</div>
            </div>
          </div>
          <div style={{ width: '120px' }}>
            {/* Empty space for balance */}
          </div>
        </div>

        {/* Order Details Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '0.25rem', fontSize: '12px', border: '1px solid #000', marginTop: '-8px' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid #000' }}>
              <td style={{ padding: '6px', borderRight: '1px solid #000', fontWeight: 'bold', backgroundColor: '#f5f5f5', width: '15%' }}>Order Id</td>
              <td style={{ padding: '6px', borderRight: '1px solid #000', width: '18%' }}>{invoiceNo.replace('INV-', 'ORD')}</td>
              <td style={{ padding: '6px', borderRight: '1px solid #000', fontWeight: 'bold', backgroundColor: '#f5f5f5', width: '15%' }}>Invoice No</td>
              <td style={{ padding: '6px', borderRight: '1px solid #000', width: '18%' }}>{invoiceNo}</td>
              <td style={{ padding: '6px', borderRight: '1px solid #000', fontWeight: 'bold', backgroundColor: '#f5f5f5', width: '15%' }}>Invoice Date</td>
              <td style={{ padding: '6px', borderRight: '1px solid #000', width: '19%' }}>{invoiceDate}</td>
            </tr>
            <tr>
              <td style={{ padding: '6px', borderRight: '1px solid #000', fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Place of Supply</td>
              <td style={{ padding: '6px' }} colSpan={5}>{customerState || 'Maharashtra'}</td>
            </tr>
          </tbody>
        </table>

        {/* Seller and Buyer Details Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '0.25rem', fontSize: '12px', border: '1px solid #000', marginTop: '-6px' }}>
          <tbody>
            {/* Seller Row */}
            <tr style={{ borderBottom: '1px solid #000' }}>
              <td style={{ padding: '6px', borderRight: '1px solid #000', fontWeight: 'bold', backgroundColor: '#f5f5f5', width: '15%', verticalAlign: 'top' }}>
                Sold By / Seller
              </td>
              <td style={{ padding: '6px', borderRight: '1px solid #000', width: '35%', verticalAlign: 'top' }}>
                <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '4px' }}>ADMINZA BUSINESS SOLUTIONS</div>
                <div>Shop 1 & 2, Ground Floor, Business Plaza</div>
                <div>Plot Number 123, Sector 15, CBD Belapur</div>
                <div>Navi Mumbai, Maharashtra - 400614</div>
                <div style={{ marginTop: '8px' }}>
                  <div>GSTIN: 27ADMIN1234A1Z5</div>
                  <div>PAN: ADMIN1234A</div>
                  <div>CIN: U74140MH2023PTC123456</div>
                </div>
              </td>
              <td style={{ padding: '6px', fontWeight: 'bold', backgroundColor: '#f5f5f5', width: '15%', verticalAlign: 'top' }}>
                Invoice To
              </td>
              <td style={{ padding: '6px', width: '35%', verticalAlign: 'top' }}>
                <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '4px' }}>{customerName}</div>
                {customerAddress && <div>{customerAddress}</div>}
                {(customerCity || customerState || customerZipCode) && (
                  <div>{[customerCity, customerState, customerZipCode].filter(Boolean).join(', ')}</div>
                )}
                <div style={{ marginTop: '8px' }}>
                  <div>GSTIN: {customerGstNumber || 'N/A'}</div>
                  <div>Pin code: {customerZipCode || 'N/A'}</div>
                  <div>State: {customerState || 'Maharashtra'}</div>
                  {customerPhone && <div>Phone: {customerPhone}</div>}
                  {customerEmail && <div>Email: {customerEmail}</div>}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Items Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '0.25rem', fontSize: '11px', border: '1px solid #000' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0', borderTop: '2px solid #000', borderBottom: '2px solid #000' }}>
              <th style={{ padding: '6px', textAlign: 'center', borderRight: '1px solid #ddd', width: '5%', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}>Sr. no</div></th>
              <th style={{ padding: '6px', textAlign: 'left', borderRight: '1px solid #ddd', width: '15%', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}>UPC</div></th>
              <th style={{ padding: '6px', textAlign: 'left', borderRight: '1px solid #ddd', width: '25%', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}>Item Description</div></th>
              <th style={{ padding: '6px', textAlign: 'right', borderRight: '1px solid #ddd', width: '8%', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}>MRP</div></th>
              <th style={{ padding: '6px', textAlign: 'right', borderRight: '1px solid #ddd', width: '8%', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}>Discount</div></th>
              <th style={{ padding: '6px', textAlign: 'center', borderRight: '1px solid #ddd', width: '6%', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}>Qty.</div></th>
              <th style={{ padding: '6px', textAlign: 'right', borderRight: '1px solid #ddd', width: '8%', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}>Taxable Value</div></th>
              <th style={{ padding: '6px', textAlign: 'center', borderRight: '1px solid #ddd', width: '6%', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}>CGST (%)</div></th>
              <th style={{ padding: '6px', textAlign: 'right', borderRight: '1px solid #ddd', width: '7%', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}>CGST (INR)</div></th>
              <th style={{ padding: '6px', textAlign: 'center', borderRight: '1px solid #ddd', width: '6%', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}>SGST (%)</div></th>
              <th style={{ padding: '6px', textAlign: 'right', borderRight: '1px solid #ddd', width: '7%', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}>SGST (INR)</div></th>
              <th style={{ padding: '6px', textAlign: 'center', borderRight: '1px solid #ddd', width: '6%', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}>Total</div></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              const itemCgst = gstType === 'IGST' ? 0 : +(item.total * (gstRate / 200)).toFixed(2);
              const itemSgst = gstType === 'IGST' ? 0 : +(item.total * (gstRate / 200)).toFixed(2);
              const itemTotal = +(item.total + itemCgst + itemSgst).toFixed(2);
              
              return (
                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '4px', textAlign: 'center', borderRight: '1px solid #ddd', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}>{index + 1}</div></td>
                  <td style={{ padding: '4px', borderRight: '1px solid #ddd', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}>{Math.floor(Math.random() * 10000000000000)}</div></td>
                  <td style={{ padding: '4px', borderRight: '1px solid #ddd', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}>{item.name} (HSN-{Math.floor(Math.random() * 100000000)}) | {Math.floor(Math.random() * 500) + 100} ml</div></td>
                  <td style={{ padding: '4px', textAlign: 'right', borderRight: '1px solid #ddd', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}>{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div></td>
                  <td style={{ padding: '4px', textAlign: 'right', borderRight: '1px solid #ddd', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}>{((item.price * 0.4)).toFixed(2)}</div></td>
                  <td style={{ padding: '4px', textAlign: 'center', borderRight: '1px solid #ddd', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}>{item.quantity}</div></td>
                  <td style={{ padding: '4px', textAlign: 'right', borderRight: '1px solid #ddd', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}>{item.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div></td>
                  <td style={{ padding: '4px', textAlign: 'center', borderRight: '1px solid #ddd', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}>{gstType === 'IGST' ? '0.00' : (gstRate / 2).toFixed(2)}</div></td>
                  <td style={{ padding: '4px', textAlign: 'right', borderRight: '1px solid #ddd', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}>{itemCgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div></td>
                  <td style={{ padding: '4px', textAlign: 'center', borderRight: '1px solid #ddd', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}>{gstType === 'IGST' ? '0.00' : (gstRate / 2).toFixed(2)}</div></td>
                  <td style={{ padding: '4px', textAlign: 'right', borderRight: '1px solid #ddd', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}>{itemSgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div></td>
                  <td style={{ padding: '4px', textAlign: 'right', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}>{itemTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div></td>
                </tr>
              );
            })}
            {/* Total Row */}
            <tr style={{ backgroundColor: '#f0f0f0', borderTop: '2px solid #000', borderBottom: '2px solid #000' }}>
              <td style={{ padding: '4px', textAlign: 'center', borderRight: '1px solid #ddd', fontWeight: 'bold', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}>Total</div></td>
              <td style={{ padding: '4px', borderRight: '1px solid #ddd', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}></div></td>
              <td style={{ padding: '4px', borderRight: '1px solid #ddd', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}></div></td>
              <td style={{ padding: '4px', textAlign: 'right', borderRight: '1px solid #ddd', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}></div></td>
              <td style={{ padding: '4px', textAlign: 'right', borderRight: '1px solid #ddd', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}></div></td>
              <td style={{ padding: '4px', textAlign: 'center', borderRight: '1px solid #ddd', fontWeight: 'bold', position: 'relative' }}>
                <div style={{ position: 'relative', top: '-8px' }}>{items.reduce((sum, item) => sum + item.quantity, 0)}</div>
              </td>
              <td style={{ padding: '4px', textAlign: 'right', borderRight: '1px solid #ddd', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}></div></td>
              <td style={{ padding: '4px', textAlign: 'center', borderRight: '1px solid #ddd', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}></div></td>
              <td style={{ padding: '4px', textAlign: 'right', borderRight: '1px solid #ddd', fontWeight: 'bold', position: 'relative' }}>
                <div style={{ position: 'relative', top: '-8px' }}>{cgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
              </td>
              <td style={{ padding: '4px', textAlign: 'center', borderRight: '1px solid #ddd', position: 'relative' }}><div style={{ position: 'relative', top: '-8px' }}></div></td>
              <td style={{ padding: '4px', textAlign: 'right', borderRight: '1px solid #ddd', fontWeight: 'bold', position: 'relative' }}>
                <div style={{ position: 'relative', top: '-8px' }}>{sgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
              </td>
              <td style={{ padding: '4px', textAlign: 'right', fontWeight: 'bold', position: 'relative' }}>
                <div style={{ position: 'relative', top: '-8px' }}>{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Amount in Words Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '0.25rem', fontSize: '12px', border: '1px solid #000', marginTop: '-2px' }}>
          <tbody>
            <tr>
              <td style={{ padding: '8px', fontWeight: 'bold', backgroundColor: '#f5f5f5', borderRight: '1px solid #000', width: '20%' }}>
                Amount in Words:
              </td>
              <td style={{ padding: '8px' }}>
                {amountInWords}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Additional Seller Information */}
        <div style={{ marginBottom: '1rem', fontSize: '11px', lineHeight: '1.6', marginTop: '-1px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Company Details</div>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>ADMINZA BUSINESS SOLUTIONS (formerly known as Adminza Private Limited)</div>
          <div>GSTIN: 27ADMIN1234A1Z5</div>
          <div>FSSAI License Number: 10018064001545</div>
          <div>CIN: U74140MH2023PTC123456</div>
          <div>PAN: ADMIN1234A</div>
          <div style={{ marginTop: '8px' }}>
            <strong>Reverse Charge Status:</strong> Whether the tax is payable on reverse charge - No
          </div>
        </div>

        {/* Terms & Conditions */}
        <div style={{ marginBottom: '1rem', fontSize: '11px', lineHeight: '1.6', marginTop: '-1px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Terms & Conditions</div>
          <ol style={{ paddingLeft: '20px', margin: 0 }}>
            <li>If you have any issues or queries in respect of your order, please contact customer chat support through Adminza platform or drop in email at info@adminza.com</li>
            <li>In case you need to get more information about seller's or Adminza's FSSAI status, please visit https://foscos.fssai.gov.in/ and use the FBO search option with FSSAI License / Registration number.</li>
            <li>Please note that we never ask for bank account details such as CVV, account number, UPI Pin, etc. across our support channels. For your safety please do not share these details with anyone over any medium.</li>
          </ol>
        </div>

        {/* Authorised Signatory */}
        <div style={{ marginTop: '60px', marginBottom: '20px', textAlign: 'right' }}>
          <div style={{ textAlign: 'center', display: 'inline-block' }}>
            <div style={{ borderTop: '1px solid #000', width: '200px', marginBottom: '10px', paddingTop: '30px' }}></div>
            <div style={{ fontWeight: 'bold', fontSize: '12px' }}>Authorised Signatory</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function InvoicePage() {
  const searchParams = useSearchParams();
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [currentInventory, setCurrentInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Get customer ID and items from URL params
    const customerId = searchParams.get('customerId');
    const itemsParam = searchParams.get('items');
    
    if (customerId && itemsParam) {
      try {
        const items = JSON.parse(decodeURIComponent(itemsParam));
        
        // Fetch customer details
        console.log('Fetching customer with ID:', customerId);
        fetch(`/api/customers/${customerId}`)
          .then(res => res.json())
          .then(response => {
            console.log('Customer API response:', response);
            // Handle both direct customer object and wrapped response
            const customer = response.data || response;
            console.log('Customer data extracted:', customer);
            const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
            
            const invoice = {
              customerId: customer._id,
              customerName: customer.name,
              customerEmail: customer.email,
              customerPhone: customer.phone,
              customerAddress: customer.address,
              customerCity: customer.city,
              customerState: customer.state,
              customerZipCode: customer.zipCode,
              customerGstNumber: customer.gstNumber,
              invoiceNo: `INV-${Date.now()}`,
              invoiceDate: new Date().toLocaleDateString('en-IN'),
              items: items.map((item: any) => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                total: item.price * item.quantity
              })),
              subtotal,
              gstType: 'CGST/SGST' as const,
              gstRate: 18
            };
            
            setInvoiceData(invoice);
            
            // Fetch current inventory for this customer
            return fetch('/api/eshop-inventory');
          })
          .then(res => res.json())
          .then(inventoryData => {
            console.log('Raw inventory data:', inventoryData);
            // Handle both direct array and wrapped response formats
            const inventoryArray = inventoryData.data || inventoryData;
            const customerInventory = inventoryArray.filter((item: any) => item.customerId === searchParams.get('customerId'));
            console.log('Filtered customer inventory:', customerInventory);
            setCurrentInventory(customerInventory);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching customer:', error);
            setLoading(false);
          });
      } catch (error) {
        console.error('Error parsing items:', error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const handleQuantityChange = (itemIndex: number, newQuantity: number) => {
    if (invoiceData && newQuantity >= 0) {
      const updatedItems = [...invoiceData.items];
      updatedItems[itemIndex].quantity = newQuantity;
      updatedItems[itemIndex].total = updatedItems[itemIndex].price * newQuantity;
      
      const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
      
      setInvoiceData({
        ...invoiceData,
        items: updatedItems,
        subtotal
      });
    }
  };

  const handlePriceChange = (itemIndex: number, newPrice: number) => {
    if (invoiceData && newPrice >= 0) {
      const updatedItems = [...invoiceData.items];
      updatedItems[itemIndex].price = newPrice;
      updatedItems[itemIndex].total = newPrice * updatedItems[itemIndex].quantity;
      
      const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
      
      setInvoiceData({
        ...invoiceData,
        items: updatedItems,
        subtotal
      });
    }
  };

  const handleGenerateInvoice = async () => {
    if (!invoiceData) return;
    
    setSaving(true);
    
    try {
      // Generate and download invoice
      const filename = `Invoice_${invoiceData.invoiceNo}.pdf`;
      
      const { data: pdfData } = await generateStandardizedPDF(
        <InvoicePreview data={invoiceData} showDownloadButton={false} isPdfExport={true} />,
        filename
      );
      
      // Create blob and download
      const blob = new Blob([pdfData], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // Update inventory quantities (deduct billed amounts)
      const updatePromises = invoiceData.items.map(async (invoiceItem) => {
        // Find the corresponding inventory item with better matching
        const inventoryItem = currentInventory.find(inv => 
          inv.productName === invoiceItem.name || 
          inv.productName?.toLowerCase().trim() === invoiceItem.name?.toLowerCase().trim()
        );
        
        console.log('Looking for inventory item:', invoiceItem.name);
        console.log('Available inventory items:', currentInventory.map(inv => inv.productName));
        console.log('Found inventory item:', inventoryItem);
        
        if (inventoryItem) {
          const newInvoicedQuantity = (inventoryItem.invoicedQuantity || 0) + invoiceItem.quantity;
          const remainingQuantity = inventoryItem.quantity - newInvoicedQuantity;
          console.log(`Updating ${inventoryItem.productName}:`);
          console.log(`  Total Stock: ${inventoryItem.quantity}`);
          console.log(`  Previous Invoiced: ${inventoryItem.invoicedQuantity || 0}`);
          console.log(`  New Invoice: ${invoiceItem.quantity}`);
          console.log(`  Total Invoiced: ${newInvoicedQuantity}`);
          console.log(`  Remaining: ${remainingQuantity}`);
          
          // Update the inventory item - increment invoicedQuantity
          const response = await fetch(`/api/eshop-inventory/${inventoryItem._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              quantity: inventoryItem.quantity, // Keep original quantity
              invoicedQuantity: newInvoicedQuantity, // Increment invoiced quantity
              price: inventoryItem.price,
              notes: inventoryItem.notes,
              lastUpdated: new Date().toISOString()
            }),
          });
          
          const result = await response.json();
          console.log('Update result:', result);
          
          if (!result.success) {
            console.error('Failed to update inventory item:', result.error);
          }
        } else {
          console.error(`No inventory item found for: ${invoiceItem.name}`);
        }
      });

      await Promise.all(updatePromises);
      
      // Count successful updates
      const successfulUpdates = invoiceData.items.filter((invoiceItem) => {
        return currentInventory.find(inv => 
          inv.productName === invoiceItem.name || 
          inv.productName?.toLowerCase().trim() === invoiceItem.name?.toLowerCase().trim()
        );
      }).length;
      
      alert(`Invoice generated successfully! Updated ${successfulUpdates} inventory items.`);
      
      // Redirect to My Customers tab
      window.location.href = '/dashboard?tab=customer-management&subtab=my-customers';
      
    } catch (error) {
      console.error('Error generating invoice:', error);
      alert('Error generating invoice. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading invoice...</p>
        </div>
      </div>
    );
  }

  if (!invoiceData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">No Invoice Data</h2>
          <p className="text-gray-600 mb-8">Unable to load invoice. Please try again.</p>
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Edit Items */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Edit Invoice Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoiceData.items.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-medium text-sm mb-2">{item.name}</h4>
                      
                      <div className="space-y-2">
                        <div>
                          <Label className="text-xs">Quantity</Label>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleQuantityChange(index, Math.max(0, item.quantity - 1))}
                              disabled={item.quantity <= 0}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 0)}
                              min="0"
                              className="w-16 text-center text-sm"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleQuantityChange(index, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <Label className="text-xs">Price (₹)</Label>
                          <Input
                            type="number"
                            value={item.price}
                            onChange={(e) => handlePriceChange(index, parseFloat(e.target.value) || 0)}
                            min="0"
                            step="0.01"
                            className="text-sm"
                          />
                        </div>
                        
                        <div className="text-xs text-gray-600">
                          Total: ₹{item.total.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Current Inventory Info */}
                {currentInventory.length > 0 && (
                  <div className="mt-6 pt-4 border-t">
                    <h5 className="font-medium text-sm mb-3">Current Inventory</h5>
                    <div className="space-y-2">
                      {currentInventory.map((item) => (
                        <div key={item._id} className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
                          <div className="font-medium">{item.productName}</div>
                          <div>Available: {item.quantity}</div>
                          <div>Price: ₹{item.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Invoice Preview */}
          <div className="lg:col-span-3">
            <div className="flex justify-end mb-4">
              <Button
                onClick={handleGenerateInvoice}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Generate Invoice
                  </>
                )}
              </Button>
            </div>
            
            <InvoicePreview data={invoiceData} showDownloadButton={false} isPdfExport={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
