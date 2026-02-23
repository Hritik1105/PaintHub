import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { clearCart, getCart, removeCartItem } from '../data/store';

export default function CartPage() {
  const [items, setItems] = useState(getCart());

  const total = useMemo(() => items.reduce((sum, item) => sum + (Number(item.price) || 0), 0), [items]);

  const onRemove = (id) => {
    removeCartItem(id);
    setItems(getCart());
  };

  const onClear = () => {
    clearCart();
    setItems([]);
  };

  return (
    <main className="container">
      <section className="section">
        <h2 className="section-title">Your Cart</h2>
        <div style={{ display: 'grid', gap: 10 }}>
          {items.length === 0 && <p className="muted">Your cart is empty.</p>}
          {items.map((item) => (
            <article key={item.id} className="card" style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: 12, padding: 10 }}>
              <img src={item.img} alt={item.title} style={{ width: '100%', height: 90, objectFit: 'cover', borderRadius: 8 }} />
              <div>
                <div className="card-title">{item.title}</div>
                <div className="muted">{item.tag}</div>
                <div className="price">₹{item.price}</div>
              </div>
              <button className="btn-outline" type="button" onClick={() => onRemove(item.id)}>
                Remove
              </button>
            </article>
          ))}
        </div>
        <div style={{ marginTop: 12 }}>
          <strong>Total: ₹{total}</strong>
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <button className="btn-outline" type="button" onClick={onClear}>
            Clear Cart
          </button>
          <Link to="/checkout" className="btn">
            Checkout
          </Link>
        </div>
      </section>
    </main>
  );
}
