import { useMemo, useState } from 'react';
import { addOrder, getOrders } from '../data/store';

const initial = {
  name: '',
  contact: '',
  type: 'Painting',
  size: '',
  budget: '',
  details: ''
};

export default function OrderPage() {
  const [form, setForm] = useState(initial);
  const [orders, setOrders] = useState(getOrders());

  const onChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const order = {
      ...form,
      ts: Date.now()
    };

    addOrder(order);
    setOrders(getOrders());
    setForm(initial);
    alert('Order request saved locally.');
  };

  const renderedOrders = useMemo(
    () =>
      orders.map((order, index) => (
        <div key={`${order.ts}-${index}`} className="card" style={{ padding: 12 }}>
          <strong>{order.type}</strong>
          <div className="muted">{order.name} • {order.contact}</div>
          <p>{order.details || 'No details provided.'}</p>
          <div className="muted" style={{ fontSize: 12 }}>{new Date(order.ts).toLocaleString()}</div>
        </div>
      )),
    [orders]
  );

  return (
    <main className="container">
      <section className="section">
        <h2 className="section-title">Place a Custom Order</h2>
        <form className="form" style={{ display: 'grid', gap: 10, width: '100%' }} onSubmit={onSubmit}>
          <input value={form.name} onChange={onChange('name')} placeholder="Your Name" className="input" required />
          <input value={form.contact} onChange={onChange('contact')} placeholder="Phone or Email" className="input" required />
          <select value={form.type} onChange={onChange('type')} className="input">
            <option>Painting</option>
            <option>Sketch</option>
            <option>Clay</option>
          </select>
          <input value={form.size} onChange={onChange('size')} placeholder="Size (e.g., 18x24 inches)" className="input" />
          <input value={form.budget} onChange={onChange('budget')} type="number" placeholder="Budget (₹)" className="input" />
          <textarea value={form.details} onChange={onChange('details')} placeholder="Describe your idea, colors, deadline..." className="input" rows="4" />
          <button className="btn" type="submit">
            Submit Order
          </button>
        </form>
        <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>{renderedOrders}</div>
      </section>
    </main>
  );
}
