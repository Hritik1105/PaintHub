import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../data/store';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('UPI');

  const onSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert('Please fill required fields.');
      return;
    }

    clearCart();
    alert(`Order placed successfully via ${payment}.`);
    navigate('/homepage');
  };

  return (
    <main className="container">
      <section className="section">
        <h2 className="section-title">Checkout</h2>
        <form style={{ display: 'grid', gap: 10, width: '100%' }} onSubmit={onSubmit}>
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Full Name" className="input" required />
          <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" className="input" required />
          <textarea value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Shipping Address" className="input" rows="3" />
          <select value={payment} onChange={(event) => setPayment(event.target.value)} className="input">
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
            <option value="COD">Cash on Delivery</option>
          </select>
          <button className="btn" type="submit">
            Place Order
          </button>
        </form>
      </section>
    </main>
  );
}
