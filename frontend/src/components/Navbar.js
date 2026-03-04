import { Link } from "react-router-dom";

export default function Navbar({ cartCount }) {
  return (
    <nav style={{ marginBottom: 20 }}>
      <Link to="/products" style={{ marginRight: 10 }}>
        Продукти
      </Link>
      <Link to="/cart" style={{ marginRight: 10 }}>
        Кошик ({cartCount})
      </Link>
      <Link to="/register">Реєстрація</Link>
      <Link to="/login">Вхід</Link>
    </nav>
  );
}
