document.addEventListener("DOMContentLoaded", () => {

const fecha = new Date();

document.getElementById("fechaActual").innerHTML =
fecha.toLocaleString("es-MX",{
dateStyle:"long",
timeStyle:"short"
});

});

function calcular(){

let cliente =
document.getElementById("cliente").value;

let monto =
parseFloat(
document.getElementById("monto").value
);

let ingreso =
parseFloat(
document.getElementById("ingreso").value
);

let tasaAnual =
parseFloat(
document.getElementById("tasa").value
);

let plazo =
parseInt(
document.getElementById("plazo").value
);

let comisionPorcentaje =
parseFloat(
document.getElementById("comision").value
);

if(
cliente.trim()==="" ||
isNaN(monto) ||
isNaN(ingreso) ||
isNaN(tasaAnual)
){

alert(
"Completa todos los campos."
);

return;

}

const IVA = 0.16;

/* APROBACIÓN INTELIGENTE */

let montoAutorizado;

if(ingreso >= monto){

montoAutorizado = monto;

}else{

montoAutorizado = ingreso;

}

/* COMISIÓN */

let comisionApertura =
montoAutorizado *
(comisionPorcentaje / 100);

let totalFinanciar =
montoAutorizado +
comisionApertura;

/* TASAS */

let tasaMensual =
(tasaAnual / 100) / 12;

/* AMORTIZACIÓN */

let amortizacion =
totalFinanciar / plazo;

let saldo =
totalFinanciar;

let totalIntereses = 0;
let totalIVA = 0;
let totalPagado = 0;
let interesAcumulado = 0;

let filas = "";

for(
let periodo = 1;
periodo <= plazo;
periodo++
){

let saldoInicial = saldo;

let interes =
saldo * tasaMensual;

let ivaInteres =
interes * IVA;

let pagoMensual =
amortizacion +
interes +
ivaInteres;

saldo =
saldo - amortizacion;

interesAcumulado += interes;

totalIntereses += interes;

totalIVA += ivaInteres;

totalPagado += pagoMensual;

filas += `

<tr>

<td>${periodo}</td>

<td>
$${saldoInicial.toLocaleString(
'es-MX',
{
minimumFractionDigits:2
}
)}
</td>

<td>
$${amortizacion.toLocaleString(
'es-MX',
{
minimumFractionDigits:2
}
)}
</td>

<td>
$${interes.toLocaleString(
'es-MX',
{
minimumFractionDigits:2
}
)}
</td>

<td>
$${ivaInteres.toLocaleString(
'es-MX',
{
minimumFractionDigits:2
}
)}
</td>

<td>
$${pagoMensual.toLocaleString(
'es-MX',
{
minimumFractionDigits:2
}
)}
</td>

<td>
$${Math.max(
saldo,
0
).toLocaleString(
'es-MX',
{
minimumFractionDigits:2
}
)}
</td>

<td>
$${interesAcumulado.toLocaleString(
'es-MX',
{
minimumFractionDigits:2
}
)}
</td>

</tr>

`;

}

/* MÉTRICAS */

let pagoMensualPromedio =
totalPagado / plazo;

let CAT =
(
tasaAnual * 0.52
).toFixed(2);

let pagoPorMil =
(
(totalPagado / montoAutorizado)
* 1000
).toFixed(2);

/* RESUMEN */

document.getElementById("resumen").innerHTML = `

<div class="card">
<h3>Cliente</h3>
<h2>${cliente}</h2>
</div>

<div class="card">
<h3>Importe solicitado</h3>
<h2>
$${monto.toLocaleString('es-MX')}
</h2>
</div>

<div class="card">
<h3>Importe aprobado</h3>
<h2>
$${montoAutorizado.toLocaleString('es-MX')}
</h2>
</div>

<div class="card">
<h3>Capacidad económica</h3>
<h2>
$${ingreso.toLocaleString('es-MX')}
</h2>
</div>

<div class="card">
<h3>Plazo</h3>
<h2>${plazo} meses</h2>
</div>

<div class="card">
<h3>Tasa anual</h3>
<h2>${tasaAnual}%</h2>
</div>

<div class="card">
<h3>Comisión administrativa</h3>
<h2>
$${comisionApertura.toLocaleString(
'es-MX',
{
minimumFractionDigits:2
}
)}
</h2>
</div>

<div class="card">
<h3>Total financiado</h3>
<h2>
$${totalFinanciar.toLocaleString(
'es-MX',
{
minimumFractionDigits:2
}
)}
</h2>
</div>

<div class="card">
<h3>Pago por cada mil</h3>
<h2>$${pagoPorMil}</h2>
</div>

<div class="card">
<h3>CAT estimado</h3>
<h2>${CAT}%</h2>
</div>

<div class="card">
<h3>Pago mensual promedio</h3>
<h2>
$${pagoMensualPromedio.toLocaleString(
'es-MX',
{
minimumFractionDigits:2
}
)}
</h2>
</div>

<div class="card">
<h3>Total intereses</h3>
<h2>
$${totalIntereses.toLocaleString(
'es-MX',
{
minimumFractionDigits:2
}
)}
</h2>
</div>

<div class="card">
<h3>Total IVA</h3>
<h2>
$${totalIVA.toLocaleString(
'es-MX',
{
minimumFractionDigits:2
}
)}
</h2>
</div>

<div class="card">
<h3>Proyección total</h3>
<h2>
$${totalPagado.toLocaleString(
'es-MX',
{
minimumFractionDigits:2
}
)}
</h2>
</div>

`;

document.getElementById("tabla").innerHTML =
filas;

}

/* LIMPIAR */

function limpiar(){

document.getElementById("cliente").value = "";

document.getElementById("monto").value = "";

document.getElementById("ingreso").value = "";

document.getElementById("comision").value = "";

document.getElementById("tasa").value = "";

document.getElementById("resumen").innerHTML = "";

document.getElementById("tabla").innerHTML = "";

}