export interface ProductItem {
  model: string;
  price: number;
}

export interface FinancingProvider {
  name: string;
  interestRate: number;
  adminFeeType: 'percentage' | 'fixed';
  adminFeeValue: number;
}

// Data Akurat dari Sheet 'Range Bunga - Admin'
export const FINANCING_PROVIDERS: FinancingProvider[] = [
  {
    name: "Avanto By Yessscredit",
    interestRate: 0.0375, 
    adminFeeType: 'fixed',
    adminFeeValue: 60000
  },
  {
    name: "Avanto by Kredivo",
    interestRate: 0.0375,
    adminFeeType: 'percentage',
    adminFeeValue: 0.02
  }
];

// Seluruh 62 Produk Lengkap dari Sheet 'Pricelist HP'
export const HP_PRODUCTS: ProductItem[] = [
  { model: "Pilih Produk HP OPPO", price: 0 },
  { model: "OPPO A3X 4+64", price: 1399000 },
  { model: "OPPO A5i 4+64", price: 1399000 },
  { model: "OPPO A5i 4+128", price: 1699000 },
  { model: "OPPO A3X 4+128", price: 1799000 },
  { model: "OPPO A5x 4+128", price: 1899000 },
  { model: "OPPO A3X 6+128", price: 1999000 },
  { model: "OPPO A5x 6+128", price: 2199000 },
  { model: "OPPO A6t 4+64", price: 2249000 },
  { model: "OPPO A6x 4+64", price: 2299000 },
  { model: "OPPO A60 8+128", price: 2299000 },
  { model: "OPPO A6c 4+64", price: 2499000 },
  { model: "OPPO A5 8+128", price: 2499000 },
  { model: "OPPO A60 8+256", price: 2699000 },
  { model: "OPPO A6t 4+128", price: 2799000 },
  { model: "OPPO A5 Pro 8+128", price: 2799000 },
  { model: "OPPO A6x 4+128", price: 2899000 },
  { model: "OPPO A5 8+256", price: 2899000 },
  { model: "OPPO A6c 4+128", price: 2999000 },
  { model: "OPPO A5 Pro 8+256", price: 2999000 },
  { model: "OPPO Reno12 F 8+256", price: 3099000 },
  { model: "OPPO A6t 6+128", price: 3399000 },
  { model: "OPPO A6x 6+128", price: 3599000 },
  { model: "OPPO A6x 6+256", price: 3999000 },
  { model: "OPPO A6t Pro 8+128", price: 4099000 },
  { model: "OPPO A5 Pro 5G 8+256", price: 4099000 },
  { model: "OPPO Reno12 F 5G 12+256", price: 4099000 },
  { model: "OPPO A6 6+128", price: 4299000 },
  { model: "OPPO Reno13 F 4G 8+256", price: 4499000 },
  { model: "OPPO A6 6+256", price: 4599000 },
  { model: "OPPO A6 Pro 8+128", price: 4599000 },
  { model: "OPPO Reno12 F 5G 12+512", price: 4899000 },
  { model: "OPPO A6 Pro 8+256", price: 4999000 },
  { model: "OPPO A6 Pro 5G 8+256", price: 5299000 },
  { model: "OPPO A6t Pro 5G 8+256", price: 5299000 },
  { model: "OPPO Reno12 5G 12+256", price: 5499000 },
  { model: "OPPO Reno14 F 8+256", price: 5599000 },
  { model: "OPPO Reno13 F 5G 8+256", price: 5799000 },
  { model: "OPPO Reno13 F 5G 12+256", price: 5999000 },
  { model: "OPPO Reno14 F 12+256", price: 5999000 },
  { model: "OPPO Reno15 F 5G 8+128", price: 6599000 },
  { model: "OPPO Reno14 F 12+512", price: 6999000 },
  { model: "OPPO Reno15 F 5G 8+256", price: 7199000 },
  { model: "OPPO Reno14 5G 8+256", price: 7499000 },
  { model: "OPPO Reno15 F 5G 12+256", price: 7899000 },
  { model: "OPPO Reno14 5G 12+256", price: 7999000 },
  { model: "OPPO Reno12 Pro 12+512", price: 8999000 },
  { model: "OPPO Reno13 5G 12+256", price: 8999000 },
  { model: "OPPO Reno15 5G 8+256", price: 9299000 },
  { model: "OPPO Reno15 5G 12+256", price: 9999000 },
  { model: "OPPO Reno 14 Pro", price: 10999000 },
  { model: "OPPO Find X8 12+256", price: 13999000 },
  { model: "OPPO Reno15 Pro Max 5G 12+512", price: 14499000 },
  { model: "OPPO Find X8 16+512", price: 15999000 },
  { model: "OPPO Find X9 12+256", price: 15999000 },
  { model: "OPPO Find X9s 12+256", price: 15999000 },
  { model: "OPPO Find X9 16+512", price: 17999000 },
  { model: "OPPO Find X9s 12+512", price: 17999000 },
  { model: "OPPO Find X9 Pro 16+512", price: 20999000 },
  { model: "OPPO Find X9 Ultra 12+512", price: 27999000 },
  { model: "OPPO Find N5", price: 27999000 },
  { model: "OPPO Find X9 Ultra 16+1TB", price: 31999000 },
];

// Seluruh 52 Produk Lengkap dari Sheet 'Pricelist IOT'
export const IOT_PRODUCTS: ProductItem[] = [
  { model: "Pilih Model IOT", price: 0 },
  { model: "Non Bundling", price: 0 },
  { model: "OPPO Stylus Smart Life Passive Capacitive Pen White", price: 79000 },
  { model: "OPPO USB Type-C White", price: 109000 },
  { model: "OPPO Reno14 Pro Magnetic Case Gradient Blue", price: 149000 },
  { model: "OPPO Reno14 Magnetic Case Gradient Blue", price: 149000 },
  { model: "OPPO Reno14 F Magnetic Case Gradient Blue", price: 149000 },
  { model: "OPPO Tablet Case Adapted for Pad SE Blue", price: 149000 },
  { model: "OPPO VOOC Cable USB-A to USB-C White", price: 199000 },
  { model: "OPPO Pad SE Case White", price: 229000 },
  { model: "OPPO Crossbody Lanyard Built-In Type-c to Type-c 8A Blue", price: 229000 },
  { model: "OPPO TechLife Watch X2 Mini Strap Fluoro Rubber Pink", price: 249000 },
  { model: "OPPO Magnetic Cable USB-A to Type-C", price: 249000 },
  { model: "OPPO Enco Buds3 Snow White", price: 299000 },
  { model: "OPPO TechLife Watch X2 Mini Strap Brown", price: 299000 },
  { model: "OPPO TechliLife Watch Strap Just Brown", price: 299000 },
  { model: "OPPO Magnetic Ring Power Bank 22.5W Blue", price: 399000 },
  { model: "OPPO Enco Buds2 Moonlight", price: 399000 },
  { model: "OPPO Enco Buds2 Midnight", price: 399000 },
  { model: "OPPO Smart Cover Pad Air Grey", price: 399000 },
  { model: "OPPO Pad Neo Case Grey", price: 399000 },
  { model: "OPPO Magnetic Power Bank Air 5000mAh Blue", price: 449000 },
  { model: "OPPO Enco Buds3 Pro White", price: 449000 },
  { model: "SUPERVOOC 80W Car Charger CCB7JACH Black ID", price: 499000 },
  { model: "OPPO SUPERVOOC 80W Dual Ports Power Adapter White", price: 499000 },
  { model: "OPPO Pad 3 Smart Case Grey", price: 499000 },
  { model: "OPPO Pad 2 Smart Case Grey", price: 599000 },
  { model: "OPPO SUPERVOOC 65W Power Adapter White", price: 599000 },
  { model: "OPPO Reno14 F Phone Case and Card Holder Batik Alleira", price: 799000 },
  { model: "OPPO Enco Air3 Glaze White", price: 799000 },
  { model: "OPPO Enco Air3 Misty Purple", price: 799000 },
  { model: "OPPO Slim Magnetic Power Bank Silver", price: 799000 },
  { model: "OPPO Enco Air4 White", price: 799000 },
  { model: "OPPO Pen", price: 799000 },
  { model: "OPPO Pencil 2 Black", price: 999000 },
  { model: "OPPO AIRVOOC 50W Magnetic Charger Gray", price: 999000 },
  { model: "OPPO Supervooc 150W Power Bank Light Blue", price: 1299000 },
  { model: "AIRVOOC 45W Wireless Charger Just White", price: 1299000 },
  { model: "OPPO Pad 3 Smart Keyboard Grey", price: 1499000 },
  { model: "OPPO Pad 2 Smart Touchpad Keyboard Grey", price: 1699000 },
  { model: "OPPO Enco X3i Electric Blue", price: 1799000 },
  { model: "OPPO Pad SE Silver", price: 2999000 },
  { model: "OPPO Pad Air Grey 4+64G", price: 2999000 },
  { model: "OPPO Pad Air Purple 4+128G", price: 3699000 },
  { model: "OPPO Watch X2 Mini Glimmer Gold", price: 4499000 },
  { model: "OPPO Pad Neo Grey 6+128G", price: 4599000 },
  { model: "OPPO Watch X2 Summit Blue", price: 4999000 },
  { model: "OPPO Watch X Mars Brown", price: 4999000 },
  { model: "OPPO Watch X Platinum Black", price: 5999000 },
  { model: "OPPO Pad 2 Grey 8+256G", price: 6999000 },
  { model: "OPPO Pad 3 Silver 8+256G", price: 8999000 },
];

// Seluruh Produk Lengkap dari Sheet 'Pricelist OPPOCARE'
export const OPPO_CARE_PRODUCTS: ProductItem[] = [
  { model: "Pilih Model OPPO CARE", price: 0 },
  { model: "Non Bundling", price: 0 },
  { model: "OPPO CARE A SERIES", price: 299000 },
  { model: "OPPO CARE RENO SERIES", price: 799000 },
  { model: "OPPO CARE FIND X SERIES", price: 1499000 },
  { model: "OPPO CARE FIND N SERIES", price: 2599000 },
];

export const TENOR_OPTIONS = [3, 6, 9, 12];