export type ApplianceRow = {
  appliance: string
  qty: number
  unitPrice: number
  total: number
  category: string
}

export type PropertyAppliancePricing = {
  id: string
  title: string
  essentials: ApplianceRow[]
  extras: ApplianceRow[]
  essentialsSubtotal: number
  extrasSubtotal: number
  grandTotal: number
}

export const propertyAppliancePricing: PropertyAppliancePricing[] = [
  {
    id: "family",
    title: "4-bedroom family home",
    essentials: [
      { appliance: "Hisense BI60952GUK Built-in Electric Oven and Hob", qty: 1, unitPrice: 469, total: 469, category: "Kitchen & Laundry" },
      { appliance: "Electriq 391 Litre Fridge", qty: 1, unitPrice: 479.97, total: 479.97, category: "Kitchen & Laundry" },
      { appliance: "Bush WMT0712EW Washing Machine", qty: 1, unitPrice: 188, total: 188, category: "Kitchen & Laundry" },
      { appliance: "Hive Thermostat Hubless", qty: 1, unitPrice: 79, total: 79, category: "Heating & Energy" },
      { appliance: "British Gas Smart Meter Monitor", qty: 1, unitPrice: 19.99, total: 19.99, category: "Heating & Energy" },
      { appliance: "B&Q BG White Single USB Socket", qty: 6, unitPrice: 7, total: 42, category: "Electrical" },
      { appliance: "B&Q BG White Double USB Socket", qty: 16, unitPrice: 10, total: 160, category: "Electrical" },
      { appliance: "Yale Security Essentials Kit", qty: 1, unitPrice: 99.99, total: 99.99, category: "Safety & Security" },
      { appliance: "Kidde Single Carbon Monoxide Alarm", qty: 1, unitPrice: 16.5, total: 16.5, category: "Safety & Security" },
      { appliance: "Kidde 10Y29 Smoke Alarm", qty: 1, unitPrice: 15.24, total: 15.24, category: "Safety & Security" },
      { appliance: "Ring Doorbell Video and Chime", qty: 1, unitPrice: 59.99, total: 59.99, category: "Safety & Security" },
      { appliance: "Xpelair C4TSR Extractor Fan", qty: 2, unitPrice: 33.42, total: 66.84, category: "Electrical" },
      { appliance: "Calex B22 Smart Bulbs", qty: 18, unitPrice: 7.99, total: 143.82, category: "Lighting" },
      { appliance: "TAPO C410 2K Security Camera", qty: 4, unitPrice: 39.99, total: 159.96, category: "Safety & Security" },
    ],
    extras: [
      { appliance: 'Samsung U8000F 75" TV', qty: 1, unitPrice: 649, total: 649, category: "Entertainment" },
      { appliance: 'HYE 40" TV', qty: 1, unitPrice: 159, total: 159, category: "Entertainment" },
      { appliance: "Russell Hobbs AHM20768 Microwave", qty: 1, unitPrice: 79, total: 79, category: "Kitchen & Laundry" },
      { appliance: 'Samsung F6000F 32" Smart TV', qty: 2, unitPrice: 179, total: 358, category: "Entertainment" },
      { appliance: "Soundbar Hisense HS214 2.1", qty: 1, unitPrice: 69, total: 69, category: "Entertainment" },
      { appliance: "5th Gen Amazon Echo Dot", qty: 5, unitPrice: 45.99, total: 229.95, category: "Smart Control" },
      { appliance: "De'Longhi EC260.GR Coffee Machine", qty: 1, unitPrice: 127, total: 127, category: "Kitchen & Laundry" },
      { appliance: "Nisbets Caterlite 4-Slot Toaster", qty: 1, unitPrice: 44.38, total: 44.38, category: "Kitchen & Laundry" },
    ],
    essentialsSubtotal: 2000.3,
    extrasSubtotal: 1715.33,
    grandTotal: 3715.63,
  },
  {
    id: "shared",
    title: "14-person sheltered accommodation",
    essentials: [
      { appliance: "Amazon Fire HD 10 Tablet", qty: 16, unitPrice: 149.99, total: 2399.84, category: "Smart Control" },
      { appliance: "Amazon Echo Show 8", qty: 2, unitPrice: 94.99, total: 189.98, category: "Smart Control" },
      { appliance: "Alluvox R30AS Video Intercom", qty: 2, unitPrice: 265.9, total: 531.8, category: "Smart Control" },
      { appliance: "Yale Sync Hub", qty: 4, unitPrice: 199.99, total: 799.96, category: "Smart Control" },
      { appliance: "Genius Hub Heating System", qty: 1, unitPrice: 7836.38, total: 7836.38, category: "Heating & Energy" },
      { appliance: "British Gas Smart Meter", qty: 1, unitPrice: 19.99, total: 19.99, category: "Heating & Energy" },
      { appliance: "Yale Panic Button", qty: 14, unitPrice: 29.99, total: 419.86, category: "Safety & Security" },
      { appliance: "Yale Smart Water Sensor", qty: 14, unitPrice: 40, total: 560, category: "Safety & Security" },
      { appliance: "Yale Mini Door/Window Contact", qty: 16, unitPrice: 34.99, total: 559.84, category: "Safety & Security" },
      { appliance: "Yale Outdoor Door/Window Contact", qty: 5, unitPrice: 19.99, total: 99.95, category: "Safety & Security" },
      { appliance: "Yale Outdoor Contact Sensor", qty: 4, unitPrice: 58.99, total: 235.96, category: "Safety & Security" },
      { appliance: "Yale Outdoor Siren", qty: 2, unitPrice: 89.99, total: 179.98, category: "Safety & Security" },
      { appliance: "Yale Indoor Siren", qty: 8, unitPrice: 49.99, total: 399.92, category: "Safety & Security" },
      { appliance: "Yale Smoke Sensor", qty: 23, unitPrice: 64.99, total: 1494.77, category: "Safety & Security" },
      { appliance: "Yale Outdoor Security Camera", qty: 6, unitPrice: 119.99, total: 719.94, category: "Safety & Security" },
      { appliance: "Automatic Pill Dispenser — TabTime", qty: 14, unitPrice: 34.99, total: 489.86, category: "Health" },
      { appliance: "Kidde Single Carbon Monoxide Alarm", qty: 3, unitPrice: 16.5, total: 49.5, category: "Health" },
      { appliance: "Calex B22 Smart Bulbs", qty: 60, unitPrice: 7.99, total: 479.4, category: "Lighting" },
      { appliance: "Hisense BI60935GXU Double Oven and Hob", qty: 2, unitPrice: 419, total: 838, category: "Kitchen & Laundry" },
      { appliance: "Russell Hobbs RH90AFF201SS", qty: 3, unitPrice: 499, total: 1497, category: "Kitchen & Laundry" },
      { appliance: "Hisense 3S Series 12kg Washing Machine", qty: 4, unitPrice: 359, total: 1436, category: "Kitchen & Laundry" },
      { appliance: "Beko Sky Integrated Dryer", qty: 4, unitPrice: 386, total: 1544, category: "Kitchen & Laundry" },
      { appliance: 'Samsung QLED Smart TV 65"', qty: 1, unitPrice: 799, total: 799, category: "Entertainment" },
      { appliance: "Sony BRAVIA Theatre Bar 8", qty: 1, unitPrice: 799, total: 799, category: "Entertainment" },
      { appliance: "B&Q BG White Single USB Socket", qty: 22, unitPrice: 7, total: 154, category: "Electrical" },
      { appliance: "B&Q BG White Double USB Socket", qty: 35, unitPrice: 10, total: 350, category: "Electrical" },
      { appliance: "AEG DTB3653M", qty: 2, unitPrice: 239, total: 478, category: "Electrical" },
    ],
    extras: [
      { appliance: "Beko EnergySpin Washer/Dryer", qty: 2, unitPrice: 449, total: 898, category: "Kitchen & Laundry" },
    ],
    essentialsSubtotal: 25361.93,
    extrasSubtotal: 898,
    grandTotal: 26259.93,
  },
  {
    id: "starter",
    title: "2-bedroom starter home",
    essentials: [
      { appliance: "Cooke & Lewis CSB60A Electric Oven", qty: 1, unitPrice: 149, total: 149, category: "Kitchen & Laundry" },
      { appliance: "ElectriQ Sealed Electric Plate Hob", qty: 1, unitPrice: 79.97, total: 79.97, category: "Kitchen & Laundry" },
      { appliance: "LOGIK L50BS23 60/40 Fridge Freezer", qty: 1, unitPrice: 199, total: 199, category: "Kitchen & Laundry" },
      { appliance: "Bush WMT0712EW Washing Machine", qty: 1, unitPrice: 209, total: 209, category: "Kitchen & Laundry" },
      { appliance: "Hive Thermostat Mini", qty: 1, unitPrice: 79, total: 79, category: "Heating & Energy" },
      { appliance: "British Gas Smart Meter", qty: 1, unitPrice: 19.99, total: 19.99, category: "Heating & Energy" },
      { appliance: "B&Q BG White Single USB Socket", qty: 6, unitPrice: 10, total: 60, category: "Electrical" },
      { appliance: "B&Q BG White Double USB Socket", qty: 8, unitPrice: 10, total: 80, category: "Electrical" },
      { appliance: "Yale Security Essentials Kit", qty: 1, unitPrice: 99.99, total: 99.99, category: "Safety & Security" },
      { appliance: "Kidde Single Carbon Monoxide Alarm", qty: 1, unitPrice: 16.5, total: 16.5, category: "Safety & Security" },
      { appliance: "Kidde 10Y29 Optical Smoke Alarm", qty: 1, unitPrice: 15.24, total: 15.24, category: "Safety & Security" },
      { appliance: "Ring Doorbell Video and Chime", qty: 1, unitPrice: 59.99, total: 59.99, category: "Safety & Security" },
      { appliance: "XPELAIR C4TSR Extractor Fan", qty: 1, unitPrice: 33.42, total: 33.42, category: "Electrical" },
      { appliance: "TAPO C410 2K Security Camera", qty: 4, unitPrice: 39.99, total: 159.96, category: "Safety & Security" },
    ],
    extras: [
      { appliance: 'Hisense A6Q 50" TV', qty: 1, unitPrice: 239, total: 239, category: "Entertainment" },
      { appliance: "Cookology 20L Freestanding Microwave", qty: 1, unitPrice: 49.99, total: 49.99, category: "Kitchen & Laundry" },
      { appliance: 'Samsung F6000F 32" Smart TV', qty: 1, unitPrice: 179, total: 179, category: "Entertainment" },
      { appliance: "Soundbar Bush SR210-12.3.0", qty: 1, unitPrice: 29.99, total: 29.99, category: "Entertainment" },
      { appliance: "5th Gen Amazon Echo Dot", qty: 1, unitPrice: 45.99, total: 45.99, category: "Smart Control" },
    ],
    essentialsSubtotal: 1261.06,
    extrasSubtotal: 543.97,
    grandTotal: 1805.03,
  },
]
