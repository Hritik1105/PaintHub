import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPainting } from '../data/store';

export default function UploadPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Painting');
  const [imageUrl, setImageUrl] = useState('');
  const [preview, setPreview] = useState('');

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(String(reader.result));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      alert('Please enter a title for your artwork.');
      return;
    }

    const source = preview || imageUrl.trim();
    if (!source) {
      alert('Please upload a file or provide an image URL.');
      return;
    }

    addPainting({
      id: Date.now(),
      title: title.trim(),
      price: Number(price) || 0,
      img: source,
      tag: category
    });

    alert('Artwork added to gallery!');
    navigate('/gallery');
  };

  return (
    <main className="container">
      <section className="section">
        <h2 className="section-title">Upload Your Artwork</h2>
        <form className="form" style={{ display: 'grid', gap: 10, width: '100%' }} onSubmit={handleSubmit}>
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title" className="input" required />
          <input value={price} onChange={(event) => setPrice(event.target.value)} type="number" placeholder="Price (₹)" className="input" />
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="input">
            <option>Painting</option>
            <option>Sketch</option>
            <option>Clay</option>
          </select>
          <label>
            Upload image file
            <input type="file" accept="image/*" className="input" style={{ marginTop: 8 }} onChange={handleFile} />
          </label>
          <div style={{ textAlign: 'center' }}>OR</div>
          <input value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} placeholder="Image URL (optional)" className="input" />
          <textarea placeholder="Description (optional)" className="input" rows="4" />
          <div>{preview && <img src={preview} alt="Preview" style={{ width: '100%', borderRadius: 8 }} />}</div>
          <button className="btn" type="submit">
            Add to Gallery
          </button>
        </form>
      </section>
    </main>
  );
}
