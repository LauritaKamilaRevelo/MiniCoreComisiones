const API_URL = 'http://localhost:5000/api';
let vendedoresCache = [];

// -----------------------------
// Vendedores
// -----------------------------
async function cargarVendedores() {
  const res = await fetch(`${API_URL}/vendedores`);
  const vendedores = await res.json();
  vendedoresCache = vendedores;

  const lista = document.getElementById('listaVendedores');
  const selectVendedor = document.getElementById('vendedorIdVenta');

  if (lista) lista.innerHTML = '';
  if (selectVendedor) selectVendedor.innerHTML = '<option value="">Seleccione un vendedor</option>';

  vendedores.forEach(v => {
    if (lista) {
      const li = document.createElement('li');
      li.textContent = `${v.nombre} (${v.email})`;
      lista.appendChild(li);
    }

    if (selectVendedor) {
      const option = document.createElement('option');
      option.value = v._id;
      option.textContent = v.nombre;
      selectVendedor.appendChild(option);
    }
  });
}

// -----------------------------
// Ventas
// -----------------------------
async function cargarVentas() {
  const res = await fetch(`${API_URL}/ventas`);
  const ventas = await res.json();
  const lista = document.getElementById('listaVentas');
  lista.innerHTML = '';

  ventas.forEach(v => {
    const vendedor = vendedoresCache.find(ven => ven._id === v.vendedorId);
    const nombreVendedor = vendedor ? vendedor.nombre : v.vendedorId;
    const li = document.createElement('li');
    li.textContent = `Vendedor: ${nombreVendedor} | Monto: $${v.monto} | Fecha: ${new Date(v.fecha).toLocaleDateString()}`;
    lista.appendChild(li);
  });
}

// -----------------------------
// Formularios
// -----------------------------
document.getElementById('formVendedor')?.addEventListener('submit', async e => {
  e.preventDefault();
  const nombre = document.getElementById('nombreVendedor').value;
  const email = document.getElementById('emailVendedor').value;

  const res = await fetch(`${API_URL}/vendedores`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ nombre, email })
  });

  if (!res.ok) return alert('Error al agregar vendedor');
  
  await res.json();
  document.getElementById('formVendedor').reset();
  cargarVendedores();
});

document.getElementById('formVenta')?.addEventListener('submit', async e => {
  e.preventDefault();
  const vendedorId = document.getElementById('vendedorIdVenta').value;
  const monto = parseFloat(document.getElementById('montoVenta').value);
  const fecha = document.getElementById('fechaVenta').value;

  if (!vendedorId) return alert('Seleccione un vendedor');

  const res = await fetch(`${API_URL}/ventas`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ vendedorId, monto, fecha })
  });

  if (!res.ok) return alert('Error al agregar venta');

  document.getElementById('formVenta').reset();
  cargarVentas();
});

// -----------------------------
// Filtrar comisiones
// -----------------------------
document.getElementById('btnFiltrarComisiones')?.addEventListener('click', async () => {
  const fechaInicio = document.getElementById('fechaInicio').value;
  const fechaFin = document.getElementById('fechaFin').value;
  if (!fechaInicio || !fechaFin) return alert('Seleccione un rango de fechas');

  const resVentas = await fetch(`${API_URL}/ventas`);
  const ventas = await resVentas.json();
  const lista = document.getElementById('listaComisiones');
  lista.innerHTML = '';

  const porcentajeComision = 0.1; // 10% fijo

  const ventasFiltradas = ventas.filter(v => {
    const fecha = new Date(v.fecha);
    return fecha >= new Date(fechaInicio) && fecha <= new Date(fechaFin);
  });

  ventasFiltradas.forEach(v => {
    const vendedor = vendedoresCache.find(ven => ven._id === v.vendedorId);
    const nombreVendedor = vendedor ? vendedor.nombre : v.vendedorId;

    const comision = v.monto * porcentajeComision;
    const li = document.createElement('li');
    li.textContent = `Vendedor: ${nombreVendedor} | Venta: $${v.monto} | Comisión: $${comision.toFixed(2)}`;
    lista.appendChild(li);
  });
});

// -----------------------------
// Inicializar
// -----------------------------
document.addEventListener('DOMContentLoaded', () => {
  cargarVendedores();
  cargarVentas();
});
