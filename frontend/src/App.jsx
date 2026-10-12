import { useEffect, useMemo, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const greenBranding = {
  sage: '#9eb77f',
  olive: '#7a8d59',
  mint: '#8ec7a0',
  emerald: '#3e7a52',
  army: '#5f6b46',
  cream: '#f4efe8',
}

const defaultCategories = [
  { id: 1, name: 'Dress Kasual', slug: 'dress-kasual', description: 'Dress hijau santai untuk aktivitas harian.' },
  { id: 2, name: 'Dress Pesta', slug: 'dress-pesta', description: 'Dress hijau elegan untuk momen spesial.' },
  { id: 3, name: 'Dress Kerja', slug: 'dress-kerja', description: 'Dress hijau profesional untuk tampilan rapi.' },
  { id: 4, name: 'Midi Dress', slug: 'midi-dress', description: 'Midi dress dengan siluet yang modern.' },
  { id: 5, name: 'Maxi Dress', slug: 'maxi-dress', description: 'Maxi dress anggun dengan flowy silhouette.' },
]

const defaultDressCatalog = [
  { id: 1, category_id: 1, name: 'Sage Casual Dress', price: 299000, stock: 12, shade_hijau: 'sage', description: 'Dress kasual hijau sage simpel, nyaman, dan cocok untuk hari santai.', image: 'https://i.pinimg.com/736x/20/ac/9c/20ac9c3a2258393c30178f93ccc2d310.jpg' },
  { id: 2, category_id: 1, name: 'Mint Daily Dress', price: 279000, stock: 14, shade_hijau: 'mint', description: 'Dress ringan dengan warna mint segar untuk gaya setiap hari.', image: 'https://i.pinimg.com/736x/ef/ad/a9/efada93c7e36417e995a838701e9dc91.jpg' },
  { id: 3, category_id: 2, name: 'Emerald Satin Dress', price: 520000, stock: 8, shade_hijau: 'emerald', description: 'Dress pesta emerald dengan bahan satin yang berkilau.', image: 'https://i.pinimg.com/1200x/55/57/74/555774fb0ee8c331f9623bd9c4cf8118.jpg' },
  { id: 4, category_id: 2, name: 'Olive Evening Dress', price: 560000, stock: 7, shade_hijau: 'olive', description: 'Dress malam olive dengan potongan elegan dan anggun.', image: 'https://i.pinimg.com/736x/27/f2/05/27f20514cee147ab0dee18a46a588478.jpg' },
  { id: 5, category_id: 3, name: 'Army Green Work Dress', price: 430000, stock: 10, shade_hijau: 'army', description: 'Dress kerja army green yang terlihat profesional namun tetap stylish.', image: 'https://i.pinimg.com/736x/0b/5c/90/0b5c90cc58337477e41a5dd4a3af6d14.jpg' },
  { id: 6, category_id: 3, name: 'Sage Office Dress', price: 410000, stock: 11, shade_hijau: 'sage', description: 'Dress kantor sage dengan detail halus untuk tampilan rapi.', image: 'https://i.pinimg.com/1200x/2e/d7/73/2ed773f8ae520385d7ce8ae6f2263cae.jpg' },
  { id: 7, category_id: 4, name: 'Olive Midi Dress', price: 390000, stock: 9, shade_hijau: 'olive', description: 'Midi dress olive dengan siluet modern dan nyaman dipakai.', image: 'https://i.pinimg.com/1200x/ec/9c/33/ec9c3342fc246aa7245c1e05a072390b.jpg' },
  { id: 8, category_id: 5, name: 'Mint Maxi Dress', price: 470000, stock: 6, shade_hijau: 'mint', description: 'Maxi dress mint dengan drape yang flowy dan elegan.', image: 'https://i.pinimg.com/736x/b9/e0/a9/b9e0a9022d76eee1e20244a79220c6b0.jpg' },
]

const makeGreenPlaceholder = (label, color = '#9eb77f') => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
      <defs>
        <linearGradient id="dressBg" x1="0" x2="1">
          <stop offset="0%" stop-color="${color}"/>
          <stop offset="100%" stop-color="#f4efe8"/>
        </linearGradient>
      </defs>
      <rect width="800" height="1000" fill="url(#dressBg)"/>
      <rect x="260" y="120" width="280" height="70" rx="35" fill="rgba(255,255,255,0.18)"/>
      <path d="M315 180 L385 120 L415 120 L485 180 L530 330 L500 860 C495 920 450 950 400 950 C350 950 305 920 300 860 L270 330 Z" fill="rgba(18,62,40,0.38)"/>
      <path d="M360 135 L400 100 L440 135 L470 210 L465 260 L400 250 L335 260 L330 210 Z" fill="rgba(255,255,255,0.14)"/>
      <path d="M350 185 L318 300 L300 350 L340 350 L370 220 Z" fill="rgba(255,255,255,0.10)"/>
      <path d="M450 185 L482 300 L500 350 L460 350 L430 220 Z" fill="rgba(255,255,255,0.10)"/>
      <path d="M334 340 C366 392, 432 392, 466 340" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="14" stroke-linecap="round"/>
      <path d="M330 470 C366 540, 432 540, 470 470" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="12" stroke-linecap="round"/>
      <text x="400" y="860" text-anchor="middle" font-size="42" font-family="Arial, sans-serif" font-weight="700" fill="#173b2a">${label}</text>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

const makeDressPlaceholder = (label, color = '#9eb77f') => makeGreenPlaceholder(label, color)

const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)

const buildWhatsAppMessage = (order, customerName) => {
  const items = order?.order?.items || []
  const list = items
    .map((item) => `${item.product.name} x${item.quantity}`)
    .join(', ')

  return `Halo GreenStyle, saya ${customerName} ingin konfirmasi pesanan.\nOrder: ${order?.order?.order_code || '-'}\nItem: ${list}\nTotal: ${formatRupiah(order?.order?.total || 0)}\nAlamat: ${order?.order?.shipping_address || '-'}\nMohon diproses.`
}

const toProductImage = (product) => {
  if (product?.image) {
    return product.image
  }

  const tone = greenBranding[product?.shade_hijau] || '#9eb77f'

  return makeGreenPlaceholder(product?.name || 'GreenStyle', tone)
}

function App() {
  const [page, setPage] = useState('home')
  const [products, setProducts] = useState(defaultDressCatalog)
  const [categories, setCategories] = useState(defaultCategories)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('green-cart') || '[]'))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [authMode, setAuthMode] = useState('login')
  const [buyerForm, setBuyerForm] = useState({
    name: '',
    email: 'buyer@greenstyle.com',
    password: 'buyer123',
    password_confirmation: 'buyer123',
    phone: '081234567890',
    address: 'Bandung',
  })
  const [loginForm, setLoginForm] = useState({
    email: 'buyer@greenstyle.com',
    password: 'buyer123',
  })
  const [buyerToken, setBuyerToken] = useState(localStorage.getItem('green-buyer-token') || '')
  const [buyerUser, setBuyerUser] = useState(() => JSON.parse(localStorage.getItem('green-buyer-user') || 'null'))
  const [shippingAddress, setShippingAddress] = useState('')
  const [checkoutMessage, setCheckoutMessage] = useState('')
  const [adminToken, setAdminToken] = useState(localStorage.getItem('green-admin-token') || '')
  const [adminUser, setAdminUser] = useState(() => JSON.parse(localStorage.getItem('green-admin-user') || 'null'))
  const [adminLoginForm, setAdminLoginForm] = useState({
    email: 'admin@greenstyle.com',
    password: 'admin123',
  })
  const [adminData, setAdminData] = useState({ summary: null, products: [], orders: [] })
  const [adminProductForm, setAdminProductForm] = useState({
    category_id: '',
    name: '',
    description: '',
    price: 0,
    stock: 0,
    shade_hijau: 'sage',
    image: '',
  })

  useEffect(() => {
    localStorage.setItem('green-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    if (buyerToken) {
      localStorage.setItem('green-buyer-token', buyerToken)
    } else {
      localStorage.removeItem('green-buyer-token')
    }
  }, [buyerToken])

  useEffect(() => {
    if (buyerUser) {
      localStorage.setItem('green-buyer-user', JSON.stringify(buyerUser))
    } else {
      localStorage.removeItem('green-buyer-user')
    }
  }, [buyerUser])

  useEffect(() => {
    if (adminToken) {
      localStorage.setItem('green-admin-token', adminToken)
    } else {
      localStorage.removeItem('green-admin-token')
    }
  }, [adminToken])

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem('green-admin-user', JSON.stringify(adminUser))
    } else {
      localStorage.removeItem('green-admin-user')
    }
  }, [adminUser])

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true)
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch(`${API_URL}/products`),
          fetch(`${API_URL}/categories`),
        ])

        if (!productsResponse.ok || !categoriesResponse.ok) {
          throw new Error('Gagal menghubungi API GreenStyle.')
        }

        const productsData = await productsResponse.json()
        const categoriesData = await categoriesResponse.json()

        setProducts(productsData.length ? productsData : defaultDressCatalog)
        setCategories(categoriesData.length ? categoriesData : defaultCategories)
      } catch (err) {
        setProducts(defaultDressCatalog)
        setCategories(defaultCategories)
        setError(err.message || 'Terjadi kesalahan saat mengambil data.')
      } finally {
        setLoading(false)
      }
    }

    fetchInitialData()
  }, [])

  useEffect(() => {
    if (!adminToken) {
      return
    }

    const loadAdminData = async () => {
      try {
        const [summaryRes, productsRes, ordersRes] = await Promise.all([
          fetch(`${API_URL}/admin/summary`, {
            headers: { Authorization: `Bearer ${adminToken}` },
          }),
          fetch(`${API_URL}/admin/products`, {
            headers: { Authorization: `Bearer ${adminToken}` },
          }),
          fetch(`${API_URL}/admin/orders`, {
            headers: { Authorization: `Bearer ${adminToken}` },
          }),
        ])

        if (summaryRes.ok && productsRes.ok && ordersRes.ok) {
          setAdminData({
            summary: await summaryRes.json(),
            products: await productsRes.json(),
            orders: await ordersRes.json(),
          })
        }
      } catch (error) {
        console.error('Admin data fetch failed', error)
      }
    }

    loadAdminData()
  }, [adminToken])

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return products
    }

    return products.filter((product) => String(product.category_id) === String(selectedCategory))
  }, [products, selectedCategory])

  const cartItems = useMemo(
    () =>
      cart.map((item) => ({
        ...item,
        subtotal: item.quantity * item.product.price,
      })),
    [cart]
  )

  const cartTotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0)

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id)

      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item,
        )
      }

      return [...current, { product, quantity: 1 }]
    })
    setPage('cart')
  }

  const updateCartQty = (productId, delta) => {
    setCart((current) =>
      current
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const handleBuyerAuth = async (event) => {
    event.preventDefault()

    const endpoint = authMode === 'register' ? `${API_URL}/register` : `${API_URL}/login`
    const payload = authMode === 'register'
      ? {
          name: buyerForm.name,
          email: buyerForm.email,
          password: buyerForm.password,
          password_confirmation: buyerForm.password_confirmation,
          phone: buyerForm.phone,
          address: buyerForm.address,
        }
      : {
          email: loginForm.email,
          password: loginForm.password,
        }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.errors?.email?.[0] || 'Autentikasi gagal.')
      }

      setBuyerToken(data.token)
      setBuyerUser(data.user)
      setPage('cart')
      setCheckoutMessage('')
    } catch (err) {
      setCheckoutMessage(err.message)
    }
  }

  const handleBuyerLogout = () => {
    setBuyerToken('')
    setBuyerUser(null)
    setCheckoutMessage('Berhasil logout.')
  }

  const handleCheckout = async () => {
    if (!buyerToken) {
      setPage('account')
      setCheckoutMessage('Silakan masuk sebagai pembeli terlebih dahulu.')
      return
    }

    if (!shippingAddress.trim()) {
      setCheckoutMessage('Alamat pengiriman wajib diisi.')
      return
    }

    try {
      const response = await fetch(`${API_URL}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${buyerToken}`,
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            product_id: item.product.id,
            quantity: item.quantity,
          })),
          shipping_address: shippingAddress,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Checkout gagal.')
      }

      const whatsappMessage = buildWhatsAppMessage(data, buyerUser?.name || 'Pembeli')
      const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(whatsappMessage)}`
      setCart([])
      setCheckoutMessage('Pesanan berhasil dibuat. Klik tombol WhatsApp untuk lanjut checkout.')
      window.open(whatsappUrl, '_blank')
      setPage('products')
    } catch (err) {
      setCheckoutMessage(err.message)
    }
  }

  const handleAdminLogin = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminLoginForm),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login admin gagal.')
      }

      setAdminToken(data.token)
      setAdminUser(data.user)
      setPage('admin')
      setCheckoutMessage('')
    } catch (err) {
      setCheckoutMessage(err.message)
    }
  }

  const handleAdminLogout = () => {
    setAdminToken('')
    setAdminUser(null)
    setAdminData({ summary: null, products: [], orders: [] })
    setPage('home')
  }

  const handleCreateProduct = async (event) => {
    event.preventDefault()

    try {
      const payload = {
        ...adminProductForm,
        price: Number(adminProductForm.price),
        stock: Number(adminProductForm.stock),
        image: adminProductForm.image || makeDressPlaceholder(adminProductForm.name || 'GreenStyle', greenBranding[adminProductForm.shade_hijau] || '#9eb77f'),
      }

      const response = await fetch(`${API_URL}/admin/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Gagal membuat produk.')
      }

      setAdminData((current) => ({
        ...current,
        products: [data, ...current.products],
      }))
      setAdminProductForm({
        category_id: '',
        name: '',
        description: '',
        price: 0,
        stock: 0,
        shade_hijau: 'sage',
        image: '',
      })
      setCheckoutMessage('Produk baru berhasil ditambahkan.')
    } catch (err) {
      setCheckoutMessage(err.message)
    }
  }

  const handleOrderStatus = async (orderId, status) => {
    try {
      const response = await fetch(`${API_URL}/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error('Gagal update status.')
      }

      const updatedOrder = await response.json()
      setAdminData((current) => ({
        ...current,
        orders: current.orders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order)),
      }))
    } catch (err) {
      setCheckoutMessage(err.message)
    }
  }

  const featuredProducts = products.slice(0, 3)

  return (
    <div className="min-h-screen bg-[#f7f3ea] text-[#1c2a1f]">
      <header className="sticky top-0 z-50 border-b border-[#d9dfd1] bg-[#f7f3ea]/85 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button onClick={() => setPage('home')} className="flex items-center gap-3 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#435b3d] text-lg font-bold text-[#f3f0e8]">
              G
            </div>
            <div>
              <div className="text-xl font-bold tracking-[0.18em] text-[#2d4f35]">GREENSTYLE</div>
            </div>
          </button>

          <div className="hidden items-center gap-8 text-sm font-medium text-[#3a4b3a] md:flex">
            <button onClick={() => setPage('home')} className="hover:text-[#1d4d2d]">Home</button>
            <button onClick={() => setPage('products')} className="hover:text-[#1d4d2d]">Collection</button>
            <button onClick={() => setPage('cart')} className="hover:text-[#1d4d2d]">Cart</button>
            <button onClick={() => setPage('account')} className="hover:text-[#1d4d2d]">Account</button>
            <button onClick={() => setPage('admin')} className="hover:text-[#1d4d2d]">Admin</button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPage('cart')}
              className="rounded-full border border-[#bfd0bb] bg-white px-4 py-2 text-sm font-semibold text-[#234a32]"
            >
              Keranjang ({cart.length})
            </button>
            <button
              onClick={() => setPage('products')}
              className="rounded-full bg-[#2c5d3d] px-5 py-2.5 text-sm font-semibold text-[#f7f3ea] shadow-sm hover:bg-[#224a31]"
            >
              Shop now
            </button>
          </div>
        </nav>
      </header>

      {page === 'home' && (
        <main>
          <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <span className="inline-flex rounded-full border border-[#cad7c0] bg-[#edf5e6] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#355437]">
                  Green dress boutique
                </span>

                <h1 className="mt-6 text-5xl font-black leading-none tracking-[-0.06em] text-[#1f2a22] md:text-6xl">
                  Dress hijau untuk mood yang lebih tenang.
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-8 text-[#40533f]">
                  Koleksi dress wanita dengan nuansa hijau sage, olive, mint, emerald, dan army green — nyaman untuk sehari-hari, acara formal, hingga momen istimewa.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setPage('products')}
                    className="rounded-full bg-[#2d5b3d] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#98af99]/30 hover:bg-[#224a31]"
                  >
                    Explore collection
                  </button>
                  <button
                    onClick={() => setPage('products')}
                    className="rounded-full border border-[#cad7c0] bg-[#f7f3ea] px-6 py-3 text-sm font-semibold text-[#2d4f35] hover:bg-[#edf5e6]"
                  >
                    View lookbook
                  </button>
                </div>

                <div className="mt-10 flex flex-wrap gap-8 text-sm text-[#4a5d47]">
                  <div>
                    <div className="text-3xl font-black text-[#2d4f35]">12K+</div>
                    <div>happy shoppers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-[#2d4f35]">4.9/5</div>
                    <div>customer rating</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-[#2d4f35]">100%</div>
                    <div>earthy palette</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-6 top-10 h-36 w-36 rounded-full bg-[#dfe9d7] blur-3xl" />
                <div className="absolute -right-4 bottom-8 h-40 w-40 rounded-full bg-[#e7d5b5] blur-3xl" />

                <div className="relative overflow-hidden rounded-[32px] border border-[#dfe7d3] bg-[#edf4ea] p-4 shadow-[0_30px_80px_rgba(68,96,70,0.12)]">
                  <img
                    className="h-[620px] w-full rounded-[28px] object-cover"
                    src="https://i.pinimg.com/1200x/55/57/74/555774fb0ee8c331f9623bd9c4cf8118.jpg"
                    alt="GreenStyle dress collection"
                  />
                  <div className="absolute bottom-8 left-8 rounded-2xl border border-white/50 bg-[#f6f1e9]/80 px-4 py-3 backdrop-blur-sm">
                    <div className="text-xs uppercase tracking-[0.2em] text-[#4c694d]">New drop</div>
                    <div className="mt-1 text-2xl font-black text-[#233b29]">Forest Bloom</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 pb-10">
            <div className="grid gap-5 md:grid-cols-3">
              {[
                { title: 'Natural palette', text: 'Akses warna sage, olive, dan cream yang tenang namun tetap berani.' },
                { title: 'Everyday premium', text: 'Bahan nyaman untuk aktivitas harian tanpa kehilangan sisi aesthetic.' },
                { title: 'Thoughtful detail', text: 'Desain minimal modern dengan sentuhan organik yang terasa premium.' },
              ].map((item) => (
                <div key={item.title} className="rounded-[26px] border border-[#dfe7d5] bg-white/70 p-6 shadow-sm">
                  <div className="mb-4 h-12 w-12 rounded-2xl bg-[#eaf0df] text-2xl text-[#365b3d]">✦</div>
                  <h3 className="text-xl font-bold text-[#22362a]">{item.title}</h3>
                  <p className="mt-3 text-[#4a5d47]">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 py-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#4d6a50]">Collection</p>
                <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-[#1e2d23]">Built in green tones</h2>
              </div>
              <button
                onClick={() => setPage('products')}
                className="hidden rounded-full border border-[#cfddc7] bg-white px-5 py-2.5 text-sm font-semibold text-[#254a2f] md:inline-flex"
              >
                See all pieces
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {['Dress Kasual', 'Dress Pesta', 'Dress Kerja', 'Midi Dress', 'Maxi Dress'].map((category) => (
                <span key={category} className="rounded-full bg-[#dfe9d7] px-4 py-2 text-sm font-medium text-[#274b2d]">
                  {category}
                </span>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 py-8">
            <div className="grid gap-6 md:grid-cols-3">
              {featuredProducts.map((product) => (
                <article key={product.id} className="overflow-hidden rounded-[28px] border border-[#dfe7d4] bg-white shadow-sm hover:-translate-y-1 hover:shadow-xl">
                  <img src={toProductImage(product)} alt={product.name} className="h-80 w-full object-cover" />
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-[#ebf2e5] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#33533a]">
                        {product.shade_hijau || 'sage'}
                      </span>
                      <span className="text-sm text-[#587258]">{product.category?.name || 'Collection'}</span>
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-[#1d2e22]">{product.name}</h3>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-2xl font-black text-[#264f35]">{formatRupiah(product.price)}</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="rounded-full bg-[#2a563b] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1d422d]"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 py-16">
            <div className="grid items-center gap-8 rounded-[32px] border border-[#d7e3d0] bg-[#edf4ea] p-8 md:grid-cols-[0.9fr_1.1fr] md:p-10">
              <img
                className="h-[420px] w-full rounded-[28px] object-cover"
                src="https://i.pinimg.com/736x/27/f2/05/27f20514cee147ab0dee18a46a588478.jpg"
                alt="Green style portrait"
              />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#4a6b4e]">Our philosophy</p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#1b2d1f]">Not just clothes, a feeling.</h2>
                <p className="mt-5 text-lg leading-8 text-[#435542]">
                  GreenStyle hadir untuk menghadirkan gaya yang memberi rasa tenang, rapi, dan penuh kepercayaan diri.
                  Setiap potongan dibuat untuk berpadu dengan rutinitas modern: ringan, serbaguna, dan terinspirasi dari alam.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[#f7f3ea] p-4">
                    <div className="text-2xl font-black text-[#284c34]">01</div>
                    <div className="mt-1 font-medium text-[#2d402f]">Sage elegance</div>
                  </div>
                  <div className="rounded-2xl bg-[#f7f3ea] p-4">
                    <div className="text-2xl font-black text-[#284c34]">02</div>
                    <div className="mt-1 font-medium text-[#2d402f]">Olive utility</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 pb-20 pt-8">
            <div className="rounded-[30px] border border-[#dfe7d5] bg-[#f5f1e7] p-8 text-center shadow-sm md:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#5a735d]">Style journal</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#1e2d23]">Make every outfit feel grounded.</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-[#485d49]">
                Temukan kombinasi terbaik untuk hari kerja, weekend, hingga momen santai dengan sentuhan warna hijau yang hangat dan elegan.
              </p>

              <button
                onClick={() => setPage('products')}
                className="mt-8 rounded-full bg-[#2d5b3d] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#224a31]"
              >
                Discover the moodboard
              </button>
            </div>
          </section>
        </main>
      )}

      {page === 'products' && (
        <main className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#4d6a50]">Collection</p>
              <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-[#1e2d23]">Everyday green essentials</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`rounded-full px-4 py-2 text-sm font-medium ${selectedCategory === 'all' ? 'bg-[#2d5b3d] text-white' : 'bg-white text-[#234a32] border border-[#d9dfd1]'}`}
              >
                Semua
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium ${selectedCategory === category.id ? 'bg-[#2d5b3d] text-white' : 'bg-white text-[#234a32] border border-[#d9dfd1]'}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-[420px] animate-pulse rounded-[28px] bg-[#dfe7d5]" />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <article key={product.id} className="group overflow-hidden rounded-[28px] border border-[#dfe7d4] bg-white shadow-[0_12px_30px_rgba(39,60,42,0.08)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(39,60,42,0.12)]">
                  <div className="overflow-hidden bg-[#edf4ea]">
                    <img src={toProductImage(product)} alt={product.name} className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-[#ebf2e5] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#33533a]">
                        {product.shade_hijau || 'sage'}
                      </span>
                      <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#587258]">{product.category?.name || 'Dress'}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-[#1d2e22]">{product.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#4b5f49]">{product.description}</p>
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <span className="text-2xl font-black text-[#264f35]">{formatRupiah(product.price)}</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="rounded-full bg-[#2a563b] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1d422d]"
                      >
                        Tambah ke Keranjang
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      )}

      {page === 'cart' && (
        <main className="mx-auto max-w-6xl px-6 py-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#4d6a50]">Cart</p>
            <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-[#1e2d23]">Your green edit</h2>
          </div>

          {cartItems.length === 0 ? (
            <div className="rounded-[28px] border border-[#dde8d6] bg-white p-8 text-center text-[#445d46]">
              Keranjang masih kosong. Silakan pilih produk dari koleksi.
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-4 rounded-[24px] border border-[#dde8d6] bg-white p-4 shadow-sm">
                    <img src={toProductImage(item.product)} alt={item.product.name} className="h-28 w-28 rounded-2xl object-cover" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold text-[#1d2e22]">{item.product.name}</h3>
                          <p className="mt-1 text-sm text-[#4f5f4d]">{item.product.category?.name || 'GreenStyle'}</p>
                        </div>
                        <button onClick={() => updateCartQty(item.product.id, -999)} className="text-sm font-medium text-red-600">
                          Hapus
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full border border-[#d7e3d0] bg-[#edf5e6] p-1">
                          <button onClick={() => updateCartQty(item.product.id, -1)} className="h-8 w-8 text-lg text-[#234a32]">-</button>
                          <span className="min-w-10 text-center text-sm font-bold text-[#234a32]">{item.quantity}</span>
                          <button onClick={() => updateCartQty(item.product.id, 1)} className="h-8 w-8 text-lg text-[#234a32]">+</button>
                        </div>
                        <div className="text-xl font-black text-[#264f35]">{formatRupiah(item.subtotal)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <aside className="rounded-[28px] border border-[#dfe7d4] bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.2em] text-[#4d6a50]">Ringkasan</p>
                <div className="mt-5 space-y-4 text-[#1f2a22]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatRupiah(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ongkir</span>
                    <span>Rp 25.000</span>
                  </div>
                  <div className="flex justify-between border-t border-[#e1ead9] pt-4 text-lg font-black">
                    <span>Total</span>
                    <span>{formatRupiah(cartTotal + 25000)}</span>
                  </div>
                </div>

                <textarea
                  value={shippingAddress}
                  onChange={(event) => setShippingAddress(event.target.value)}
                  rows={4}
                  placeholder="Alamat pengiriman lengkap"
                  className="mt-5 w-full rounded-2xl border border-[#d7e3d0] bg-[#f9faf4] p-3 text-sm text-[#233b29] outline-none focus:border-[#2d5b3d]"
                />

                <button
                  onClick={handleCheckout}
                  className="mt-5 w-full rounded-full bg-[#2d5b3d] px-5 py-3 text-sm font-semibold text-white hover:bg-[#224a31]"
                >
                  Checkout via WhatsApp
                </button>

                {checkoutMessage && (
                  <div className="mt-4 rounded-2xl border border-[#dfe7d5] bg-[#edf5e6] p-3 text-sm text-[#264f35]">
                    {checkoutMessage}
                  </div>
                )}
              </aside>
            </div>
          )}
        </main>
      )}

      {page === 'account' && (
        <main className="mx-auto max-w-5xl px-6 py-10">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[28px] border border-[#dfe7d4] bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#4d6a50]">Buyer access</p>
              <h2 className="mt-2 text-3xl font-black text-[#1b2d1f]">{authMode === 'login' ? 'Masuk' : 'Daftar'} akun</h2>

              <form onSubmit={handleBuyerAuth} className="mt-6 space-y-4">
                {authMode === 'register' && (
                  <input
                    value={buyerForm.name}
                    onChange={(event) => setBuyerForm({ ...buyerForm, name: event.target.value })}
                    placeholder="Nama lengkap"
                    className="w-full rounded-2xl border border-[#dbe6d8] bg-[#f8faf5] p-3 text-sm outline-none focus:border-[#2d5b3d]"
                  />
                )}

                <input
                  type="email"
                  value={authMode === 'login' ? loginForm.email : buyerForm.email}
                  onChange={(event) =>
                    authMode === 'login'
                      ? setLoginForm({ ...loginForm, email: event.target.value })
                      : setBuyerForm({ ...buyerForm, email: event.target.value })
                  }
                  placeholder="Email"
                  className="w-full rounded-2xl border border-[#dbe6d8] bg-[#f8faf5] p-3 text-sm outline-none focus:border-[#2d5b3d]"
                />

                <input
                  type="password"
                  value={authMode === 'login' ? loginForm.password : buyerForm.password}
                  onChange={(event) =>
                    authMode === 'login'
                      ? setLoginForm({ ...loginForm, password: event.target.value })
                      : setBuyerForm({ ...buyerForm, password: event.target.value })
                  }
                  placeholder="Password"
                  className="w-full rounded-2xl border border-[#dbe6d8] bg-[#f8faf5] p-3 text-sm outline-none focus:border-[#2d5b3d]"
                />

                {authMode === 'register' && (
                  <>
                    <input
                      type="password"
                      value={buyerForm.password_confirmation}
                      onChange={(event) => setBuyerForm({ ...buyerForm, password_confirmation: event.target.value })}
                      placeholder="Konfirmasi password"
                      className="w-full rounded-2xl border border-[#dbe6d8] bg-[#f8faf5] p-3 text-sm outline-none focus:border-[#2d5b3d]"
                    />
                    <input
                      value={buyerForm.phone}
                      onChange={(event) => setBuyerForm({ ...buyerForm, phone: event.target.value })}
                      placeholder="Nomor HP"
                      className="w-full rounded-2xl border border-[#dbe6d8] bg-[#f8faf5] p-3 text-sm outline-none focus:border-[#2d5b3d]"
                    />
                    <textarea
                      value={buyerForm.address}
                      onChange={(event) => setBuyerForm({ ...buyerForm, address: event.target.value })}
                      rows={3}
                      placeholder="Alamat pengiriman"
                      className="w-full rounded-2xl border border-[#dbe6d8] bg-[#f8faf5] p-3 text-sm outline-none focus:border-[#2d5b3d]"
                    />
                  </>
                )}

                <button type="submit" className="w-full rounded-full bg-[#2d5b3d] px-5 py-3 text-sm font-semibold text-white hover:bg-[#224a31]">
                  {authMode === 'login' ? 'Masuk' : 'Buat akun'}
                </button>
              </form>

              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="mt-4 text-sm font-medium text-[#254a2f]"
              >
                {authMode === 'login' ? 'Belum punya akun? Daftar sekarang' : 'Sudah punya akun? Masuk'}
              </button>
            </div>

            <div className="rounded-[28px] border border-[#dfe7d4] bg-[#edf5e6] p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#4d6a50]">Akun pembeli</p>
              <h2 className="mt-2 text-3xl font-black text-[#1b2d1f]">Status login</h2>

              {buyerUser ? (
                <div className="mt-6 space-y-4 text-[#213927]">
                  <div className="rounded-2xl bg-white p-4">
                    <div className="text-sm text-[#55715a]">Nama</div>
                    <div className="mt-1 text-xl font-bold">{buyerUser.name}</div>
                  </div>
                  <div className="rounded-2xl bg-white p-4">
                    <div className="text-sm text-[#55715a]">Email</div>
                    <div className="mt-1 text-lg font-medium">{buyerUser.email}</div>
                  </div>
                  <button onClick={handleBuyerLogout} className="w-full rounded-full border border-[#bfd0bb] bg-white px-5 py-3 text-sm font-semibold text-[#234a32]">
                    Logout pembeli
                  </button>
                </div>
              ) : (
                <div className="mt-6 rounded-2xl bg-white p-4 text-[#3f5545]">
                  Belum login sebagai pembeli. Silakan masuk untuk checkout.
                </div>
              )}

              {checkoutMessage && (
                <div className="mt-6 rounded-2xl border border-[#dfe7d5] bg-white p-4 text-sm text-[#264f35]">
                  {checkoutMessage}
                </div>
              )}
            </div>
          </div>
        </main>
      )}

      {page === 'admin' && (
        <main className="mx-auto max-w-7xl px-6 py-10">
          {!adminToken || !adminUser ? (
            <div className="mx-auto max-w-xl rounded-[28px] border border-[#dfe7d4] bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#4d6a50]">Admin login</p>
              <h2 className="mt-2 text-3xl font-black text-[#1b2d1f]">Masuk panel admin</h2>

              <form onSubmit={handleAdminLogin} className="mt-6 space-y-4">
                <input
                  type="email"
                  value={adminLoginForm.email}
                  onChange={(event) => setAdminLoginForm({ ...adminLoginForm, email: event.target.value })}
                  placeholder="Email admin"
                  className="w-full rounded-2xl border border-[#dbe6d8] bg-[#f8faf5] p-3 text-sm outline-none focus:border-[#2d5b3d]"
                />
                <input
                  type="password"
                  value={adminLoginForm.password}
                  onChange={(event) => setAdminLoginForm({ ...adminLoginForm, password: event.target.value })}
                  placeholder="Password"
                  className="w-full rounded-2xl border border-[#dbe6d8] bg-[#f8faf5] p-3 text-sm outline-none focus:border-[#2d5b3d]"
                />
                <button type="submit" className="w-full rounded-full bg-[#2d5b3d] px-5 py-3 text-sm font-semibold text-white hover:bg-[#224a31]">
                  Login admin
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4 rounded-[28px] border border-[#dfe7d4] bg-white p-6 shadow-sm">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-[#4d6a50]">Administrator</p>
                  <h2 className="mt-2 text-3xl font-black text-[#1b2d1f]">Selamat datang, {adminUser.name}</h2>
                </div>
                <button onClick={handleAdminLogout} className="rounded-full border border-[#bfd0bb] bg-[#edf5e6] px-4 py-2 text-sm font-semibold text-[#234a32]">
                  Logout admin
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-[24px] border border-[#dfe7d4] bg-white p-5 shadow-sm">
                  <div className="text-sm text-[#55715a]">Total sales</div>
                  <div className="mt-2 text-3xl font-black text-[#2d5b3d]">
                    {adminData.summary ? formatRupiah(adminData.summary.total_sales || 0) : 'Rp 0'}
                  </div>
                </div>
                <div className="rounded-[24px] border border-[#dfe7d4] bg-white p-5 shadow-sm">
                  <div className="text-sm text-[#55715a]">Orders</div>
                  <div className="mt-2 text-3xl font-black text-[#2d5b3d]">
                    {adminData.summary?.orders_count || 0}
                  </div>
                </div>
                <div className="rounded-[24px] border border-[#dfe7d4] bg-white p-5 shadow-sm">
                  <div className="text-sm text-[#55715a]">Users</div>
                  <div className="mt-2 text-3xl font-black text-[#2d5b3d]">
                    {adminData.summary?.users_count || 0}
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-[28px] border border-[#dfe7d4] bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#4d6a50]">Tambah produk</p>
                  <form onSubmit={handleCreateProduct} className="mt-5 space-y-4">
                    <select
                      value={adminProductForm.category_id}
                      onChange={(event) => setAdminProductForm({ ...adminProductForm, category_id: event.target.value })}
                      className="w-full rounded-2xl border border-[#dbe6d8] bg-[#f8faf5] p-3 text-sm outline-none"
                    >
                      <option value="">Pilih kategori</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                    <input
                      value={adminProductForm.name}
                      onChange={(event) => setAdminProductForm({ ...adminProductForm, name: event.target.value })}
                      placeholder="Nama produk"
                      className="w-full rounded-2xl border border-[#dbe6d8] bg-[#f8faf5] p-3 text-sm outline-none"
                    />
                    <textarea
                      value={adminProductForm.description}
                      onChange={(event) => setAdminProductForm({ ...adminProductForm, description: event.target.value })}
                      rows={3}
                      placeholder="Deskripsi produk"
                      className="w-full rounded-2xl border border-[#dbe6d8] bg-[#f8faf5] p-3 text-sm outline-none"
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        type="number"
                        value={adminProductForm.price}
                        onChange={(event) => setAdminProductForm({ ...adminProductForm, price: Number(event.target.value) })}
                        placeholder="Harga"
                        className="w-full rounded-2xl border border-[#dbe6d8] bg-[#f8faf5] p-3 text-sm outline-none"
                      />
                      <input
                        type="number"
                        value={adminProductForm.stock}
                        onChange={(event) => setAdminProductForm({ ...adminProductForm, stock: Number(event.target.value) })}
                        placeholder="Stock"
                        className="w-full rounded-2xl border border-[#dbe6d8] bg-[#f8faf5] p-3 text-sm outline-none"
                      />
                    </div>
                    <select
                      value={adminProductForm.shade_hijau}
                      onChange={(event) => setAdminProductForm({ ...adminProductForm, shade_hijau: event.target.value })}
                      className="w-full rounded-2xl border border-[#dbe6d8] bg-[#f8faf5] p-3 text-sm outline-none"
                    >
                      <option value="sage">Sage</option>
                      <option value="olive">Olive</option>
                      <option value="mint">Mint</option>
                      <option value="emerald">Emerald</option>
                      <option value="army">Army</option>
                    </select>
                    <button type="submit" className="w-full rounded-full bg-[#2d5b3d] px-5 py-3 text-sm font-semibold text-white hover:bg-[#224a31]">
                      Simpan produk
                    </button>
                  </form>
                </div>

                <div className="rounded-[28px] border border-[#dfe7d4] bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#4d6a50]">Orders</p>
                  <div className="mt-5 space-y-4">
                    {adminData.orders.length === 0 ? (
                      <div className="rounded-2xl bg-[#f8faf5] p-4 text-[#485d49]">Belum ada order masuk.</div>
                    ) : (
                      adminData.orders.map((order) => (
                        <div key={order.id} className="rounded-2xl border border-[#dfe7d4] bg-[#f9faf4] p-4">
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <div className="text-lg font-bold text-[#1d2e22]">{order.order_code}</div>
                              <div className="text-sm text-[#53715d]">{order.user?.name || 'Pelanggan'}</div>
                            </div>
                            <span className="rounded-full bg-[#edf5e6] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#264f35]">
                              {order.status}
                            </span>
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-3">
                            <div className="text-sm text-[#4b5f49]">{order.items?.length || 0} item</div>
                            <div className="text-lg font-black text-[#264f35]">{formatRupiah(order.total)}</div>
                          </div>

                          <select
                            value={order.status}
                            onChange={(event) => handleOrderStatus(order.id, event.target.value)}
                            className="mt-4 w-full rounded-2xl border border-[#dbe6d8] bg-white p-2 text-sm outline-none"
                          >
                            <option value="pending">pending</option>
                            <option value="paid">paid</option>
                            <option value="processing">processing</option>
                            <option value="shipped">shipped</option>
                            <option value="completed">completed</option>
                            <option value="cancelled">cancelled</option>
                          </select>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      <footer className="border-t border-[#d9dfd1] bg-[#edf5e6]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-[#40533f] md:flex-row">
          <div className="font-semibold tracking-[0.18em] text-[#2d4f35]">GREENSTYLE</div>
          <div>Natural tones. Modern living.</div>
        </div>
      </footer>
    </div>
  )
}

export default App