import { Link } from 'react-router-dom';

export default function CheckoutCancelPage() {
  return (
    <div className="checkout-result">
      <div className="checkout-card cancel">
        <h1>Pago Cancelado</h1>
        <p>El proceso de pago fue cancelado. No se realizo ningun cargo.</p>
        <Link to="/cursos" className="btn btn-primary btn-lg">Volver a Cursos</Link>
      </div>
    </div>
  );
}
