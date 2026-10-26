
import { useEffect, useMemo, useState } from 'react'
import './App.css'

type Product = {
  name: string
  type: string
  price: number
  image: string
}

type CartItem = {
  product: Product
  quantity: number
}

type PaymentMethod = 'card' | 'bank_transfer' | 'ussd'

const products: Product[] = [
  {
    name: 'The Morning Blend',
    type: 'SMOOTH & BALANCED',
    price: 12500,
    image:
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'Midnight Espresso',
    type: 'RICH & BOLD',
    price: 14000,
    image:
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'Golden Hour',
    type: 'BRIGHT & FRUITY',
    price: 13500,
    image:
      'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=800&q=85',
  },
]

const nigerianStates = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'Federal Capital Territory (FCT)',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
]

const formatPrice = (price: number) =>
  `₦${price.toLocaleString('en-NG')}`

function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('beanbloom-cart')
      return savedCart ? (JSON.parse(savedCart) as CartItem[]) : []
    } catch {
      return []
    }
  })

  const [cartOpen, setCartOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('card')
  const [orderMessage, setOrderMessage] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem('beanbloom-cart', JSON.stringify(cart))
    } catch {
      // The cart remains usable if browser storage is unavailable.
    }
  }, [cart])

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  )

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      ),
    [cart],
  )

  function addToCart(product: Product) {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.product.name === product.name,
      )

      if (existingItem) {
        return currentCart.map((item) =>
          item.product.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...currentCart, { product, quantity: 1 }]
    })

    setNotice(`${product.name} added to your bag.`)
    setCartOpen(true)
    setCheckoutOpen(false)
    setOrderMessage('')
  }

  function changeQuantity(productName: string, change: number) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.product.name === productName
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
    setNotice('')
    setOrderMessage('')
  }

  function removeFromCart(productName: string) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.product.name !== productName),
    )
    setNotice('')
    setOrderMessage('')
  }

  function closeCart() {
    setCartOpen(false)
    setCheckoutOpen(false)
    setOrderMessage('')
  }

  return (
    <div className="website">
      <div className="announcement">
        A little joy in every cup. Free delivery on orders over ₦50,000.
      </div>

      <header className="navbar">
        <a className="logo" href="#home">
          bean<span>bloom</span>
          <span className="logo-dot">.</span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#shop">Our Coffee</a>
          <a href="#story">Our Story</a>
        </nav>

        <button
          className="nav-button cart-trigger"
          type="button"
          onClick={() => {
            setNotice('')
            setCartOpen(true)
          }}
          aria-label={`Open shopping bag, ${cartCount} items`}
        >
          Bag ({cartCount}) <span>↗</span>
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">
              <span className="eyebrow-line" />
              GOOD COFFEE, GOOD DAYS
            </p>

            <h1>
              Better beans.
              <br />
              <span>Bigger moments.</span>
            </h1>

            <p className="hero-description">
              Thoughtfully sourced coffee for slow mornings,
              long conversations, and everything in between.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#shop">
                Explore our coffee <span>↗</span>
              </a>
              <a className="text-button" href="#story">
                Get to know us <span>→</span>
              </a>
            </div>

            <div className="hero-note">
              <div className="avatar-stack">
                <span>☕</span>
                <span>✳</span>
                <span>♡</span>
              </div>
              <p>
                Made for your everyday rituals.
                <br />
                <strong>Roasted with intention.</strong>
              </p>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=90"
              alt="Freshly prepared coffee in a warm coffee shop"
            />
            <div className="image-label">
              <span className="label-icon">✳</span>
              <div>
                <strong>A GOOD KIND OF DAILY</strong>
                <p>Your new favourite ritual.</p>
              </div>
            </div>
            <div className="floating-stamp">
              SIP SLOWLY
              <br />
              LIVE FULLY
            </div>
          </div>

          <span className="hero-decoration">b.</span>
        </section>

        <section className="values-strip" id="story">
          <div>
            <span className="value-icon">✳</span>
            <span>Thoughtfully sourced</span>
          </div>
          <div>
            <span className="value-icon">☼</span>
            <span>Freshly roasted</span>
          </div>
          <div>
            <span className="value-icon">♡</span>
            <span>Made to be shared</span>
          </div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR NEXT CUP STARTS HERE</p>
              <h2>
                Meet your new <em>favourites.</em>
              </h2>
            </div>
            <p className="section-description">
              Every bag has a story. Find the one that feels like yours.
            </p>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.name}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />

                  <button
                    className="product-arrow"
                    type="button"
                    aria-label={`Add ${product.name} to bag`}
                    onClick={() => addToCart(product)}
                  >
                    +
                  </button>
                </div>

                <div className="product-details">
                  <div>
                    <p className="product-type">{product.type}</p>
                    <h3>{product.name}</h3>
                  </div>
                  <p className="product-price">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <p className="product-note">
            Product names and prices are demonstration content for this project.
          </p>
        </section>

        <section className="story-banner">
          <div className="story-mark">b.</div>
          <div className="story-copy">
            <p className="eyebrow">A LITTLE MORE HUMAN</p>
            <h2>
              Not just coffee.
              <br />
              <em>A reason to pause.</em>
            </h2>
            <p>
              We believe the best moments don't need to be big.
              Sometimes, all you need is a good cup, a familiar face,
              and a little time to yourself.
            </p>
            <a href="#contact" className="story-link">
              A little more about us <span>→</span>
            </a>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <p className="eyebrow">LET'S MAKE YOUR DAY BETTER</p>
          <h2>Your next favourite cup is waiting.</h2>
          <p>
            Have a question about our coffee? We'd love to hear from you.
          </p>
          <a className="primary-button" href="mailto:hello@beanbloom.example">
            Say hello <span>↗</span>
          </a>
        </section>
      </main>

      <footer className="footer">
        <a className="logo footer-logo" href="#home">
          bean<span>bloom</span><span className="logo-dot">.</span>
        </a>
        <p>Good coffee. Better moments.</p>
        <p>
          © {new Date().getFullYear()} BeanBloom. A practical web development
          project by Timilehin Vincent Olorunfemi.
        </p>
      </footer>

      {cartOpen && (
        <div
          className="cart-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeCart()
          }}
        >
          <section
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            <div className="cart-header">
              <div>
                <p className="eyebrow">
                  {checkoutOpen ? 'DELIVERY & PAYMENT' : 'YOUR SELECTION'}
                </p>
                <h2 id="cart-title">
                  {checkoutOpen ? 'Checkout' : 'Your bag'}
                  {!checkoutOpen && <span> ({cartCount})</span>}
                </h2>
              </div>

              <button
                className="close-cart"
                type="button"
                onClick={closeCart}
                aria-label="Close shopping bag"
              >
                ×
              </button>
            </div>

            {notice && (
              <p className="cart-notice" role="status">
                {notice}
              </p>
            )}

            {cart.length === 0 ? (
              <div className="cart-empty">
                <span>☕</span>
                <h3>Your next favourite is waiting.</h3>
                <p>
                  Your bag is empty. Explore our coffee and find your blend.
                </p>
                <button
                  className="primary-button"
                  type="button"
                  onClick={() => {
                    closeCart()
                    document.getElementById('shop')?.scrollIntoView({
                      behavior: 'smooth',
                    })
                  }}
                >
                  Explore coffee <span>→</span>
                </button>
              </div>
            ) : checkoutOpen ? (
              <form
                className="checkout-form"
                onSubmit={(event) => {
                  event.preventDefault()
                  setOrderMessage(
                    'Your details have been checked in this demo. No order has been placed and no payment has been taken. Secure Paystack checkout must be connected before ordering is enabled.',
                  )
                }}
              >
                <p className="checkout-intro">
                  Tell us where to deliver your coffee. Delivery is available
                  across Nigeria, subject to confirmation.
                </p>

                <label htmlFor="customer-name">Full name *</label>
                <input
                  id="customer-name"
                  name="customerName"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  required
                />

                <label htmlFor="customer-email">Email address *</label>
                <input
                  id="customer-email"
                  name="customerEmail"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />

                <label htmlFor="customer-phone">Phone number *</label>
                <input
                  id="customer-phone"
                  name="customerPhone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="e.g. 08012345678"
                  pattern="(\+234|0)[0-9]{10}"
                  title="Enter a Nigerian number such as 08012345678 or +2348012345678."
                  required
                />

                <label htmlFor="delivery-state">State / FCT *</label>
                <select
                  id="delivery-state"
                  name="state"
                  autoComplete="address-level1"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select your state
                  </option>
                  {nigerianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>

                <label htmlFor="delivery-city">City or town *</label>
                <input
                  id="delivery-city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  placeholder="Enter your city or town"
                  required
                />

                <label htmlFor="delivery-address">Street address *</label>
                <textarea
                  id="delivery-address"
                  name="address"
                  autoComplete="street-address"
                  placeholder="House number, street, area and any helpful directions"
                  rows={3}
                  required
                />

                <label htmlFor="delivery-instructions">
                  Delivery instructions (optional)
                </label>
                <textarea
                  id="delivery-instructions"
                  name="deliveryInstructions"
                  placeholder="Anything the delivery person should know?"
                  rows={2}
                />

                <fieldset className="payment-methods">
                  <legend>Choose your payment method *</legend>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <span>
                      <strong>Nigerian bank debit card</strong>
                      <small>
                        Pay using an eligible bank debit card.
                      </small>
                    </span>
                  </label>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                    />
                    <span>
                      <strong>Bank transfer</strong>
                      <small>
                        Use transfer instructions provided by the payment
                        provider when checkout is connected.
                      </small>
                    </span>
                  </label>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="ussd"
                      checked={paymentMethod === 'ussd'}
                      onChange={() => setPaymentMethod('ussd')}
                    />
                    <span>
                      <strong>USSD banking</strong>
                      <small>
                        Use a supported bank USSD option when available.
                      </small>
                    </span>
                  </label>
                </fieldset>

                <div className="checkout-order-total">
                  <span>Product subtotal</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </div>

                <p className="checkout-delivery-note">
                  Delivery fees are not included yet. The final delivery cost
                  must be confirmed for your destination before payment.
                  Orders over ₦50,000 are advertised as eligible for free
                  delivery; the delivery policy must be implemented and
                  confirmed before real orders begin.
                </p>

                <p className="checkout-security-note">
                  Payment is not active in this demo. Never enter card details
                  here. When integrated, Paystack will securely handle payment.
                </p>

                {orderMessage && (
                  <p className="cart-notice" role="status">
                    {orderMessage}
                  </p>
                )}

                <button
                  className="primary-button checkout-button"
                  type="submit"
                >
                  Review my details <span>→</span>
                </button>

                <button
                  className="checkout-back"
                  type="button"
                  onClick={() => {
                    setCheckoutOpen(false)
                    setOrderMessage('')
                  }}
                >
                  ← Back to your bag
                </button>
              </form>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <article className="cart-item" key={item.product.name}>
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                      />

                      <div className="cart-item-details">
                        <h3>{item.product.name}</h3>
                        <p>{formatPrice(item.product.price)}</p>

                        <div className="quantity-control">
                          <button
                            type="button"
                            aria-label={`Remove one ${item.product.name}`}
                            onClick={() =>
                              changeQuantity(item.product.name, -1)
                            }
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            type="button"
                            aria-label={`Add one ${item.product.name}`}
                            onClick={() =>
                              changeQuantity(item.product.name, 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        className="remove-item"
                        type="button"
                        onClick={() => removeFromCart(item.product.name)}
                      >
                        Remove
                      </button>
                    </article>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="cart-total">
                    <span>Subtotal</span>
                    <strong>{formatPrice(subtotal)}</strong>
                  </div>

                  <p>Delivery costs will be calculated at checkout.</p>

                  <button
                    className="primary-button checkout-button"
                    type="button"
                    onClick={() => {
                      setNotice('')
                      setOrderMessage('')
                      setCheckoutOpen(true)
                    }}
                  >
                    Continue to checkout <span>→</span>
                  </button>

                  <p className="checkout-note">
                    Secure checkout and payment will be enabled after the
                    backend and payment provider are configured.
                  </p>
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  )
}

export default App
