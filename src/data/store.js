const DEFAULT_PAINTINGS = [
  {
    id: 1,
    title: 'Indigo Bloom',
    price: 3200,
    img: 'https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?q=80&w=1200&auto=format&fit=crop',
    tag: 'Painting'
  },
  {
    id: 2,
    title: 'City After Rain',
    price: 5400,
    img: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop',
    tag: 'Painting'
  },
  {
    id: 3,
    title: 'Forest Sketch',
    price: 1200,
    img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
    tag: 'Sketch'
  },
  {
    id: 4,
    title: 'Clay Vase DIY',
    price: 800,
    img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop',
    tag: 'Clay'
  },
  {
    id: 5,
    title: 'Monsoon Blues',
    price: 2600,
    img: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1200&auto=format&fit=crop',
    tag: 'Painting'
  },
  {
    id: 6,
    title: 'Crimson Night Sketch',
    price: 1500,
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop',
    tag: 'Sketch'
  }
];

const PAINTINGS_KEY = 'paintings';
const ORDERS_KEY = 'orders';
const CART_KEY = 'cart';

const parse = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
};

export function seedPaintings() {
  if (!localStorage.getItem(PAINTINGS_KEY)) {
    localStorage.setItem(PAINTINGS_KEY, JSON.stringify(DEFAULT_PAINTINGS));
  }
}

export function getPaintings() {
  seedPaintings();
  return parse(PAINTINGS_KEY);
}

export function savePaintings(list) {
  localStorage.setItem(PAINTINGS_KEY, JSON.stringify(list));
}

export function addPainting(painting) {
  const list = getPaintings();
  list.unshift(painting);
  savePaintings(list);
}

export function getCart() {
  return parse(CART_KEY);
}

export function addToCart(item) {
  const cart = getCart();
  cart.push(item);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function clearCart() {
  localStorage.setItem(CART_KEY, JSON.stringify([]));
}

export function removeCartItem(id) {
  const cart = getCart().filter((item) => item.id !== id);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function getOrders() {
  return parse(ORDERS_KEY);
}

export function addOrder(order) {
  const list = getOrders();
  list.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(list));
}
