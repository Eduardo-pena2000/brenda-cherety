import { Link } from 'react-router-dom';

export default function CheckoutSuccessPage() {
  return (
    <div className="checkout-result">
      <div className="checkout-card success">
        <h1>Pago Exitoso!</h1>
        <p>Tu compra se ha completado correctamente. Ya puedes acceder al contenido del curso.</p>
        <Link to="/mis-cursos" className="btn btn-primary btn-lg">Ir a Mis Cursos</Link>
      </div>
    </div>
  );
}
