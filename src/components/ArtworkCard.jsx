export default function ArtworkCard({ artwork, onAddToCart, showCartAction = false }) {
  return (
    <article className="card">
      <img src={artwork.img} alt={artwork.title} />
      <div className="card-body">
        <div className="card-title">{artwork.title}</div>
        <div className="card-meta">
          <span className="tag">{artwork.tag}</span>
          <span className="price">₹{artwork.price}</span>
        </div>
        {showCartAction && (
          <button className="btn" type="button" onClick={() => onAddToCart?.(artwork)} style={{ marginTop: 10 }}>
            Add to Cart
          </button>
        )}
      </div>
    </article>
  );
}
